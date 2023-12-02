import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, icons} from '../../constants';
import CustomButton from '../CustomButton';
import values from '../../values';

type Item = {
  _id: number;
  value: string;
  item: any; // You might want to replace 'any' with a more specific type.
};

type Props = {
  listItems: Item[];
  setListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  removeItem: (index: number) => void;
  navigation: any;
  modalVisible: any;
};

const FlatSellHomeWasteList = (props: Props) => {
  const screensTags = values.ScreensTags;

  function handleItemRemove(index: number) {
    props.removeItem(index); // Pass the index to remove
  }
  //
  //
  function renderItem({item, index}: {item: any; index: number}) {
    const itemStyles = [
      styles.itemsContainer,
      index === Object.values(props.listItems).length - 1
        ? styles.lastItem
        : null,
    ];
    return (
      <View style={itemStyles}>
        <Text style={styles.textStyle}>{item?.value} کیلوگرم</Text>
        <View style={styles.itemNameWrapper}>
          <Text style={styles.textStyle}>{item.categoryName}</Text>
          <Image source={{uri: item?.picture}} style={styles.itemImage} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleItemRemove(index)}>
            <Image source={icons.x} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  //
  //
  return (
    <>
      <FlatList
        data={Object.values(props.listItems)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomButton
        title="مرحله بعدی"
        onPress={() => {
          props.modalVisible(false);
          props.navigation.navigate(
            screensTags.BodyScreen.PURCHASE_OPERATIONS_SCREEN,
            {items: props.listItems},
          );
        }}
      />
    </>
  );
};

export default FlatSellHomeWasteList;
const styles = StyleSheet.create({
  itemsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  lastItem: {
    borderBottomWidth: 0, // Remove the border for the last item
  },
  itemNameWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 10,
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
