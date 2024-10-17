import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import FormItem from '../Input/FormItem';
import useYupValidationResolver from '../../hook/useYupValidationresolver';
import {useState} from 'react';
import {EmployeeFormValues} from '../../types';
import { ModalComponent } from "modalopjm"
import useFetchGetDepartments from '../../hook/useFetchGetDepartments';
import useFetchGetStates from '../../hook/useFetchGetStates';
import { schemaValidation } from '../CreateEmployeeForm/validationSchema';
import { useParams } from 'react-router-dom';
import useFetchPutEmployee from '../../hook/useFetchPatchEmployee';
import useFetchGetEmployee from '../../hook/useFetchGetEmployee';




function EditEmployeeForm() {
    const { data : states, isLoading: isLoadingStates, error: errorStates } = useFetchGetStates();
    const { data: departments, isloaging: isLoadingDepartments, error: errorDepartments } = useFetchGetDepartments();
    const { PutEmployee, isLoading: isLoadingPutEmployee, error: errorPutEmployee } = useFetchPutEmployee();
    const { data:employee,getEmployee,error:errorGetEmployee ,isLoading:isLoadingGetEmployee } = useFetchGetEmployee();
    const { id } = useParams();
    
   
    const resolver = useYupValidationResolver(schemaValidation);
    const [open, setIsOpen] = useState(false);
    const { control, handleSubmit, reset} = useForm({
            resolver,
            mode: 'onChange',         
            reValidateMode: 'onChange', 
        defaultValues: async () => {
            if (id === undefined) {
            return <p>Employee not found</p>;
            }   
            await getEmployee(parseInt(id));
            return {
                firstName: employee[0].firstName,
                lastName: employee[0].lastName,
                dateOfBirth: employee[0].dateOfBirth,
                startDate: employee[0].startDate,
                street: employee[0].street,
                city: employee[0].city,
                state: employee[0].stateId,
                zipCode: employee[0].zipCode,
                department: employee[0].departmentId,
            }
            }
    });
     
    if (id === undefined) {
        return <p>Employee not found</p>;
    }
    
    
    if (isLoadingStates || isLoadingDepartments || isLoadingPutEmployee ||isLoadingGetEmployee ) {
        return <p>Loading...</p>;
    }

    if (errorStates || errorDepartments||errorPutEmployee ||errorGetEmployee) {
        return <p>Error: {errorStates?.message || errorDepartments?.message}</p>;
    }

    const handleSubmitForm = (data: EmployeeFormValues) => {
        PutEmployee(parseInt(id), data);
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
                
            </ModalComponent>

        </div>
        
    )
}

export default EditEmployeeForm