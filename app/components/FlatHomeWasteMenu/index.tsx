import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  flatListItems,
  icons,
  images,
} from '../../constants';
import CustomInput from '../CustomInput';
import api from '../../api';
import {useQuery} from 'react-query';
import {getAllCategories} from '../../values/querryTags';
import FastImage from 'react-native-fast-image';
type Item = {
  _id: number;
  name: string;
  icon: number; // You might want to replace 'any' with a more specific type.
  value: string;
};

type Props = {
  setInputValues?: any;
  addItem: any;
  inputValues: any;
};

const FlatHomeWasteMenu = ({setInputValues, addItem, inputValues}: Props) => {
  const {data, isLoading, refetch} = useQuery([getAllCategories], () =>
    api.get.common.getAllCategories({type: 'home'}),
  );

  const wasteItems = data?.result?.docs;

  const handleInputChange = (item: Item, value: string) => {
    const existingItem = inputValues.find((i: Item) => i._id === item._id);
    if (value === '') {
      if (existingItem) {
        const updatedItems = inputValues.filter(
          (i: Item) => i._id !== item._id,
        );
        setInputValues(updatedItems);
      }
    } else {
      if (existingItem) {
        existingItem.value = value;
        setInputValues([...inputValues]);
      } else {
        addItem({...item, value});
      }
    }
  };
  //
  //
  function renderItem({item}: {item: any}) {
    const inputValue = inputValues.find((i: Item) => i._id === item._id);
    return (
      <View style={styles.itemsContainer}>
        <FastImage
          defaultSource={icons.noneImage}
          source={{uri: item?.picture}}
          style={styles.imageStyle}
          resizeMode={FastImage.resizeMode.cover} // Adjust the resizeMode as needed
        />
        <View style={styles.informationContainer}>
          <Text style={styles.textStyle}>{item.categoryName}</Text>
          <CustomInput
            value={inputValue ? inputValue.value : item.value}
            placeholder="چند کیلو؟"
            textAlign="center"
            keyboardType="numeric"
            onChangeText={value => handleInputChange(item, value)}
            badgeText="کیلوگرم"
            maxLength={3}
          />
        </View>
      </View>
    );
  }
  //
  //
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.light.primaryColor} />
        </View>
      ) : (
        <FlatList
          data={wasteItems}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          numColumns={2}
        />
      )}
    </>
  );
};

export default FlatHomeWasteMenu;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.homeIcons.borderRadius,
    borderColor: COLORS.light.homeIcons.borderColor,
    borderWidth: SIZES.homeIcons.borderWidth,
    margin: SIZES.homeIcons.margin,
    padding: SIZES.homeIcons.padding,
  },
  imageStyle: {
    width: '90%',
    height: 120,
    borderRadius: SIZES.homeIcons.borderRadius,
  },
  informationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONTS.largeTitle.fontFamily,
    marginTop: SIZES.homeIcons.margin,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
