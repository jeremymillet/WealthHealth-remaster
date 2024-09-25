
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import FormItem from '../Input/FormItem';
import useYupValidationResolver from '../../hook/useYupValidationresolver';
import { schemaValidation } from './validationSchema';
import { useContext, useState} from 'react';
import './CreatEmployeeForm.css'
import SelectData from '../../selectData.json'
import { UsersContext } from '../../context/UsersContext';
import { User } from '../../types';
import dayjs from 'dayjs';
import { ModalComponent } from "modalopjm"


function CreateEmployeeForm() {

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

    const {addUser } = usersContext;

    
    const handleSubmitForm = (data: User) => {
        const newUser = {
            FirstName: data.FirstName,
            LastName: data.LastName,
            DateOfBirth: dayjs(data.DateOfBirth),
            StartDate: dayjs(data.StartDate),
            Street:data.Street,
            City: data.City,
            State: data.State,
            ZipCode: data.ZipCode,
            Department: data.Department,
    }as User;
        addUser(newUser);
        reset();
        setIsOpen(true);
        console.log(newUser);
        
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
                                name="LastName"
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
                                name="DateOfBirth"
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
                                name="StartDate"
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
                                    name="Street"
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
                                    name="City"
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
                                    options={SelectData.states}
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
                                    name="ZipCode"
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
                                    options={SelectData.departments}
                                    onChange={onChange}
                                    status={error ? 'error' : ''}
                                />
                            </FormItem>
                        )}
                    />
                <Button type="primary" htmlType="submit">Save</Button>
            </Form>
            <ModalComponent setIsOpen={setIsOpen} open={open}>
                <p>Success</p>
            </ModalComponent>

        </div>
        
    )
}

export default CreateEmployeeForm