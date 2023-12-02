import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CustomModal,
  FlatHomeWasteMenu,
  FlatSellHomeWasteList,
} from '../../../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../../../constants';

type Item = {
  _id: number;
  value: string;
  item: any; // You might want to replace 'any' with a more specific type.
};

type Props = {
  navigation: any; // Add this prop
};

const HomeWasteScreen = (props: Props) => {
  const [inputValues, setInputValues] = useState<Item[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addItem = (newItem: Item) => {
    setInputValues([...inputValues, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...inputValues];
    updatedItems.splice(index, 1);
    setInputValues(updatedItems);
  };

  const inputValuesLength = Object.keys(inputValues).length;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.textsContainer}>
        <View style={styles.orderList}>
          <Text style={styles.headerSubText}>لیست فروش</Text>
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.bascketContainer}>
            <Image source={icons.basket} />
            {inputValuesLength > 0 && (
              <Text style={styles.countStyle}>{inputValuesLength}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerTexth1}>دسته‌بندی ها</Text>
          <View style={styles.subTextContainer}>
            <Text style={styles.headerSubText}>
              وزن حدودی زباله خودتان را وارد کنید
            </Text>
            <Image source={icons.info} />
          </View>
        </View>
      </View>
      <CustomModal
        height={inputValuesLength == 0 ? '' : SIZES.height / 2}
        isVisible={isModalVisible}
        position="flex-end"
        buttonText={'بستن'}
        onPress={toggleModal}>
        {inputValuesLength == 0 ? (
          <Text style={styles.emptybagText}>سبد شما خالی است</Text>
        ) : (
          <FlatSellHomeWasteList
            listItems={inputValues}
            setListItems={setInputValues}
            removeItem={removeItem}
            navigation={props.navigation}
            modalVisible={setModalVisible}
          />
        )}
      </CustomModal>
      <FlatHomeWasteMenu
        setInputValues={setInputValues}
        addItem={addItem}
        inputValues={inputValues}
      />
    </SafeAreaView>
  );
};

export default HomeWasteScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.light.backgroudnColor,
  },
  textsContainer: {
    borderBottomWidth: SIZES.homeIcons.borderWidth,
    padding: SIZES.homeIcons.padding,
    margin: SIZES.homeIcons.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTexth1: {
    fontFamily: FONTS.h2.fontFamily,
    fontSize: FONTS.h2.fontSize,
    color: COLORS.light.greenText,
  },
  emptybagText: {
    fontFamily: FONTS.body4.fontFamily,
    paddingVertical: 20,
  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  headerSubText: {
    fontFamily: FONTS.body4.fontFamily,
    fontSize: 12,
  },
  countStyle: {
    fontFamily: FONTS.largeTitle.fontFamily,
    position: 'absolute',
    top: 0,
    right: 0,
    color: COLORS.light.whiteText,
    backgroundColor: COLORS.light.greenText,
    borderRadius: 50,
    elevation: 5,
    fontSize: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bascketContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light.splashBackground,
    borderRadius: 50,
    padding: SIZES.input.padding,
    elevation: 5,
    position: 'relative',
  },
  orderList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
