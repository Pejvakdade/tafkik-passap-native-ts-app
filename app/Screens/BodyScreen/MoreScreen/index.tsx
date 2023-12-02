import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNRestart from 'react-native-restart';
import {
  CustomButton,
  CustomModal,
  CustomProfile,
  CustomToast,
  FlatMoreMenu,
  MySafeView,
} from '../../../components';
import {COLORS, FONTS, flatListItems, keyWords} from '../../../constants';
import {LoginDataContext} from '../../../contexts';
import {preferencesKeys} from '../../../preferences';
import {logout} from '../../../preferences/helper';

type Props = {
  navigation: any; // Add this prop
};

const MoreScreen = (props: Props) => {
  const {loginData} = useContext(LoginDataContext);
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);
  const data = loginData?.result?.user;

  const [onLogout, setOnLogout] = useState(false);

  const toggleLogOutModal = () => {
    setOnLogout(false);
  };

  function restartApp() {
    RNRestart.Restart();
  }

  function toggleLogOut() {
    logout(preferencesKeys.TOKEN);
    restartApp();
  }

  return (
    <View style={styles.container}>
      <CustomToast ref={toastRef} />
      <MySafeView>
        <View style={styles.safeViewWrapper}>
          <CustomProfile
            fullName={`${data?.firstName} ${data?.lastName}`}
            balance={data?.balance}
          />
          <FlatMoreMenu
            items={flatListItems.moreItemSchema}
            navigation={props.navigation}
            setIsModal={setOnLogout}
            toastRef={toastRef}
          />
        </View>
        <CustomModal
          buttonText={'بستن'}
          isVisible={onLogout}
          position="flex-end"
          onPress={toggleLogOutModal}>
          <Text style={styles.logOutTextStyle}>{keyWords.logOutText}</Text>
          <View style={styles.acceptButtonWrapper}>
            <CustomButton title="بله" onPress={toggleLogOut} isFlex />
            <CustomButton
              title="خیر"
              onPress={toggleLogOutModal}
              outline
              isFlex
            />
          </View>
        </CustomModal>
      </MySafeView>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.backgroudnColor,
  },
  safeViewWrapper: {
    flex: 1,
  },
  acceptButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logOutTextStyle: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
