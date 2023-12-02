import React, {useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import api from '../../../api';
import {CustomButton, CustomInput, CustomToast} from '../../../components';
import {COLORS, SIZES, icons, images, keyWords} from '../../../constants';
import {isValidMobileNumber} from '../../../utils/validations';
import values from '../../../values';
isValidMobileNumber;
type Props = {
  navigation: any;
};

const SignInScreen = (props: Props) => {
  const screensTags = values.ScreensTags;
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);

  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLosading] = useState(false);

  const onNextButtonPress = async () => {
    if (!isValidMobileNumber(mobileNumber, toastRef)) {
      return;
    }
    setIsLosading(true);
    const resSendCode = await api.get.auth.sendVerifySms({
      phoneNumber: mobileNumber,
    });

    if (!resSendCode) {
      toastRef.current.show({
        type: 'error',
        text: keyWords.sendSmsError,
        duration: 3000,
      });
      setIsLosading(false);
    } else if (resSendCode.CODE !== 2010) {
      toastRef.current.show({
        type: 'error',
        text: keyWords.sendSmsError,
        duration: 3000,
      });
      setIsLosading(false);
    } else if (resSendCode.CODE === 2010 && resSendCode.result === false) {
      props.navigation.replace(screensTags.AUTH.REGISTER_OTP_SCREEN, {
        mobileNumber,
      });
    } else {
      props.navigation.replace(screensTags.AUTH.OTP_SCREEN, {
        mobileNumber,
      });
      setIsLosading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Image source={images.background} style={styles.screenBackground} />
      <CustomToast ref={toastRef} />
      <Image source={images.appLogo} style={styles.logoStyle} />
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="لطفا شماره خودتان را وارد کنید"
          lableText="شماره موبایل"
          imgIcon={icons.phone}
          textAlign="center"
          keyboardType="number-pad"
          onChangeText={setMobileNumber}
          maxLength={11}
        />
        <CustomButton
          title="ارسال کد"
          onPress={onNextButtonPress}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.light.backgroudnColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenBackground: {
    width: SIZES.width,
    height: SIZES.height,
    position: 'absolute',
  },
  logoStyle: {
    width: SIZES.width / 2,
    height: SIZES.height / 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
