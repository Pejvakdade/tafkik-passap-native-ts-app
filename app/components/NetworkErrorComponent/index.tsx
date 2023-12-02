import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import AnimatedLottieView from 'lottie-react-native';
import {COLORS, FONTS, SIZES, animations, icons} from '../../constants';
import CustomButton from '../CustomButton';

type Props = {
  isConnected?: boolean;
  setIsConnected?: any;
};

const NetworkErrorComponent = ({isConnected, setIsConnected}: Props) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  const handleButtonPress = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };
  if (isConnected) {
    return;
  }
  return (
    <View style={styles.screenContainer}>
      <AnimatedLottieView
        source={animations.lostInternet2}
        style={styles.lottieSplash}
        autoPlay
        loop
        speed={0.3}
      />
      <Text style={styles.lostConnectionText}>
        دسترسی شما به اینترنت قطع شده
      </Text>
      <CustomButton
        title="تلاش دوباره"
        imgIcon={icons.refreshIcon}
        onPress={handleButtonPress}
      />
    </View>
  );
};

export default NetworkErrorComponent;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.backgroundColor,
  },
  lottieSplash: {
    width: SIZES.width,
    height: SIZES.height / 2.5,
  },
  lostConnectionText: {
    fontFamily: FONTS.largeTitle.fontFamily,
    fontSize: FONTS.h3.fontSize,
    marginVertical: SIZES.base1,
    color: '#445522',
  },
});
