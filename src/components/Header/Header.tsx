import { Link } from "react-router-dom"
import { Button } from "antd";
import "./header.css"
import { useState } from "react";
import FormLogin from "../FormLogin/formLogin";
import { ModalComponent } from "modalopjm";
import useAuthContext from "../../context/hook/useAuthContext";
import useFetchPostLogout from "../../hook/useFetchPostLogout";

function Header() {
    const { isLogin,} = useAuthContext();
    const {postLogout,error,isLoading} = useFetchPostLogout();
    
    const [open, setIsOpenForm] = useState(false);
    return (
        <div className="header">
            {isLogin ? <Button onClick={postLogout}><Link to={"/"} >LogOut</Link></Button> : <Button onClick={() => setIsOpenForm(true)}>LogIn</Button>}
            <ModalComponent setIsOpen={setIsOpenForm} open={open}> <FormLogin setFormOpen={setIsOpenForm} /></ModalComponent>
            {isLoading ? <p>loading</p> : ""}
            {error ? <p>error</p>: ""}
        </div>
    )
}
export default Header



