import React, {useContext} from 'react';
import {Platform, Button, Text, View, StyleSheet} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {PermissionStatus} from 'react-native-permissions/dist/typescript/types';
import {BlackButton} from '../components/BlackButton';
import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationsPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario dar permiso para usar el GPS
      </Text>
      <BlackButton title="Permiso" onPress={askLocationsPermission} />
      <Text
        style={{
          marginTop: 20,
        }}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
