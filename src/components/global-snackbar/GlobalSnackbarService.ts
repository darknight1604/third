import {createRef} from 'react';
import {GlobalSnackbarRefType} from '.';

export const globalSnackbarRef = createRef<GlobalSnackbarRefType>();

export const showSnackbar = (message: string) => {
  globalSnackbarRef.current?.show(message);
};
