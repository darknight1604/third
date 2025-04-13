import BaseView from '@components/base-view';
import CustomDatePicker from '@components/custom-date-picker';
import {
  SubmitButton,
  TakePictureInput,
  ThemedTextAreaInput,
  ThemedTextInput,
} from '@third/components';
import {INITIAL_ROUTE_NAME, ROUTE_NAME} from '@third/constants';
import {locales} from '@third/localizations/locale';
import CreateNoteRequest from '@third/models/note';
// import {createNote} from '@third/services/noteService';
import {navigate, popUntil} from '@third/routes/Navigation';
import {createNote} from '@third/services/noteService';
import {formatDate} from '@third/utils/dateTimeUtil';
import {Formik} from 'formik';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {styles} from './styles';

const CreateNoteScreen = () => {
  const initialFormData: CreateNoteRequest = {
    note: '',
    value: '',
    imageUrl: '',
    createdDate: formatDate(new Date()),
  };
  const onSubmit = (values: CreateNoteRequest) => {
    navigate(ROUTE_NAME.LOADING, {
      onPost: () => {
        createNote(values, () => {
          popUntil(INITIAL_ROUTE_NAME);
        });
      },
    });
  };

  const onValidate = useCallback((values: CreateNoteRequest) => {
    const errors: CreateNoteRequest = {};
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
          <View style={styles.layout}>
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
              <TakePictureInput label="Upload" name="imageUrl" />
            </View>
            <SubmitButton
              onSubmit={() => handleSubmit()}
              label={locales.create}
            />
          </View>
        )}
      </Formik>
    </BaseView>
  );
};

export default CreateNoteScreen;
