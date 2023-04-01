import Link from "next/link";
import TextField from "@mui/material/TextField";
import cn from 'classnames'
import styles from './Login.module.scss'
export default function Login() {
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
                <p className={styles.reg}>Нет аккаунта? <Link href="/registration"> зарегистрироваться</Link></p>
            </div>
            <button className="btnBlue">Войти</button>

        </div>

    )
}