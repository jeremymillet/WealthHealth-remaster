import * as yup from 'yup';

// schema for yup validation
export const schemaValidation = yup.object().shape({
    Email: yup.string().email('Invalid email format').required('Email is required'),
    Password: yup.string().required('Password is required'),
    
});