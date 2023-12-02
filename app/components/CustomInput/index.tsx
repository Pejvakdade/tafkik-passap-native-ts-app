import React, {useMemo} from 'react';
import {
  TextInput,
  useColorScheme,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
  Text,
  Image,
} from 'react-native';

import stylesMaker from './style';
import {COLORS} from '../../constants';

type Props = {
  style?: any;
  value?: string;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  onBlurText?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  lableText?: string;
  imgIcon?: any;
  iconWidth?: number;
  textAlign?: 'right' | 'left' | 'center';
  badgeText?: string;
  error?: string;
  touch?: any;
};

const CustomInput = (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = useMemo(() => {
    return stylesMaker({
      isDarkMode,
      isIcon: props.imgIcon,
      iconWidth: props.iconWidth,
      inputTextAlign: props.textAlign,
      isText: props.badgeText,
    });
  }, [
    isDarkMode,
    props.imgIcon,
    props.iconWidth,
    props.textAlign,
    props.badgeText,
  ]);

  return (
    <View style={styles.inputContainer}>
      {props.lableText && (
        <Text style={styles.inputLable}>{props.lableText}</Text>
      )}
      <View style={styles.content}>
        {props.badgeText && (
          <Text style={styles.badgeStyle}>{props.badgeText}</Text>
        )}
        <TextInput
          style={{...styles.textInput, ...props.style}}
          value={props.value}
          onBlur={props.onBlurText}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          placeholderTextColor={
            isDarkMode ? COLORS.dark.greenText : COLORS.light.input.placeHolder
          }
        />
        {props.imgIcon && (
          <Image style={styles.iconStyle} source={props.imgIcon} />
        )}
      </View>
      {props.error && props.touch && (
        <Text style={styles.errorStyle}>{props.error}</Text>
      )}
    </View>
  );
};

export default CustomInput;
