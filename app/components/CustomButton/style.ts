import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

type Props = {
  color?: string;
  isDarkMode: boolean;
  backgroundColor?: string;
  outline: boolean | undefined;
  isFlex: boolean | undefined;
};

const stylesMaker = (props: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  // const contentBackgroundColor = props.isDarkMode
  //   ? COLORS.dark.AQUAMARINE_300
  //   : COLORS.light.AQUAMARINE_300;

  const lightColor = props.outline
    ? COLORS.light.input.lableColor
    : COLORS.light.defaultButton.color;

  const textColor = props.isDarkMode ? COLORS.dark.whiteText : lightColor;

  return StyleSheet.create({
    content: {
      backgroundColor: props?.backgroundColor
        ? props?.backgroundColor
        : props.outline
        ? ''
        : COLORS.light.defaultButton.backgroundColor,
      margin: SIZES.button.margin,
      borderRadius: SIZES.button.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: props.outline ? 2 : 0,
      borderColor: props.outline ? COLORS.light.input.borderColor : '',
      flex: props.isFlex ? 1 : undefined,
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SIZES.base1,
      paddingVertical: SIZES.base,
    },
    text: {
      fontFamily: FONTS.h1.fontFamily,
      color: props?.color ? props?.color : textColor,
      fontSize: SIZES.h3,
    },
    iconStyle: {
      width: '9%',
      height: 30,
      marginRight: SIZES.base,
    },
  });
};

export default stylesMaker;
