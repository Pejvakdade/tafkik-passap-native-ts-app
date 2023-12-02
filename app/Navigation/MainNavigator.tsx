import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {HomeWasteScreen} from '../Screens/BodyScreen/HomeScreen/HomeScreenSubs';
import {
  SupportScreen,
  TermsScreen,
  HistoryScreen,
  MyAddressScreen,
} from '../Screens/BodyScreen/MoreScreen/MoreScreenSubs';
import {PurchaseOperationsScreen} from '../Screens/BodyScreen/HomeScreen/FunctionalScreens';
import {CustomNavigationHeader} from '../components';
import {keyWords} from '../constants';
import values from '../values';
import ButtonTabNavigator from './ButtonTabNavigator';
import Screens from '../Screens';
const Stack = createStackNavigator();
const screensTags = values.ScreensTags;
const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screensTags.COMMON.SPLASH_SCREEN}>
        {/* <Stack.Navigator initialRouteName={screensTags.BodyScreen.PURCHASE_OPERATIONS_SCREEN}> */}
        <Stack.Screen
          name={screensTags.COMMON.SPLASH_SCREEN}
          component={Screens.Common.SplashScreen}
          options={{
            headerShown: false, // ! Hide the header for this screen if needed
          }}
        />

        <Stack.Screen
          name={screensTags.AUTH.SIGNIN_SCREEN}
          component={Screens.Auth.SignInScreen}
          options={{
            headerShown: false, // ! Hide the header for this screen if needed
          }}
        />
        <Stack.Screen
          name={screensTags.AUTH.OTP_SCREEN}
          component={Screens.Auth.OtpScreen}
          options={{
            headerShown: false, // ! Hide the header for this screen if needed
          }}
        />
        <Stack.Screen
          name={screensTags.AUTH.REGISTER_OTP_SCREEN}
          component={Screens.Auth.RegisterOtpScreen}
          options={{
            headerShown: false, // ! Hide the header for this screen if needed
          }}
        />
        <Stack.Screen
          name={screensTags.SCREEN_MAIN}
          component={ButtonTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        {/* home screens */}
        <Stack.Screen
          name={screensTags.BodyScreen.HOME_WASTE_SCREEN}
          component={HomeWasteScreen}
          options={{
            header: ({navigation}) => (
              <CustomNavigationHeader
                navigation={navigation}
                title={keyWords.homeWasteTitle}
              />
            ),
          }}
        />
        <Stack.Screen
          name={screensTags.BodyScreen.PURCHASE_OPERATIONS_SCREEN}
          component={PurchaseOperationsScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* more screens */}
        <Stack.Screen
          name={screensTags.BodyScreen.SUPPORT_SCREEN}
          component={SupportScreen}
          options={{
            header: ({navigation}) => (
              <CustomNavigationHeader
                navigation={navigation}
                title={keyWords.supportTitle}
              />
            ),
          }}
        />
        <Stack.Screen
          name={screensTags.BodyScreen.TERMS_SCREEN}
          component={TermsScreen}
          options={{
            header: ({navigation}) => (
              <CustomNavigationHeader
                navigation={navigation}
                title={keyWords.termsTitle}
              />
            ),
          }}
        />
        <Stack.Screen
          name={screensTags.BodyScreen.MY_ADDRESS_SCREEN}
          component={MyAddressScreen}
          options={{
            header: ({navigation}) => (
              <CustomNavigationHeader
                navigation={navigation}
                title={keyWords.myAddressTitle}
              />
            ),
          }}
        />
        <Stack.Screen
          name={screensTags.BodyScreen.HISTORY_SCREEN}
          component={HistoryScreen}
          options={{
            header: ({navigation}) => (
              <CustomNavigationHeader
                navigation={navigation}
                title={keyWords.historyTitle}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
