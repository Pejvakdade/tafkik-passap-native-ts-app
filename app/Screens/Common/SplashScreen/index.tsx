import {StackNavigationProp} from '@react-navigation/stack';
import AnimatedLottieView from 'lottie-react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useQuery} from 'react-query';
import api from '../../../api';
import {CustomToast} from '../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  animations,
  images,
  keyWords,
} from '../../../constants';
import {LoginDataContext} from '../../../contexts';
import {prefToken} from '../../../preferences';
import values from '../../../values';
import {splashGetUserInfo} from '../../../values/querryTags';
type Props = {
  navigation: StackNavigationProp<any, 'SplashScreen'>;
};
const SplashScreen = (props: Props) => {
  const screensTags = values.ScreensTags;
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);
  const [callApi, setcallApi] = useState(false);
  const {setLoginData} = useContext(LoginDataContext);

  const {data, error, isLoading} = useQuery(
    splashGetUserInfo,
    api.get.auth.getUserInfo,
    {
      enabled: callApi, // Disable automatic fetching
    },
  );

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      const isLoggedIn = await prefToken.get();
      if (isLoggedIn === null) {
        setTimeout(
          () => props.navigation.replace(screensTags.AUTH.SIGNIN_SCREEN),
          1700,
        );
      } else {
        setcallApi(true);
        if (
          data?.status === 401 ||
          data?.status === 403 ||
          data?.status === 404
        ) {
          toastRef.current.show({
            type: 'error',
            text: keyWords.tokenExpire,
            duration: 3000,
          });
          setTimeout(
            () => props.navigation.replace(screensTags.AUTH.SIGNIN_SCREEN),
            1700,
          );
        } else if (data?.CODE === 2010) {
          setLoginData(data);
          setTimeout(
            () => props.navigation.replace(screensTags.SCREEN_MAIN),
            1700,
          );
        }
      }
    };

    checkLoginAndFetchData();
  }, [isLoading, data]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Image source={images.appText} style={styles.appLogo} />
      <CustomToast ref={toastRef} />

      <Text style={styles.sloganText}>{keyWords.applicationSlogan}</Text>
      <AnimatedLottieView
        source={animations.splashAnimation}
        style={styles.lottieSplash}
        autoPlay
        loop
      />
      <AnimatedLottieView
        source={animations.splashLoadingAnimation}
        style={styles.lottieLoading}
        autoPlay
        loop
      />
      <Text style={styles.versionText}>نسخه {keyWords.appVersion}</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.light.splashBackground,
    width: SIZES.width,
    height: SIZES.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLogo: {
    width: SIZES.width / 1.5,
    height: SIZES.height / 9,
  },
  sloganText: {
    fontFamily: FONTS.h2.fontFamily,
    fontSize: FONTS.h3.fontSize,
    marginVertical: SIZES.base1,
    color: COLORS.light.greenText,
  },
  lottieSplash: {
    width: SIZES.width,
    height: SIZES.height / 2.5,
  },
  lottieLoading: {
    width: SIZES.width / 9,
    height: SIZES.height / 11,
  },
  versionText: {
    fontFamily: FONTS.h4.fontFamily,
    color: COLORS.light.greenText,
    fontSize: FONTS.h4.fontSize,
  },
});
