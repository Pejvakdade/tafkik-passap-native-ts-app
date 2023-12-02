import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {FONTS, icons} from '../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSequence,
  withDelay,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

type Props = {};

const CustomToast = forwardRef(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastText, setToastText] = useState('toast text');
  const [toastDuration, setToastDuration] = useState(0);
  const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;

  const show = useCallback(
    ({
      type,
      text,
      duration,
    }: {
      type: string;
      text: string;
      duration: number;
    }) => {
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          1000,
          withTiming(-100, finish => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          }),
        ),
      );
    },
    [TOP_VALUE, toastTopAnimation],
  );

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show],
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = toastTopAnimation.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(ctx.startY + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    },
    onEnd: event => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, finish => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            withTiming(-100, finish => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            }),
          ),
        );
      }
    },
  });

  return (
    <>
      {showing && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.toastContainer,
              toastType === 'success'
                ? styles.seccessToastContainer
                : toastType === 'warning'
                ? styles.warningToastContainer
                : styles.errorToastContainer,
              animatedTopStyles,
            ]}>
            <Text
              style={[
                styles.toastText,
                toastType === 'success'
                  ? styles.seccessToastText
                  : toastType === 'warning'
                  ? styles.warningToastText
                  : styles.errorToastText,
              ]}>
              {toastText}
            </Text>
            <Image
              source={
                toastType === 'success'
                  ? icons.success
                  : toastType === 'warning'
                  ? icons.warning
                  : icons.error
              }
              style={styles.toastIcon}
            />
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  );
});

export default CustomToast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    width: '90%',
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  seccessToastContainer: {
    backgroundColor: '#def1d7',
    borderColor: '#1f8722',
  },
  warningToastContainer: {
    backgroundColor: '#fef7ec',
    borderColor: '#f08135',
  },
  errorToastContainer: {
    backgroundColor: '#fae1db',
    borderColor: '#d9100a',
  },
  toastIcon: {},
  toastText: {
    marginRight: 14,
    fontSize: 13,
    fontFamily: FONTS.body1.fontFamily,
  },
  seccessToastText: {
    color: '#1f8722',
  },
  warningToastText: {
    color: '#f08135',
  },
  errorToastText: {
    color: '#d9100a',
  },
});
