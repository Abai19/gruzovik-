import Link from "next/link";
import TextField from "@mui/material/TextField";
import cn from 'classnames'
import styles from './Reg.module.scss'
export default function Registration (){
    return (
        <div className={cn("mainReg", styles.loginBlock)}>
        <p className={styles.desc}>
         Регистрация
        </p>
        <div>
            <p className={styles.titleDesc}>
                Имя
            </p>
            <TextField
                sx={{ width: "100%" }}
                type="text"
                id="outlined-size-small"
                size="small"
            />
        </div>
        <div>
            <p className={styles.titleDesc}>
                Логин или e-mail:
            </p>
            <TextField
                sx={{ width: "100%" }}
                type="email"
                id="outlined-size-small"
                size="small"
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
            />
            <p className={styles.reg}>Есть аккаунт? <Link href="/login"> войти</Link></p>
        </div>
        <button className="btnBlue">Зарегистрироваться</button>

    </div>
    )
}