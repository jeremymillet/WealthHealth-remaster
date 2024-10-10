
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import FormItem from '../Input/FormItem';
import useYupValidationResolver from '../../hook/useYupValidationresolver';
import { schemaValidation } from './validationSchema';
import { useContext, useState} from 'react';
import './CreatEmployeeForm.css'
import { UsersContext } from '../../context/UsersContext';
import {EmployeeFormValues} from '../../types';
import { ModalComponent } from "modalopjm"
import useFetchGetDepartments from '../../hook/useFetchGetDepartments';
import useFetchGetStates from '../../hook/useFetchGetStates';
import useFetchPostEmployee from '../../hook/useFetchPostEmployee';


function CreateEmployeeForm() {
    const { postEmployee, isLoading: isLoadingEmployee, error: errorPostEmployee } = useFetchPostEmployee();
    const { data : states, isLoading: isLoadingStates, error: errorStates } = useFetchGetStates();
    const { data: departments, isloaging: isLoadingDepartments, error: errorDepartments } = useFetchGetDepartments();

    const resolver = useYupValidationResolver(schemaValidation);
    const [open, setIsOpen] = useState(false);
    const { control, handleSubmit, reset } = useForm({
            resolver,
            mode: 'onChange',         
            reValidateMode: 'onChange', 
    });
    
    const usersContext = useContext(UsersContext);

    if (!usersContext) {
        throw new Error('usersContext must be used within a UsersContext.Provider');
    }

    if (isLoadingStates || isLoadingDepartments) {
        return <p>Loading...</p>;
    }

    if (errorStates || errorDepartments) {
        return <p>Error: {errorStates?.message || errorDepartments?.message}</p>;
    }

    const handleSubmitForm = (data: EmployeeFormValues) => {
        postEmployee(data)
        reset();
        setIsOpen(true);
        
    };
    return (
        <div>
             <Form  onFinish={handleSubmit(handleSubmitForm)} className="form-container">
                <Controller 
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormItem  label="First Name" errorMessage={error?.message}>
                            <Input
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                name="firstName"
                                status={error ? 'error' : ''}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormItem label="Last Name" errorMessage={error?.message}>
                            <Input
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                name="lastName"
                                status={error ? 'error' : ''}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormItem label="Date of Birth" errorMessage={error?.message}>
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                name="dateOfBirth"
                                status={error ? 'error' : ''}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    control={control}
                    name="startDate"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormItem label="Start Date" errorMessage={error?.message}>
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                name="startDate"
                                status={error ? 'error' : ''}
                            />
                        </FormItem>
                    )}
                />
                <div className='address-container'>
                    <h2>Address</h2>
                    <Controller
                        control={control}
                        name="street"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="Street" errorMessage={error?.message}>
                                <Input
                                    value={value}
                                    onChange={e => onChange(e.target.value)}
                                    name="street"
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                    <Controller
                        control={control}
                        name="city"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="City" errorMessage={error?.message}>
                                <Input
                                    value={value}
                                    onChange={e => onChange(e.target.value)}
                                    name="city"
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                    <Controller
                        control={control}
                        name="state"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="State" errorMessage={error?.message}>
                                <Select
                                    value={value}
                                    options={states.map(state =>({value: state.id.toString(), label: state.label}))}
                                    onChange={onChange}
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                    <Controller
                        control={control}
                        name="zipCode"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="Zip Code" errorMessage={error?.message}>
                                <InputNumber
                                    value={value}
                                    onChange={onChange}
                                    name="zipCode"
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <Controller
                        control={control}
                        name="department"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="Department" errorMessage={error?.message}>
                            <Select
                                    value={value}
                                    options={departments.map(department =>({value: department.id.toString(), label: department.label}))}
                                    onChange={onChange}
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                <Button type="primary" htmlType="submit">Save</Button>
            </Form>
            <ModalComponent setIsOpen={setIsOpen} open={open}>
                {isLoadingEmployee? <p>Loading...</p>:""}
                {errorPostEmployee? <p>Error</p>: <p>Success</p>}
            </ModalComponent>

        </div>
        
    )
}

export default CreateEmployeeForm