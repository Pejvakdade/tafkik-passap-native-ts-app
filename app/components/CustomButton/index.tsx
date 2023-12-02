// import React, {useMemo} from 'react';
// import {
//   useColorScheme,
//   TouchableOpacity,
//   Text,
//   View,
//   Image,
// } from 'react-native';

// import stylesMaker from './style';

// type Props = {
//   onPress?: () => void;
//   onPressIn?: () => void;
//   onPressOut?: () => void;
//   onLongPress?: () => void;
//   title?: string;
//   color?: string;
//   imgIcon?: any;
//   disabled?: boolean;
//   textStyle?: {};
//   contentStyle?: {};
//   backgroundColor?: string;
//   outline?: boolean;
//   isFlex?: boolean;
// };

// const CustomButton = (props: Props) => {
//   // ** ===========================================================================================================================
//   // ** ------------------------------------------------- Start Values Validation -------------------------------------------------

//   const isDarkMode = useColorScheme() === 'dark';

//   const styles = useMemo(() => {
//     return stylesMaker({
//       color: props.color,
//       isDarkMode,
//       backgroundColor: props.backgroundColor,
//       outline: props.outline,
//       isFlex: props.isFlex,
//     });
//   }, [
//     isDarkMode,
//     props.backgroundColor,
//     props.color,
//     props.outline,
//     props.isFlex,
//   ]);

//   // ** -------------------------------------------------- End Values Validation --------------------------------------------------
//   // ** ===========================================================================================================================

//   // ?? ===========================================================================================================================
//   // ?? ---------------------------------------------------- Start JSX Content ----------------------------------------------------

//   return (
//     <TouchableOpacity
//       style={{...styles.content, ...props.contentStyle}}
//       onPress={props.onPress}
//       disabled={props.disabled}
//       onPressIn={props.onPressIn}
//       onPressOut={props.onPressOut}
//       onLongPress={props.onLongPress}>
//       <View style={styles.wrapper}>
//         {props.imgIcon && (
//           <Image style={styles.iconStyle} source={props.imgIcon} />
//         )}
//         {props.title && (
//           <Text style={{...styles.text, ...props.textStyle}}>
//             {props.title}
//           </Text>
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   // ?? ----------------------------------------------------- End JSX Content -----------------------------------------------------
//   // ?? ===========================================================================================================================
// };

// export default CustomButton;
import React, {useMemo} from 'react';
import {
  useColorScheme,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';

import stylesMaker from './style';

type Props = {
  onPress?: () => void; // Updated onPress to return a Promise
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  title?: string;
  color?: string;
  imgIcon?: any;
  disabled?: boolean;
  textStyle?: {};
  contentStyle?: {};
  backgroundColor?: string;
  outline?: boolean;
  isFlex?: boolean;
  isLoading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>; // Callback to update loading state from parent
};

const CustomButton = (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = useMemo(() => {
    return stylesMaker({
      color: props.color,
      isDarkMode,
      backgroundColor: props.backgroundColor,
      outline: props.outline,
      isFlex: props.isFlex,
    });
  }, [
    isDarkMode,
    props.backgroundColor,
    props.color,
    props.outline,
    props.isFlex,
  ]);

  const handlePress = async () => {
    if (props.onPress) {
      props.setLoading && props.setLoading(true); // Notify parent about the start of loading
      try {
        await props.onPress(); // Assuming onPress might be an asynchronous operation
      } finally {
        props.setLoading && props.setLoading(false); // Notify parent about the end of loading
      }
    }
  };

  return (
    <TouchableOpacity
      style={{...styles.content, ...props.contentStyle}}
      onPress={handlePress}
      disabled={props.disabled || props.isLoading}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onLongPress={props.onLongPress}>
      <View style={styles.wrapper}>
        {props.isLoading ? (
          <ActivityIndicator color={styles.text.color} />
        ) : (
          <>
            {props.imgIcon && (
              <Image style={styles.iconStyle} source={props.imgIcon} />
            )}
            {props.title && (
              <Text style={{...styles.text, ...props.textStyle}}>
                {props.title}
              </Text>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
