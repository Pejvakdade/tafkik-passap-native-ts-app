import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {COLORS, FONTS, SIZES, icons, keyWords} from '../../constants';
type Props = {
  lableText?: string;
  toastAlert?: any;
  parentLatitude?: number; // Added prop for parent latitude
  parentLongitude?: number; // Added prop for parent longitude
  onRegionChangeComplete?: (latitude: number, longitude: number) => void;
};

const CustomMap = ({
  lableText,
  toastAlert,
  parentLatitude,
  parentLongitude,
  onRegionChangeComplete,
}: Props) => {
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [region, setRegion] = useState({
    latitude: parentLatitude || 36.899762699100265, // Use parent latitude or default
    longitude: parentLongitude || 50.67325204187987,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const onRegionChange = (newRegion: any) => {
    if (
      !isNaN(newRegion.latitude) &&
      !isNaN(newRegion.longitude) &&
      isFinite(newRegion.latitude) &&
      isFinite(newRegion.longitude)
    ) {
      setRegion(newRegion);
      // Pass the new coordinates to the parent screen
      onRegionChangeComplete &&
        onRegionChangeComplete(newRegion.latitude, newRegion.longitude);
    }
  };

  useEffect(() => {
    // Update the region if parent coordinates are available
    if (parentLatitude !== undefined && parentLongitude !== undefined) {
      setRegion({
        ...region,
        latitude: parentLatitude,
        longitude: parentLongitude,
      });
    }
  }, [parentLatitude, parentLongitude]);

  function getCurrentLocation() {
    setIsLoadingMap(true);
    Geolocation.getCurrentPosition(
      position => {
        console.log({position});
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setRegion({
          ...region,
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

        setIsLoadingMap(false);
      },
      error => {
        console.log(error);
        if (error.code === 2) {
          // Location services are turned off
          console.log('Location services are turned off');
          toastAlert.current.show({
            type: 'error',
            text: keyWords.locationOff,
            duration: 3000,
          });
        } else if (error.PERMISSION_DENIED === 1) {
          console.log('PERMISSION_DENIED');
          toastAlert.current.show({
            type: 'error',
            text: keyWords.locationError,
            duration: 3000,
          });
        }

        setIsLoadingMap(false);
      },
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  }

  // Location marker coordinates
  const markerCoordinate = {
    latitude: region.latitude,
    longitude: region.longitude,
  };

  return (
    <View style={styles.container}>
      {lableText && <Text style={styles.inputLabel}>{lableText}</Text>}
      <View style={styles.mapContainer}>
        <TouchableOpacity
          style={styles.myLocation}
          onPress={getCurrentLocation}>
          <Image source={icons.myLocation} />
        </TouchableOpacity>
        <MapView
          style={styles.map}
          showsScale={true}
          region={region}
          onRegionChangeComplete={onRegionChange}
          loadingEnabled>
          <Marker
            coordinate={markerCoordinate}
            // title="Your Location"
            // description="Description of your location"
            // image={icons.location}
          >
            {/* <Image
              source={icons.location}
              style={{width: 29, height: 31}}
              // resizeMode="contain"
            /> */}
          </Marker>
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

export default CustomMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
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
