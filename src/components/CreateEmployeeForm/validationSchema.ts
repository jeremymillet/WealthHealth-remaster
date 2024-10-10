import * as yup from 'yup';

// schema for yup validation
export const schemaValidation = yup.object().shape({
    firstName: yup.string().matches(/^[A-Za-z]+$/, 'First name cannot contain numbers').required('First name is required'),
    lastName: yup.string().matches(/^[A-Za-z]+$/, 'Last name cannot contain numbers').required('Last name is required'),
    dateOfBirth: yup.date().required('Date of birth is required').typeError('Invalid date format'),
    startDate: yup.date().required('Start date is required').typeError('Invalid date format'),
    street: yup.string().matches(/^[A-Za-z0-9\sÀ-ÿ]+$/, 'Street cannot contain special characters').required('Street is required'),
    city: yup.string().matches(/^[A-Za-z0-9\s]+$/, 'City cannot contain special characters').required('City is required'),
    state: yup.number().required('State is required'),
    zipCode: yup.number().required('Zip code is required'),
    department: yup.number().required('Department is required'),
});


