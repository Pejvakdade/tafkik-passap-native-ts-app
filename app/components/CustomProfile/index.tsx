import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

type Props = {
  fullName: string;
  balance?: number;
};

const CustomProfile = ({fullName, balance}: Props) => {
  return (
    <TouchableOpacity style={styles.profileContainer}>
      <Image source={icons.noneProfile} style={styles.profileImg} />
      <View style={styles.textsContainer}>
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileBalance}>
          موجودی شما {balance?.toLocaleString()} تومان
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomProfile;

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: SIZES.profile.rowGap,
    borderBottomWidth: 1,
    marginHorizontal: SIZES.profile.margin,
    marginBottom: 10,
  },
  profileImg: {
    width: SIZES.profile.imageSize,
    height: SIZES.profile.imageSize,
  },
  textsContainer: {
    alignItems: 'center',
  },
  profileName: {
    fontFamily: FONTS.largeTitle.fontFamily,
    fontSize: FONTS.h2.fontSize,
    color: COLORS.light.greenText,
    lineHeight: FONTS.h2.lineHeight,
  },
  profileBalance: {
    fontFamily: FONTS.body4.fontFamily,
    lineHeight: FONTS.h2.lineHeight,
  },
});
