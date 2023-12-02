import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {COLORS, FONTS, SIZES, icons} from '../../constants';

type Props = {
  label?: string;
  latitude: number;
  longitude: number;
};

const CustomMiniMap = ({label, latitude, longitude}: Props) => {
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  // Location marker coordinates
  const markerCoordinate = {
    latitude: region.latitude,
    longitude: region.longitude,
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsScale={false}
          region={region}
          scrollEnabled={false}
          loadingEnabled>
          <Marker
            coordinate={markerCoordinate}
            // title="Your Location"
            // description="Description of your location"
            // image={icons.location}
          />
        </MapView>
        {isLoadingMap && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </View>
  );
};
export default CustomMiniMap;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputLabel: {
    fontSize: SIZES.body4,
    fontFamily: FONTS.h1.fontFamily,
    marginHorizontal: SIZES.input.margin,
    paddingBottom: 2,
    color: COLORS.light.input.textColor,
  },
  mapContainer: {
    flex: 1,
    borderRadius: SIZES.input.borderRadius,
    overflow: 'hidden',
    borderWidth: SIZES.input.borderWidth,
    borderColor: COLORS.light.input.borderColor,
    position: 'relative',
    height: 'auto',
    width: 'auto',
  },
  map: {
    flex: 1,
  },
  myLocation: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: COLORS.light.splashBackground,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    padding: 5,
    margin: 5,
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    zIndex: 20,
  },
});
