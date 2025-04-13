import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Snackbar} from 'react-native-paper';

export type GlobalSnackbarRefType = {
  show: (message: string) => void;
};

export const GlobalSnackbar = forwardRef<GlobalSnackbarRefType>(
  (_props, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useImperativeHandle(ref, () => ({
      show: (msg: string) => {
        setMessage(msg);
        setVisible(true);
      },
    }));

    const onDismissSnackBar = () => {
      setVisible(false);
    };

    return (
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {message}
      </Snackbar>
    );
  },
);
