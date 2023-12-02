import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, SIZES, icons, keyWords} from '../../constants';
import {boolean} from 'yup';

type Props = {
  items: {_id: number; name: string; iconName: any}[];
  navigation: any; // Add this prop
  setIsModal: (isModal: boolean) => void;
  toastRef?: any;
};

const FlatMoreMenu = ({items, navigation, setIsModal, toastRef}: Props) => {
  //
  //
  function renderItem({item}: {item: any}) {
    return (
      <TouchableOpacity
        style={styles.itemsContainer}
        onPress={
          item._id === 10
            ? () => {
                setIsModal(true);
              }
            : () => {
                if (item.screen) {
                  navigation.navigate(item.screen);
                } else {
                  toastRef.current.show({
                    type: 'warning',
                    text: keyWords.commingSoon,
                    duration: 3000,
                  });
                }
              }
        }>
        <Image source={icons.chevronLeft} />
        <View style={styles.itemsWrapper}>
          <Text style={styles.textStyle}>{item.name}</Text>
          <Image source={item.iconName} />
        </View>
      </TouchableOpacity>
    );
  }
  //
  //
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
  );
};

export default FlatMoreMenu;

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: SIZES.moreIcons.borderWidth,
    marginHorizontal: SIZES.moreIcons.margin,
    paddingVertical: SIZES.moreIcons.padding,
    marginVertical: 3,
    borderRadius: SIZES.moreIcons.borderRadius,
  },
  itemsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.moreIcons.margin,
  },
  textStyle: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    marginHorizontal: SIZES.moreIcons.margin,
  },
});
