import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define your validation schema
export const validationSchema = yup.object().shape({
  firstName: yup.string()
    .min(6, 'First name must be at least 6 characters')
    .required('First name is required'),
  lastName: yup.string()
    .required('Last name is required'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: yup.string()
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits long') // Ensure exactly 11 digits
    .required('Phone number is required')
    .test('is-numeric', 'Phone number must be a number', value => {
      return /^\d{11}$/.test(value);
    }),
});

const SimpleForm = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleUpperCaseChange = (name, value) => {
    setValue(name, value.toUpperCase(), { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => handleUpperCaseChange('firstName', e.target.value)}
              value={field.value}
            />
          )}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <label>Last Name</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => handleUpperCaseChange('lastName', e.target.value)}
              value={field.value}
            />
          )}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input type="email" {...field} />}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Phone Number</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              maxLength="11"
              onChange={(e) => {
                // Ensure only numeric input and enforce length constraint
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 11) {
                  field.onChange(e);
                }
              }}
              value={field.value}
            />
          )}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
