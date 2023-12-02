import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useQuery} from 'react-query';
import api from '../../api';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {getAllCity} from '../../values/querryTags';

interface Option {
  title: string;
  longitude: number;
  latitude: number;
  _id: string;
  provinceId: string;
}

interface CustomDropDownCityProps {
  onSelect?: (selectedItem: string, index: number) => void;
  province?: any;
  error?: any;
  touch?: any;
  formikValue?: any;
}

const CustomDropDownCity: React.FC<CustomDropDownCityProps> = ({
  onSelect,
  province,
  formikValue,
  touch,
  error,
}) => {
  const [onSelectValue, setOnSelectValue] = useState<Option | null>(null);

  const {data: allCity, isLoading} = useQuery(
    [getAllCity, province?._id],
    async () => {
      const result = await api.get.location.getAllCitys({id: province?._id});
      return result;
    },
    {
      enabled: !!province,
    },
  );

  return (
    <View style={styles.dropDownContainer}>
      <Text style={styles.inputLable}>شهر</Text>
      <SelectDropdown
        data={isLoading !== true && allCity?.result}
        onSelect={(selectedItem, index) => {
          if (onSelect) {
            onSelect(selectedItem, index);
            setOnSelectValue(selectedItem);
            formikValue('selectedOptionCity', selectedItem._id);
          }
        }}
        rowTextForSelection={(item, index) => {
          return item.title;
        }}
        search={true}
        searchPlaceHolder={'جستجو'}
        defaultButtonText={'شهر خود را انتخاب کنید'}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={
          onSelectValue
            ? styles.selectDropdown1BtnTxtStyle
            : styles.dropdown1BtnTxtStyle
        }
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        selectedRowStyle={styles.selectedRowStyle}
        searchInputTxtStyle={styles.searchInputTextStyle}
        renderDropdownIcon={isOpened => (
          <Image
            source={isOpened ? icons.upArrow : icons.downArrow}
            style={styles.dropdownIcon}
          />
        )}
        dropdownIconPosition={'left'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.title; // Display the title after selection
        }}
        disabled={!province}
      />
      {error && touch && <Text style={styles.errorStyle}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    margin: SIZES.input.margin,
  },

  // Define your styles here
  dropdown1BtnStyle: {
    // Your button style
    borderRadius: SIZES.input.borderRadius,
    width: 'auto',
    backgroundColor: COLORS.light.whiteText,
    borderWidth: SIZES.input.borderWidth,
    borderColor: COLORS.light.input.borderColor,
    height: 45,
    lineHeight: 40,
  },
  dropdown1BtnTxtStyle: {
    // Your button text style
    fontSize: SIZES.body3,
    fontFamily: FONTS.body3.fontFamily,
    verticalAlign: 'middle',
    color: COLORS.light.input.placeHolder,
    // backgroundColor: 'red',
    textAlign: 'right',
  },
  selectDropdown1BtnTxtStyle: {
    fontSize: SIZES.body3,
    fontFamily: FONTS.body3.fontFamily,
    verticalAlign: 'middle',
    color: COLORS.light.input.textColor,
    textAlign: 'right',
  },
  dropdown1DropdownStyle: {
    backgroundColor: COLORS.light.input.dropDownBackground,
    borderRadius: SIZES.input.borderRadius,
    height: 200,
  },
  dropdown1RowStyle: {
    // Your row style
  },
  dropdown1RowTxtStyle: {
    // Your row text style
    fontSize: SIZES.body3,
    fontFamily: FONTS.body3.fontFamily,
    verticalAlign: 'middle',
    color: COLORS.light.input.textColor,
    textAlign: 'right',
  },
  selectedRowStyle: {
    backgroundColor: COLORS.light.input.dropDownSelected,
    textAlign: 'right',
  },
  dropdownIcon: {
    width: 30,
    height: 30,
  },
  searchInputTextStyle: {
    fontFamily: FONTS.body2.fontFamily,
    textAlign: 'right',
  },
  inputLable: {
    fontSize: SIZES.body4,
    fontFamily: FONTS.h1.fontFamily,
    marginHorizontal: SIZES.input.margin,
    paddingBottom: 2,
    color: COLORS.light.input.lableColor,
  },
  errorStyle: {
    fontSize: 10,
    fontFamily: FONTS.body3.fontFamily,
    marginHorizontal: SIZES.input.margin,
    paddingBottom: 2,
    color: 'red',
    position: 'absolute',
    bottom: -22,
    right: 0,
  },
});

export default CustomDropDownCity;
