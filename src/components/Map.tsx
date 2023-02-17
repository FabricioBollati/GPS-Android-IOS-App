import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef} from 'react';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';

export const Map = () => {
  const {hasLocation, initialPosition, getCurrentLocation} = useLocation();

  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const {latitude, longitud} = await getCurrentLocation();

    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitud,
      },
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation={true}
        region={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitud,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'Title'}
          description={'Description'}></Marker> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      />
    </>
  );
};
