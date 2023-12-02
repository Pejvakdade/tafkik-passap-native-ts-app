import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  CustomSlideShow,
  CustomToast,
  FlatHomeMenu,
  MySafeView,
} from '../../../components';
import {COLORS, flatListItems} from '../../../constants';

type Props = {
  navigation: any; // Add this prop
};

const HomeScreen = (props: Props) => {
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);

  return (
    <View style={styles.container}>
      <CustomToast ref={toastRef} />
      <MySafeView>
        <View style={styles.safeViewWrapper}>
          <CustomSlideShow images={flatListItems.sliderImages} autoplay />
          <FlatHomeMenu
            menuSchema={flatListItems.homeItemsSchema}
            navigation={props.navigation}
            toastRef={toastRef}
          />
        </View>
      </MySafeView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.backgroudnColor,
  },
  safeViewWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
