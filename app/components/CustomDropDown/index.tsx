import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface CustomDropDownProps {
  caption?: string;
  onSelect?: (selectedItem: any, index: number) => void;
  disabled?: boolean;
  defaultValue?: string;
  options: {[key: string]: any}[];
  rowItemName: string;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  onSelect,
  defaultValue,
  caption,
  disabled,
  rowItemName,
}) => {
  const [onSelectValue, setOnSelectValue] = useState<null | {
    [key: string]: any;
  }>(null);
  const isEmpty = options?.length === 0;
  return (
    <View style={styles.dropDownContainer}>
      <SelectDropdown
        data={options}
        disabled={disabled}
        onSelect={(selectedItem, index) => {
          if (onSelect) {
            onSelect(selectedItem, index);
            setOnSelectValue(selectedItem);
          }
        }}
        selectedRowStyle={styles.selectedRowStyle}
        defaultButtonText={caption}
        defaultValue={defaultValue}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem?.[rowItemName];
        }}
        rowTextForSelection={(item, index) => {
          return item?.[rowItemName];
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={
          onSelectValue
            ? styles.selectDropdown1BtnTxtStyle
            : styles.dropdown1BtnTxtStyle
        }
        renderDropdownIcon={isOpened => {
          return (
            <Image
              source={isOpened ? icons.upArrow : icons.downArrow}
              style={styles.dropdownIcon}
            />
          );
        }}
        dropdownIconPosition={'left'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
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
    width: '100%',
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
});

export default CustomDropDown;
