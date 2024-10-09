import * as yup from 'yup';

// schema for yup validation
export const schemaValidation = yup.object().shape({
    FirstName: yup.string().matches(/^[A-Za-z]+$/, 'First name cannot contain numbers').required('First name is required'),
    LastName: yup.string().matches(/^[A-Za-z]+$/, 'Last name cannot contain numbers').required('Last name is required'),
    DateOfBirth: yup.date().required('Date of birth is required').typeError('Invalid date format'),
    StartDate: yup.date().required('Start date is required').typeError('Invalid date format'),
    Street: yup.string().matches(/^[A-Za-z0-9\sÀ-ÿ]+$/, 'Street cannot contain special characters').required('Street is required'),
    City: yup.string().matches(/^[A-Za-z0-9\s]+$/, 'City cannot contain special characters').required('City is required'),
    State: yup.string().required('State is required'),
    ZipCode: yup.number().required('Zip code is required'),
    Department: yup.string().required('Department is required'),
    
});


