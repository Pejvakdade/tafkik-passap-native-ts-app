import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

type Props = {
  isDarkMode: boolean;
  isIcon: any;
  iconWidth: number | undefined;
  inputTextAlign?: string;
  isText: any;
};

const stylesMaker = (props: Props) => {
  return StyleSheet.create({
    inputContainer: {
      margin: SIZES.input.margin,
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
    content: {
      paddingHorizontal: props.isIcon ? 0 : SIZES.input.padding,
      borderWidth: SIZES.input.borderWidth,
      borderColor: COLORS.light.input.borderColor,
      borderRadius: SIZES.radius,
      backgroundColor: props?.isDarkMode
        ? COLORS.dark.greenText
        : COLORS.light.whiteText,
      flexDirection: 'row',
      alignItems: 'center',
      height: 45,
      lineHeight: 40,
    },
    textInput: {
      color: props.isDarkMode ? COLORS.dark.whiteText : COLORS.light.greenText,
      fontSize: SIZES.body3,
      fontFamily: FONTS.body3.fontFamily,
      verticalAlign: 'middle',
      textAlign: props.inputTextAlign,
      width: props.isIcon ? '90%' : props.isText ? '85%' : '100%',
      alignItems: 'center',
    },
    iconStyle: {
      width: '10%',
      height: 38,
    },
    badgeStyle: {
      fontFamily: FONTS.h1.fontFamily,
      fontSize: 8,
      color: COLORS.light.splashBackground,
    },
  });
};

export default stylesMaker;
