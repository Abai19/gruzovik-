import Link from "next/link";
import TextField from "@mui/material/TextField";
import cn from 'classnames'
import styles from './Reg.module.scss'
import { useState } from "react";
import { IReg } from "@src/types/types";
import axios from "axios";
import { toast } from "react-toastify";
import { AcceptReg, Regis } from "@src/api/api";
import { useRouter } from "next/router";
import { useAuth } from "@src/context/AuthContext";

export default function Registration() {
    const [approve, setApprove]= useState(false);
    const { token, login, logout } = useAuth();
    const router = useRouter()
    const [approveTitle,setApproveTitle] = useState('')
    const [data, setData] = useState<IReg>({
        email: "",
        phone: "",
        name: "",
        surname: "",
        password: "",
        avatar: "",
        telegram: "",
        whatsapp: ""
    })

  
    async function handleSubmit ()  {
        try {
            const response = await  Regis(data);
            if(axios.isAxiosError(response)){
                if(response.response){
                    toast.error(response.response.data.message,{autoClose:1000})
                }
                else {
                    toast.error(response.message,{autoClose:1000})
                }
            }
            else {
                toast.success(response.message,{autoClose:1000})
                setApprove(true)
            }
        }
        catch{}
   }
    async function handleAccept() {
        try {
            const response = await  AcceptReg(approveTitle);
            if(axios.isAxiosError(response)){
                if(response.response){
                    toast.error(response.response.data.message,{autoClose:1000})
                }
                else {
                    toast.error(response.message,{autoClose:1000})
                }
            }
            else {
                toast.success(response.message,{autoClose:1000})
                setApprove(true)
                router.push('/')
            }
        }
        catch{}
    }
    return (
        <div className={cn("mainReg", styles.loginBlock)}>
            {
                approve ? <>
                    <p className={styles.desc}>
                    Введите код подтвержения, если код не пришел проверьте пожалуйста папку &apos;Спам&apos;
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApproveTitle( e.target.value )}
                    sx={{ width: "100%" }}
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                           <button className="btnBlue" onClick={handleAccept}>Подтвердить</button>

                </> : 
                    <>
                               <p className={styles.desc}>
                Регистрация
            </p>
            <div>
                <p className={styles.titleDesc}>
                    Имя*
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, name: e.target.value })}
                    sx={{ width: "100%" }}
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    Фамилия*
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, surname: e.target.value })}
                    sx={{ width: "100%" }}
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    E-mail*:
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
                    sx={{ width: "100%" }}
                    type="email"
                    id="outlined-size-small"
                    size="small"
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    Пароль*
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })}
                    sx={{ width: "100%" }}
                    type="password"
                    id="outlined-size-small"
                    size="small"
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    Номер*
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, phone: e.target.value })}
                    sx={{ width: "100%" }}
                    type="number"
                    id="outlined-size-small"
                    size="small"
                />
            </div>
            <div style={{ position: "relative" }}>
                <p className={styles.titleDesc}>
                    Выберите аватар
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, avatar: e.target.files !== null ? e.target.files[0] : '' })}
                    type="file"
                    size="small"
                    fullWidth
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    Telegram
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, telegram: e.target.value })}
                    sx={{ width: "100%" }}
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
            </div>
            <div>
                <p className={styles.titleDesc}>
                    WhatsApp
                </p>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, whatsapp: e.target.value })}
                    sx={{ width: "100%" }}
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                <p className={styles.reg}>Есть аккаунт? <Link href="/login"> войти</Link></p>

            </div>
            <button className="btnBlue" onClick={handleSubmit}>Зарегистрироваться</button>

                    </>
            }
     
        </div>
    )
}