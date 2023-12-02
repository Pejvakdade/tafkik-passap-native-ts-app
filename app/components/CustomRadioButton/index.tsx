import React, {useMemo, useState} from 'react';
import {View, TouchableOpacity, Text, useColorScheme} from 'react-native';
import stylesMaker from './style';
type Props = {
  options: Array<{label: string; value: string}>;
  onPress?: (value: string) => void;
  borderRadius?: number;
};
const CustomRadioButton = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState(props.options[0].value);
  const isDarkMode = useColorScheme() === 'dark';

  const handleSelectOption = (value: any) => {
    props.onPress && props.onPress(value);
    setSelectedOption(value);
  };

  const styles = useMemo(() => {
    return stylesMaker({isDarkMode, borderRadius: props.borderRadius});
  }, [isDarkMode, props.borderRadius]);

  return (
    <View style={styles.container}>
      {props.options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleSelectOption(option.value)}
          style={[
            styles.button,
            {marginLeft: index === 0 ? 0 : 5},
            index === 0 && styles.firstButton,
            index === props.options.length - 1 && styles.lastButton,
            selectedOption === option.value && styles.selectedButton,
          ]}>
          <Text style={styles.buttonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomRadioButton;
