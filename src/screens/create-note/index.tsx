import BaseView from '@components/base-view';
import CustomDatePicker from '@components/custom-date-picker';
import ThemedText from '@components/themed-text';
import ThemedTextInput from '@components/themed-text-input';
import {Formik} from 'formik';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {formatDate} from '../../utils/dateTimeUtil';

interface FormData {
  note?: string;
  createdDate?: string;
}

const CreateNoteScreen = () => {
  const initialFormData: FormData = {
    note: '',
    createdDate: formatDate(new Date()),
  };
  const onSubmit = (values: FormData) => {
    console.log(values);
  };

  return (
    <BaseView>
      <Formik
        initialValues={initialFormData}
        onSubmit={onSubmit}
        // validate={values => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
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
          <View>
            <CustomDatePicker label="Created Date" name="createdDate" />
            <ThemedTextInput
              label={'Note'}
              error={!!errors.note}
              errorMsg={errors.note}
              onChangeText={handleChange('note')}
              value={values.note}
            />
            <Button onPress={() => handleSubmit()}>
              <ThemedText>Hit me</ThemedText>
            </Button>
          </View>
        )}
      </Formik>
    </BaseView>
  );
};

export default CreateNoteScreen;
