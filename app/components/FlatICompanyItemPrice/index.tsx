import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {FONTS, SIZES, icons, keyWords} from '../../constants';
import CustomButton from '../CustomButton';
import CustomCollapsed from '../CustomCollapsed';

type Props = {
  userItems: any;
  onSelectCompany: (item: any) => void;
  company: any;
  selectedCompany?: any;
};

const FlatICompanyItemPrice = ({
  userItems,
  onSelectCompany,
  company,
  selectedCompany,
}: Props) => {
  const [collapsedStates, setCollapsedStates] = useState(
    company.map(() => true),
  );
  const [totalSum, setTotalSum] = useState(0);

  function calculateTotalSum(item: any) {
    let sum = 0;

    userItems.forEach((sellItem: any) => {
      const matchingObject = item?.companyPrice.find(
        (obj: any) => obj?.category === sellItem?._id,
      );

      sum += sellItem?.value * matchingObject?.price;
    });

    return sum;
  }

  useEffect(() => {
    // Calculate the total sum when userItems or company change
    let sum = 0;

    company.forEach((item: any) => {
      sum += calculateTotalSum(item);
    });

    setTotalSum(sum);
  }, [userItems, company]);

  function onCompanySelected(company: any) {
    const totalPrice = calculateTotalSum(company);
    const itemPrices = userItems.map((sellItem: any) => {
      console.log({sellItem});

      const matchingObject = company?.companyPrice.find(
        (obj: any) => obj?.category === sellItem?._id,
      );
      return {
        price: sellItem?.value * matchingObject?.price,
        category: sellItem?._id,
        pricePerKg: matchingObject?.price,
        weight: sellItem?.value,
        categoryName: sellItem?.categoryName,
      };
    });

    onSelectCompany({
      company,
      totalPrice,
      itemPrices,
    });
    setCollapsedStates(Array(company.length).fill(true));
  }

  const toggleCollapse = (index: number) => {
    const newCollapsedStates = [...collapsedStates];
    newCollapsedStates[index] = !newCollapsedStates[index];
    setCollapsedStates(newCollapsedStates);

    setCollapsedStates((prevStates: any) =>
      prevStates.map((_: any, i: any) => (i === index ? false : true)),
    );
  };

  function renderItem({item, index}: {item: any; index: number}) {
    const itemTotalSum = calculateTotalSum(item);

    return (
      <CustomCollapsed
        selected={selectedCompany?.company?._id === item?._id}
        name={`شرکت ${item?.name}`}
        subName={`قیمت : ${itemTotalSum.toLocaleString()} تومان`}
        useState={collapsedStates[index]}
        collapsedHandler={() => toggleCollapse(index)}>
        <View style={styles.sellListItemsWrapper}>
          {userItems.map((sellItem: any, index: number) => {
            const matchingObject = item?.companyPrice.find(
              (obj: any) => obj?.category === sellItem?._id,
            );

            return (
              <View key={index} style={styles.sellListItems}>
                <View>
                  <Text style={styles.itemsText}>{sellItem?.categoryName}</Text>
                  <Text style={styles.itemsText}>{`${
                    sellItem?.value
                  } X ${matchingObject?.price.toLocaleString()} = ${(
                    sellItem?.value * matchingObject?.price
                  ).toLocaleString()}`}</Text>
                </View>
                <Image
                  source={{uri: sellItem?.picture}}
                  style={styles.imageStyle}
                />
              </View>
            );
          })}
        </View>
        <CustomButton
          title="تایید"
          outline
          onPress={() => {
            onCompanySelected(item);
          }}
        />
      </CustomCollapsed>
    );
  }

  if (company?.length <= 0) {
    return (
      <View style={styles.emptyTextView}>
        <Image source={icons.empty} />
        <Text style={styles.emptyText}>{keyWords.emptyArray}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={company}
      renderItem={renderItem}
      keyExtractor={item => item?._id.toString()}
    />
  );
};

export default FlatICompanyItemPrice;

const styles = StyleSheet.create({
  sellListItemsWrapper: {
    rowGap: 10,
  },
  sellListItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: SIZES.homeIcons.borderRadius,
  },
  itemsText: {
    fontFamily: FONTS.body4.fontFamily,
  },
  emptyTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  emptyText: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
  },
});
