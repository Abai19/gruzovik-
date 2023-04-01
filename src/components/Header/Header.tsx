import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@assets/logo.svg'
import burger from '@assets/burger.svg'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

import { useState } from 'react'
import { useRouter } from 'next/router'
export default function Header (){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [show, setShow] = useState(false);
    function showMenu(){
        setShow(!show)
    }
    const router = useRouter()
    return (
        <div className={styles.mainBlock}>
            <Link href={'/'} className={styles.logo}>
                <Image  src={logo} alt="logo" />
            </Link>
            <div className={styles.rightSide}>
                {/* <p>EN | RU</p> */}
                <button className="btnBlue" onClick= {()=>router.push('/login')} > Войти</button>
                <button className="btnBlue" onClick= {()=>router.push('/registration')}> Зарегистрироваться</button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="menu">
                    <Image src={burger} 
                        alt='menu'  
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} className={styles.burger} />
            
                </Tooltip>
            </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    sx= {
                        {backgroundColor:'rgba(0, 0, 0, 0.7);'}
                    }
    
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem sx={{backgroundColor: '#ffffff!important','&:hover': { backgroundColor: '#ffffff!important' },}} onClick={handleClose}>
                        <button className="btnBlue" onClick= {()=>router.push('/login')}  > Войти</button>
                    </MenuItem>
                    <MenuItem sx={{backgroundColor: '#ffffff!important','&:hover': { backgroundColor: '#ffffff!important' },  }} onClick={handleClose}>
                        <button className="btnBlue" onClick= {()=>router.push('/registration')} > Зарегистрироваться</button>
                    </MenuItem>
                    
                </Menu>
            </div>
                {
                    show && <div className={styles.mobileMenuBlock}>
                        <div>
                            <button className="btnBlue"> Войти</button>
                            <button className="btnBlue"> Зарегистрироваться</button>
                        </div>
                    </div>
                }
           
        </div>
    )
}