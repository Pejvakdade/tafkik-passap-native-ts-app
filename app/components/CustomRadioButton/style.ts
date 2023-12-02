import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

type Props = {
  isDarkMode: boolean;
  borderRadius?: number;
};

const stylesMaker = (props: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      margin: -5,
      backgroundColor: '#F9F9F9',
      borderWidth: 1,
      borderColor: COLORS.light.greenText,
      borderRadius: 0, // Set border radius to 0 for all buttons
      padding: 10,
      alignItems: 'center',
    },
    firstButton: {
      borderTopLeftRadius: props.borderRadius ? props.borderRadius : 8, // Left border radius for the first button
      borderBottomLeftRadius: props.borderRadius ? props.borderRadius : 8,
    },
    lastButton: {
      borderTopRightRadius: props.borderRadius ? props.borderRadius : 8, // Right border radius for the last button
      borderBottomRightRadius: props.borderRadius ? props.borderRadius : 8,
    },
    selectedButton: {
      backgroundColor: '#88ABA8', // Change this to your desired selected button style
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};

export default stylesMaker;
