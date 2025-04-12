import BaseView from '@components/base-view';
import CustomDatePicker from '@components/custom-date-picker';
import ThemedText from '@components/themed-text';
import {ThemedTextAreaInput, ThemedTextInput} from '@third/components';
import {locales} from '@third/localizations/locale';
import {formatDate} from '@third/utils/dateTimeUtil';
import {Formik} from 'formik';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {styles} from './styles';

interface FormData {
  note?: string;
  value?: string;
  createdDate?: string;
}

const CreateNoteScreen = () => {
  const initialFormData: FormData = {
    note: '',
    value: '',
    createdDate: formatDate(new Date()),
  };
  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  const onValidate = useCallback((values: FormData) => {
    const errors: FormData = {};
    if (!values.value) {
      errors.value = locales.requiredField;
    }
    return errors;
  }, []);

  return (
    <BaseView>
      <Formik
        initialValues={initialFormData}
        onSubmit={onSubmit}
        validate={onValidate}
        // onSubmit={(values, {setSubmitting}) => {}}
      >
        {({
          values,
          errors,
          // touched,
          handleChange,
          // handleBlur,
          handleSubmit,
          // isSubmitting,
        }) => (
          <View style={styles.container}>
            <CustomDatePicker label={locales.createDate} name="createdDate" />
            <ThemedTextInput
              label={locales.valueInput}
              error={!!errors.value}
              errorMsg={errors.value}
              onChangeText={handleChange('value')}
              value={values.value}
              placeholder={locales.valueInputPlaceholder}
              isRequired
              keyboardType="numeric"
              right={<TextInput.Icon icon="chart-line-variant" />}
            />
            <ThemedTextAreaInput
              label={locales.note}
              error={!!errors.note}
              errorMsg={errors.note}
              onChangeText={handleChange('note')}
              value={values.note}
              placeholder={locales.note}
              right={<TextInput.Icon icon="book-open-variant" />}
            />
            <Button onPress={() => handleSubmit()}>
              <ThemedText>{locales.create}</ThemedText>
            </Button>
          </View>
        )}
      </Formik>
    </BaseView>
  );
};

export default CreateNoteScreen;
