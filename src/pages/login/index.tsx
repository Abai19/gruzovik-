import Link from "next/link";
import TextField from "@mui/material/TextField";
import cn from 'classnames'
import styles from './Login.module.scss'
import { useAuth } from "@src/context/AuthContext";
import { useEffect, useState } from "react";
import { ILog } from "@src/types/types";
import { Auth } from "@src/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";

export default function Login() {
    const router = useRouter()
    const { token, login, logout } = useAuth();
    useEffect(()=>{
        if(token) {
            router.push('/')
        }
    },[token, router])
    const [data, setData] = useState<ILog>({
        email: "",
        password: ""
    })
    async function handleSubmit () {
        try {
            const  response = await Auth(data);
            if(axios.isAxiosError(response)){
                if(response.response){
                    toast.error(response.response.data.message, {delay:1000})
                }
                else {
                    toast.error(response.message, {delay:1000})
                }
            }
            else {
                toast.success('Добро пожаловать!', {delay:1000})
                login(response)
                router.push('/')
            }
          
        }
        catch{

        }

    

    }
    return (
        <div className={cn("mainReg", styles.loginBlock)}>
            <p className={styles.desc}>
                Войти
            </p>
            <div>
                <p className={styles.titleDesc}>
                    Логин или e-mail:
                </p>
                <TextField
                    sx={{ width: "100%" }}
                    type="email"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, email: e.target.value})}
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    Пароль
                </p>
                <TextField
                    sx={{ width: "100%" }}
                    type="password"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, password: e.target.value})}
                />
                <p className={styles.reg}>Нет аккаунта? <Link href="/registration"> зарегистрироваться</Link></p>
            </div>
            <button className="btnBlue" onClick={handleSubmit}>Войти</button>

        </div>

    )
}