import React, {useEffect, useRef} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {COLORS, SIZES} from '../../constants';

interface SlideshowProps {
  images: string[];
  autoplay?: boolean;
}

const CustomSlideShow: React.FC<SlideshowProps> = ({
  images,
  autoplay = false,
}) => {
  const swiperRef: React.MutableRefObject<any> = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && autoplay) {
      swiperRef.current.scrollBy(1, true);
    }
  }, []);

  return (
    <View style={styles.slide}>
      <Swiper
        style={styles.wrapper}
        showsPagination={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        ref={swiperRef}
        autoplayTimeout={8}
        autoplay={autoplay}>
        {images.map((image: any, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    height: SIZES.height / 4,
    marginHorizontal: SIZES.slideShow.marginHorizontal,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.input.borderRadius,
  },
  dotStyle: {
    backgroundColor: COLORS.light.input.placeHolder,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDotStyle: {
    backgroundColor: COLORS.light.input.textColor,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default CustomSlideShow;
