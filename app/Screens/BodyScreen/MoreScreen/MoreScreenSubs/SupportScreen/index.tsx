import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomSocialIcons} from '../../../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
  keyWords,
} from '../../../../../constants';

type Props = {};

const SupportScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.screenStyle}>
      <Image source={images.appLogo} style={styles.logoStyle} />
      <View style={styles.textWImage}>
        <Text style={styles.textStyle}>
          ایمیل : <Text style={styles.boldText}>info@TafkikApp.ir</Text>
        </Text>
        <Image source={icons.email} style={styles.textIcon} />
      </View>
      <View style={styles.textWImage}>
        <Text style={styles.textStyle}>
          شماره تماس : <Text style={styles.boldText}>09002120007</Text>
        </Text>
        <Image source={icons.phone} style={styles.textIcon} />
      </View>
      <View style={styles.socialIconsWrapper}>
        <CustomSocialIcons socialMedia="instagram" />
        <CustomSocialIcons socialMedia="telegram" />
        <CustomSocialIcons socialMedia="whatsapp" />
        <CustomSocialIcons socialMedia="twitter" />
      </View>
      <TouchableOpacity style={styles.textWImage}>
        <Text style={styles.textStyle}>معرفی‌به‌دوستان</Text>
        <Image source={icons.share} style={styles.textIcon} />
      </TouchableOpacity>
      <Text style={styles.versionText}>نسخه {keyWords.appVersion}</Text>
    </SafeAreaView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: COLORS.light.backgroudnColor,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  logoStyle: {
    width: SIZES.width / 2,
    height: SIZES.height / 4,
  },
  socialIconsWrapper: {
    flexDirection: 'row',
  },
  textWImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textStyle: {
    fontFamily: FONTS.body3.fontFamily,
  },
  textIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: FONTS.h1.fontFamily,
  },
  versionText: {
    fontFamily: FONTS.h4.fontFamily,
    color: COLORS.light.greenText,
    fontSize: FONTS.h4.fontSize,
  },
});
