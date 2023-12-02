import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons} from '../../constants';

type Props = {
  navigation: any;
  title: string;
};

const CustomNavigationHeader = ({navigation, title}: Props) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backButtonWrapper}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Image source={icons.chevronRight} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomNavigationHeader;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    alignItems: 'flex-end',
    backgroundColor: COLORS.light.backgroudnColor,
  },
  backButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.body4.fontFamily,
    color: COLORS.light.greenText,
    marginHorizontal: 10,
  },
});
