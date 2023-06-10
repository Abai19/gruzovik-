import styles from './ProfileMenu.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import user from '@assets/user.svg'
import home from '@assets/home.svg'
import cargoIcon from '@assets/cargo.svg'
import carIcon from '@assets/car.svg'
import logoutIcon from '@assets/logout.svg'
import profileIcon from '@assets/profile.svg'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useAuth } from '@src/context/AuthContext'
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react'
import { useRouter } from 'next/router';
export default function ProfileMenu() {
    const {token, logout} = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const router = useRouter()
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="menu"

                >
                    <Image src={user}
                        style={{ cursor: 'pointer' }}
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
                sx={
                    { backgroundColor: 'rgba(0, 0, 0, 0.7);', '& ul:' :{padding: '8px'} }
                }

                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ backgroundColor: '#ffffff!important', '&:hover': { backgroundColor: 'rgba(65, 140, 187, 0.25)!important;' }, }} onClick={handleClose}>
                    <div className={styles.menuItem} onClick={() => router.push('/')}>
                        <div>   
                            <Image src={home} alt={'home'} />
                        </div>
                      
                        <p>Главная</p>
                    </div>
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#ffffff!important', '&:hover': { backgroundColor: 'rgba(65, 140, 187, 0.25)!important;' }, }} onClick={handleClose}>
                    <div className={styles.menuItem} onClick={() => router.push('/profile')}>
                    <div>   <Image src={profileIcon} alt={'profile'} /> </div>
                        <p>Профиль</p>
                    </div>
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#ffffff!important', '&:hover': { backgroundColor: 'rgba(65, 140, 187, 0.25)!important;' }, }} onClick={handleClose}>
                    <div className={styles.menuItem} onClick={() => router.push('/myCargos')}>
                    <div>  <Image src={cargoIcon} alt={'profile'} /></div>  
                        <p>Мои грузы</p>
                    </div>
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#ffffff!important', '&:hover': { backgroundColor: 'rgba(65, 140, 187, 0.25)!important;' }, }} onClick={handleClose}>
                    <div className={styles.menuItem} onClick={() => router.push('/myCars')}>
                    <div>   <Image src={carIcon} alt={'profile'} /></div>  
                        <p>Мой транспорт</p>
                    </div>
                </MenuItem>
                <MenuItem sx={{ backgroundColor: '#ffffff!important', '&:hover': { backgroundColor: 'rgba(65, 140, 187, 0.25)!important;' }, }} onClick={handleClose}>
                    <div className={styles.menuItem} onClick={() => {
                        logout();
                        router.push('/')
                    }}
                    >
                    <div>    <Image src={logoutIcon} alt={'profile'} /></div>  
                        <p>Выйти</p>
                    </div>
                </MenuItem>

            </Menu>
        </>
    )
}