import {Formik} from 'formik';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {useMutation} from 'react-query';
import api from '../../../api';
import {CustomButton, CustomToast} from '../../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
  keyWords,
} from '../../../constants';
import {LoginDataContext} from '../../../contexts';
import {setPref} from '../../../preferences/helper';
import {prettySeconds} from '../../../utils/helperFunction';
import values from '../../../values';
type Props = {
  route: any;
  navigation: any;
};
interface FormValues {
  otpNumber: string;
}
const EXPIRE_TIME_IN_SECONDS = 120;

const OtpScreen = (props: Props) => {
  const screensTags = values.ScreensTags;
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);
  const [seconds, setSeconds] = useState(EXPIRE_TIME_IN_SECONDS);
  const mobailNumber = props?.route?.params?.mobileNumber;
  let otpInput = useRef(null);
  const {setLoginData} = useContext(LoginDataContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(oldValue => {
        if (oldValue > 0) {
          return oldValue - 1;
        } else {
          return oldValue;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resendCode = async () => {
    if (seconds === 0) {
      await api.get.auth.sendVerifySms({
        phoneNumber: mobailNumber,
      });
      toastRef.current.show({
        type: 'success',
        text: keyWords.reSendCode,
        duration: 3000,
      });
      setSeconds(EXPIRE_TIME_IN_SECONDS);
    } else {
      toastRef.current.show({
        type: 'warning',
        text: keyWords.expireCode,
        duration: 3000,
      });
    }
  };

  const backToNumberScreen = () => {
    props.navigation.replace(screensTags.AUTH.SIGNIN_SCREEN);
  };

  const mutation = useMutation(async (formData: FormValues) => {
    const response = await api.post.auth.userSingIn({
      mobailNumber: mobailNumber,
      values: formData,
    });

    if (response.success === false && response.error.data.CODE === 5023) {
      toastRef.current.show({
        type: 'error',
        text: keyWords.SendCodeExpire,
        duration: 3000,
      });
    } else if (
      response.success === false &&
      response.error.data.CODE === 5024
    ) {
      toastRef.current.show({
        type: 'error',
        text: keyWords.SendCodeWorng,
        duration: 3000,
      });
    } else {
      setPref('TOKEN', response?.result?.token);
      setLoginData(response);
      props.navigation.replace(screensTags.SCREEN_MAIN);
    }
  });

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Image source={images.background} style={styles.screenBackground} />
      <CustomToast ref={toastRef} />
      <Image source={images.appLogo} style={styles.logoStyle} />
      <Text style={styles.textStyle}>
        کد تایید به شماره{' '}
        <Text style={styles.mobailNumberText}>{mobailNumber}</Text> ارسال گردید
      </Text>
      <Formik
        initialValues={{otpNumber: ''}}
        onSubmit={values => {
          if (!values.otpNumber) {
            toastRef.current.show({
              type: 'error',
              text: keyWords.emptyOtpCode,
              duration: 3000,
            });
          } else {
            mutation.mutate(values);
          }
        }}>
        {({handleChange, handleSubmit, values}) => (
          <View style={styles.inputContainer}>
            <View style={styles.otpWrapper}>
              <OTPTextInput
                ref={(e: any) => (otpInput = e)}
                inputCount={5}
                handleTextChange={(e: any) => {
                  handleChange('otpNumber')(e);
                }}
                containerStyle={styles.otpConatiner}
                tintColor={COLORS.light.primaryColor}
                offTintColor={COLORS.light.primarylightColor}
                defaultValue={values.otpNumber}
              />
              {seconds === 0 ? (
                <View style={styles.reSendContainer}>
                  <TouchableOpacity
                    style={styles.resendCodeButton}
                    onPress={() => resendCode()}>
                    <Image source={icons.refreshColor} />
                    <Text style={styles.resendCode}>ارسال دوباره کد</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resendCodeButton}
                    onPress={() => backToNumberScreen()}>
                    {/* <Image source={icons.refreshColor} /> */}
                    <Text style={styles.resendCode}>
                      آیا شماره درست وارد شده؟
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.resendCodeButton}
                  onPress={() => resendCode()}>
                  <Text style={styles.resendCode}>
                    زمان اعتبار کد ({prettySeconds(seconds)}){' '}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <CustomButton title="ورود" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default OtpScreen;

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
  otpInput: {
    fontFamily: FONTS.largeTitle.fontFamily,
  },
  otpConatiner: {
    marginHorizontal: 20,
  },
  otpWrapper: {
    marginBottom: 10,
    rowGap: 20,
  },
  reSendContainer: {
    rowGap: 5,
  },
  textStyle: {
    fontFamily: FONTS.body4.fontFamily,
    fontSize: FONTS.body4.fontSize,
    textAlign: 'center',
    marginTop: 20,
  },
  resendCode: {
    fontFamily: FONTS.largeTitle.fontFamily,
    fontSize: FONTS.body4.fontSize,
    textAlign: 'center',
  },
  mobailNumberText: {
    fontFamily: FONTS.largeTitle.fontFamily,
    fontSize: FONTS.body3.fontSize,
  },
  resendCodeButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    rowGap: 30,
  },
});
