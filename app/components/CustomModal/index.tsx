import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {FONTS, SIZES, icons} from '../../constants';

type Props = {
  isVisible?: boolean;
  onPress?: () => void;
  children?: any;
  position?: 'center' | 'flex-start' | 'flex-end';
  height?: any;
  buttonText?: any;
};

const CustomModal = (props: Props) => {
  return (
    <Modal
      deviceHeight={SIZES.height}
      animationIn="fadeInUpBig"
      onBackButtonPress={props.onPress}
      isVisible={props.isVisible}
      testID={'modal'}
      // swipeDirection={['up', 'left', 'right', 'down']}
      style={[
        styles.modalContainer,
        {
          justifyContent: props.position,
          margin: props.position === 'center' ? 10 : 0,
        },
      ]}>
      <View
        style={[
          styles.modalBodyContainer,
          {
            maxHeight: props.height,
            height: props.height ? '100%' : null,
          },
        ]}>
        <TouchableOpacity onPress={props.onPress} style={styles.closeContainer}>
          <Text style={styles.closeButton}>{props.buttonText}</Text>
          <Image source={icons.x} />
        </TouchableOpacity>
        {props.children}
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {},
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  closeButton: {
    paddingHorizontal: 5,
    fontFamily: FONTS.h1.fontFamily,
  },
  modalBodyContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: SIZES.modal.horizontalPadding,
  },
});
