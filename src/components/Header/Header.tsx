import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@assets/logo.svg'
export default function Header (){
    return (
        <div className={styles.mainBlock}>
            <Link href={'/'}>
                <Image  src={logo} alt={logo}/>
            </Link>
            <div className={styles.rightSide}>
                <p>EN | RU</p>
                <button className={styles.btnSignIn}> Войти</button>
                <button className={styles.btnSignIn}> Зарегистрироваться</button>
            </div>
           
        </div>
    )
}