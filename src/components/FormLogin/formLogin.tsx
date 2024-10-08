import { Button, Form, Input } from 'antd';
import useYupValidationResolver from '../../hook/useYupValidationresolver';
import { schemaValidation } from './schemaValidation';
import { Controller, useForm } from 'react-hook-form';
import FormItem from '../Input/FormItem';
import { User } from '../../types';
import { ModalComponent } from 'modalopjm';
import { useState } from 'react';
import useFetchPostLogin from '../../hook/useFetchPostLogin';

type PropsLoginType = {
    setFormOpen: (isOpen: boolean) => void;
}


const FormLogin: React.FC<PropsLoginType> = ({ setFormOpen }) => {
    
    const { postLogin, isLoading: isLoadingUser, error: errorPostUser } = useFetchPostLogin();
    const resolver = useYupValidationResolver(schemaValidation);
    const { control, handleSubmit, reset } = useForm({
            resolver,
            mode: 'onChange',         
            reValidateMode: 'onChange', 
    });
    const [open, setIsOpen] = useState(false);
    const handleSubmitForm = (data: User) => {
        postLogin(data)
        reset();
        setIsOpen(true);
        setFormOpen(false);
    };

    return(
    <Form onFinish={handleSubmit(handleSubmitForm)} className="form-container">
        <Controller 
            control={control}
            name="Email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem  label="Email" errorMessage={error?.message}>
                    <Input
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        name="email"
                        status={error ? 'error' : ''}
                    />
                </FormItem>
            )}
        />
        <Controller 
            control={control}
            name="Password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem  label="Password" errorMessage={error?.message}>
                    <Input.Password
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        name="password"
                        status={error ? 'error' : ''}
                    />
                </FormItem>
            )}
        />
        <Button type="primary" htmlType="submit">Save</Button>
        <ModalComponent setIsOpen={setIsOpen} open={open}>
                {isLoadingUser? <p>Loading...</p>:""}
                {errorPostUser? <p>Error</p>: <p>Success</p>}
        </ModalComponent>
        </Form >
        
    )
}

export default FormLogin