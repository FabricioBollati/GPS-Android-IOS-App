import {createContext, useState, useEffect} from 'react';
import {PermissionStatus} from 'react-native-permissions/dist/typescript/types';
import {Platform, AppState} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationsPermission: () => void;
  checkLocationsPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;

      checkLocationsPermission();
    });

    return () => {};
  }, []);

  const askLocationsPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    if (permissionStatus === 'blocked') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };
  const checkLocationsPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationsPermission, checkLocationsPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
