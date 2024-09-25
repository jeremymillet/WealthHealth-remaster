import { Form} from "antd"
import './Input.css'
import { PropsWithChildren } from "react"


type FormItemProps = PropsWithChildren<{
    label: string,
    errorMessage?: string,
    name?: string | string[];
    
}>;



const FormItem: React.FC<FormItemProps> = ({ label, children,name ,errorMessage}) => {
    
    return (
        <Form.Item
            label={label}
            name={name}
            validateStatus={errorMessage ? 'error' : 'success'}
            help={errorMessage}
            className="input-container"
        >
            {children}
       </Form.Item>
    )
}
export default FormItem