
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import FormItem from '../Input/FormItem';
import useYupValidationResolver from '../../hook/useYupValidationresolver';
import { schemaValidation } from './validationSchema';
import { useContext, useState} from 'react';
import './CreatEmployeeForm.css'
import { UsersContext } from '../../context/UsersContext';
import {EmployeeToDB, EmployeeToDBConvert} from '../../types';
import dayjs from 'dayjs';
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

    function convertValueOnId(value: string, type: Array<{id:number,value:string,label:string}>) {
        const element = type.find(element => element.value === value);
        if (element) {
            return element.id;
        }
        console.log("No matching ID found");
        return null; 
    }
    const handleSubmitForm = (data: EmployeeToDB) => {
        const newUserDB = {
            firstName: data.FirstName,
            lastName: data.LastName,
            dateOfBirth: dayjs(data.DateOfBirth),
            startDate: dayjs(data.StartDate),
            street:data.Street,
            city: data.City,
            state:  convertValueOnId(data.State, states),
            zipCode: data.ZipCode,
            department: convertValueOnId(data.Department,departments),
        } as EmployeeToDBConvert
        postEmployee(newUserDB)
        reset();
        setIsOpen(true);
        
    };
    return (
        <div>
             <Form  onFinish={handleSubmit(handleSubmitForm)} className="form-container">
                <Controller 
                    control={control}
                    name="FirstName"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormItem  label="First Name" errorMessage={error?.message}>
                            <Input
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                name="FirstName"
                                status={error ? 'error' : ''}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    control={control}
                    name="LastName"
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
                    name="DateOfBirth"
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
                    name="StartDate"
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
                        name="Street"
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
                        name="City"
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
                        name="State"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="State" errorMessage={error?.message}>
                                <Select
                                    value={value}
                                    options={states}
                                    onChange={onChange}
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                    <Controller
                        control={control}
                        name="ZipCode"
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
                        name="Department"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <FormItem label="Department" errorMessage={error?.message}>
                            <Select
                                    value={value}
                                    options={departments}
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