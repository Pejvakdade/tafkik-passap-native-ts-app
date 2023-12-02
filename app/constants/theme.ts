import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const GREEN_600 = '#445522'; //with white text
const GREEN_500 = '#588157'; //with dark text
const GREEN_200 = '#A3B18A'; //with dark text
const GRAY_200 = '#DAD7CD'; //with dark text
const WHITE = '#FFFFFF'; //with dark text

const GRAY_1001 = '#f8f9fa'; //with white text
const GRAY_1002 = '#e9ecef'; //with white text
const GRAY_1003 = '#dee2e6'; //with dark text
const GRAY_1004 = '#ced4da'; //with dark text
const GRAY_1005 = '#adb5bd'; //with dark text
const GRAY_1006 = '#6c757d'; //with dark text
const GRAY_1007 = '#495057'; //with white text
const GRAY_1008 = '#343a40'; //with white text
const GRAY_1009 = '#212529'; //with white text

export const COLORS = {
  light: {
    primaryColor: GREEN_600,
    primarylightColor: GREEN_200,
    splashBackground: GREEN_200,
    backgroudnColor: WHITE,
    whiteText: WHITE,
    greenText: GREEN_600,
    // input colors
    input: {
      borderColor: GREEN_200,
      lableColor: GRAY_1006,
      placeHolder: GRAY_200,
      textColor: GREEN_600,
      dropDownBackground: GRAY_200,
      dropDownSelected: GREEN_200,
      dropDownSelectedColor: WHITE,
    },
    // buttons colors
    defaultButton: {
      backgroundColor: GREEN_600,
      color: WHITE,
    },
    //home icon Colors
    homeIcons: {
      backGroundColor: WHITE,
      borderColor: GREEN_200,
    },
  },
  dark: {
    splashBackground: GRAY_200,
    backgroudnColor: WHITE,
    whiteText: WHITE,
    greenText: GREEN_600,
    input: {
      borderColor: GREEN_200,
      lableColor: GRAY_1006,
    },
  },
};
export const SIZES = {
  // global sizes
  base: 8,
  base1: 16,
  font: 14,
  radius: 10,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,

  //modal
  modal: {
    horizontalPadding: 10,
  },

  //profile sizes
  profile: {
    margin: 10,
    borderRadios: 10,
    paddingVertical: 5,
    imageSize: 130,
    rowGap: 11,
  },

  //home icon Sizes
  homeIcons: {
    margin: 8,
    borderRadius: 10,
    borderWidth: 2,
    marginItems: 3,
    padding: 12,
  },
  //more icon Sizes
  moreIcons: {
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginItems: 3,
    padding: 12,
  },

  // button sizes
  button: {
    borderRadius: 10,
    margin: 10,
    textPadding: 10,
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 9,
  },
  // input sizes
  input: {
    margin: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
  },
  halfinput: {
    margin: 10,
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  slideShow: {
    marginHorizontal: 10,
    marginVertical: 30,
  },
};
export const FONTS = {
  largeTitle: {
    fontFamily: 'IRANSansXFaNum-Black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: {fontFamily: 'IRANSansXFaNum-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'IRANSansXFaNum-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'IRANSansXFaNum-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'IRANSansXFaNum-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontFamily: 'IRANSansXFaNum-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'IRANSansXFaNum-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'IRANSansXFaNum-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'IRANSansXFaNum-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
