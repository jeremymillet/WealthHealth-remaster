import { Link } from "react-router-dom"
import { Button } from "antd";
import "./Header.css"
import { useState } from "react";
import FormLogin from "../FormLogin/formLogin";
import { ModalComponent } from "modalopjm";
import useAuthContext from "../../context/hook/useAuthContext";

function Header() {
    const {isLogin,logOut} = useAuthContext();
    
    const [open, setIsOpenForm] = useState(false);
    return (
        <div className="header">
            {isLogin ? <Button onClick={logOut}><Link to={"/"} >LogOut</Link></Button> : <Button onClick={() => setIsOpenForm(true)}>LogIn</Button>}
            <ModalComponent setIsOpen={setIsOpenForm} open={open}> <FormLogin setFormOpen={setIsOpenForm}/></ModalComponent>
        </div>
    )
}
export default Header



