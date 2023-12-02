import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  children: any;
};

const MySafeView = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default MySafeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 65,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
