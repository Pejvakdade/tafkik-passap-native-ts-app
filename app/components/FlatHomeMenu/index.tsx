import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES, keyWords} from '../../constants';

type Props = {
  menuSchema: {
    _id: number;
    name?: string;
    iconName?: any;
    navigation?: string;
  }[];
  navigation: any; // Add this prop
  toastRef: any;
};

const FlatHomeMenu = (props: Props) => {
  //
  //
  function renderItem({item}: {item: any}) {
    return (
      <TouchableOpacity
        style={styles.itemsContainer}
        onPress={() => {
          if (item.screen) {
            props.navigation.navigate(item.screen);
          } else {
            props.toastRef.current.show({
              type: 'warning',
              text: keyWords.commingSoon,
              duration: 3000,
            });
          }
        }}>
        <View style={styles.itemsWrapper}>
          <Image source={item.iconName} />
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  //
  //
  return (
    <SafeAreaView style={styles.menuContainer}>
      <FlatList
        data={props.menuSchema}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        numColumns={3}
        // style={{alignContent: 'center', alignSelf: 'center'}}
      />
    </SafeAreaView>
  );
};

export default FlatHomeMenu;

const styles = StyleSheet.create({
  menuContainer: {
    margin: SIZES.homeIcons.margin,
  },
  itemsContainer: {
    flex: 1,
    backgroundColor: COLORS.light.homeIcons.backGroundColor,
    borderRadius: SIZES.homeIcons.borderRadius,
    borderColor: COLORS.light.homeIcons.borderColor,
    borderWidth: SIZES.homeIcons.borderWidth,
    margin: SIZES.homeIcons.marginItems,
    paddingVertical: SIZES.homeIcons.padding,
    elevation: 3,
  },
  itemsWrapper: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONTS.largeTitle.fontFamily,
    marginTop: SIZES.homeIcons.margin,
  },
});
