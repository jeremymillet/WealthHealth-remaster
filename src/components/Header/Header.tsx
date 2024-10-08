import { Link } from "react-router-dom"
import { Button } from "antd";
import "./Header.css"
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import FormLogin from "../FormLogin/formLogin";
import { ModalComponent } from "modalopjm";
import { TokenContext } from "../../context/TokenContext";

function Header() {
    const loginContext = useContext(LoginContext);
    const { setIsLogin, isLogin } = loginContext;

    const tokenContext = useContext(TokenContext);
    const {setToken} = tokenContext;
     const [open, setIsOpenForm] = useState(false);
    if (!LoginContext) {
        throw new Error('usersContext must be used within a UsersContext.Provider');
    }
    return (
        <div className="header">
            {isLogin ? <Button onClick={() => { setIsLogin(false); setToken("") }}><Link to={"/"} >LogOut</Link></Button> : <Button onClick={() => setIsOpenForm(true)}>LogIn</Button>}
            <ModalComponent setIsOpen={setIsOpenForm} open={open}> <FormLogin setFormOpen={setIsOpenForm}/></ModalComponent>
        </div>
    )
}
export default Header



