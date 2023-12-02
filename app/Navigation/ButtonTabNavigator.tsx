import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../Screens';
import {COLORS, FONTS, SIZES, icons, images, keyWords} from '../constants';
import values from '../values';
import * as Animatable from 'react-native-animatable';
const Tab = createBottomTabNavigator();
const screensTags = values.ScreensTags;

const ButtonTabitems = [
  {
    route: screensTags.BodyScreen.HOME_SCREEN,
    label: 'Home',
    activeIcon: icons.homeFeel,
    inActiveIcon: icons.home,
    component: Screen.BodyScreen.HomeScreen,
  },
  {
    route: screensTags.BodyScreen.MORE_SCREEN,
    label: 'More',
    activeIcon: icons.moreFeel,
    inActiveIcon: icons.more,
    component: Screen.BodyScreen.MoreScreen,
  },
];

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef: React.MutableRefObject<any> = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 0.75, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Image source={focused ? item.activeIcon : item.inActiveIcon} />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={screensTags.BodyScreen.HOME_SCREEN}
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 10,
        },
      })}>
      {ButtonTabitems.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitle: () =>
                item.route === 'HOME_SCREEN' ? (
                  <Image
                    source={images.appText}
                    style={styles.headerLogoStyle}
                  />
                ) : (
                  <Text style={styles.moreHeaderText}>
                    {keyWords.moreHeaderText}
                  </Text>
                ),
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogoStyle: {
    width: SIZES.width / 2.8,
    height: '100%',
  },
  moreHeaderText: {
    fontFamily: FONTS.largeTitle.fontFamily,
    fontSize: FONTS.h2.fontSize,
    borderBottomWidth: 2,
    color: COLORS.light.greenText,
  },
});
