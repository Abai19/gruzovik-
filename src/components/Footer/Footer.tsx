import { Typography } from '@mui/material';
import styles from './Footer.module.scss';
import PhoneIcon from '@assets/phone_footer.svg'
import EmailIcon from '@assets/email_footer.svg'
import TimeIcon from '@assets/time_footer.svg'
import Image from 'next/image';
const Footer = ()=> {
    return (
        <div className={styles.wrapper} >
             <div className={styles.container}>
                <Typography>
                    Служба поддержки пользователей:
                </Typography>
                <Typography component="div">
                    <Image src={PhoneIcon} alt='phone'/>
                        +(996) 555 55 55
                </Typography>
                <Typography component="div">
                <Image src={EmailIcon} alt='phone'/>
                    gruzovik_plus@gmail.com
                </Typography>
                <Typography component="div">
                <Image src={TimeIcon} alt='phone'/>
                    Пн-Пт  9.00-18.00 (KG)
                </Typography>
                <Typography>
                    ®Gruzovic+ все права защищены 2023 
                </Typography>
            </div>
        </div>

    )
}
export default Footer