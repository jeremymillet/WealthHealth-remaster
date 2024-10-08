import { Link } from "react-router-dom"
import { Button } from "antd";
import "./Header.css"
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import FormLogin from "../FormLogin/formLogin";
import { ModalComponent } from "modalopjm";

function Header() {
    const loginContext = useContext(LoginContext);
    const [open, setIsOpen] = useState(false);
    const { setIsLogin,isLogin } = loginContext;
    if (!LoginContext) {
        throw new Error('usersContext must be used within a UsersContext.Provider');
    }
    return (
        <div className="header">
            {isLogin ? <Button onClick={() => setIsLogin(false)}><Link to={"/"} >LogOut</Link></Button> : <Button onClick={() => setIsOpen(true)}>LogIn</Button>}
            <ModalComponent setIsOpen={setIsOpen} open={open}> <FormLogin/></ModalComponent>
        </div>
    )
}
export default Header



