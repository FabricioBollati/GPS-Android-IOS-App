import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

export const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={50} color="black" />

      <Text>Cargando...</Text>
    </View>
  );
};
