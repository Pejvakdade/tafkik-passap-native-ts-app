import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Collapsible from 'react-native-collapsible';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

type Props = {
  useState?: any;
  children?: any;
  collapsedHandler?: any;
  name?: any;
  subName?: any;
  selected?: boolean;
};

const CustomCollapsed = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.collapsedHandler}
      style={[
        styles.collapsContainer,
        {
          borderColor: props.selected
            ? COLORS.light.primaryColor
            : COLORS.light.input.borderColor,
        },
      ]}>
      <View style={styles.collapsProfileContainer}>
        <View style={styles.collapsProfileWrapper}>
          <View style={styles.profileItemsWrapper}>
            <View>
              <Text style={styles.companyName}>{props.name}</Text>
              <Text style={styles.companyPrice}>{props.subName}</Text>
            </View>
            <View style={styles.profileImage}>
              <Image source={icons.company} />
            </View>
          </View>
        </View>
        {props.useState === true ? (
          <Image style={styles.collapsArrow} source={icons.downArrow} />
        ) : (
          <Image style={styles.collapsArrow} source={icons.upArrow} />
        )}
      </View>
      <Collapsible collapsed={props.useState}>
        <View>{props.children}</View>
      </Collapsible>
    </TouchableOpacity>
  );
};

export default CustomCollapsed;

const styles = StyleSheet.create({
  collapsContainer: {
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: SIZES.input.borderWidth,
    padding: 10,
    marginBottom: 10,
  },
  collapsProfileContainer: {
    alignItems: 'center',
    rowGap: 5,
  },
  collapsProfileWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: COLORS.light.input.borderColor,
  },
  profileItemsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light.splashBackground,
    borderRadius: 50,
    elevation: 5,
    padding: 10,
  },
  companyName: {
    fontFamily: FONTS.h3.fontFamily,
    fontSize: FONTS.h3.fontSize,
  },
  companyPrice: {
    fontFamily: FONTS.body4.fontFamily,
    fontSize: FONTS.body4.fontSize,
  },
  collapsArrow: {
    width: 15,
    height: 15,
  },
  // workTimeWrapper: {
  //   backgroundColor: 'red',
  // },
});
