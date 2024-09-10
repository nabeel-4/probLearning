import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string()
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits long')  // Ensure exactly 11 digits
    .required('Phone number is required')
    .test('is-numeric', 'Phone number must be a number', value => {
      return /^\d{11}$/.test(value);
    }),
});
