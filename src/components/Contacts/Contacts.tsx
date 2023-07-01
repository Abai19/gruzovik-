import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack"
import { useAuth } from "@src/context/AuthContext"
import { useRouter } from "next/router"
import dayjs from 'dayjs';

import { ReactSVG, useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ICargoItem, IContacts } from '@src/types/types';
import PhoneIcon from '@assets/phone.svg'
import WhatsappIcon from '@assets/whatsapp.svg'
import TelegramIcon from '@assets/telegram.svg'
import Image from 'next/image';
import styles from './Contacts.module.scss'
import Link from 'next/link';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: 24,
    p: 4,
  };

  interface IProps {
    open: boolean,
    contactData: IContacts,
    handleClose: ()=> void,
  }
const Contacts = ({open, handleClose,contactData}: IProps)=> {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {token} = useAuth();
    useEffect(()=> {
        if(!token) {
            router.push('/login')
        }
        else {
            setIsLoading(false);
        }
    },[router,token])
    if (isLoading) {
        return       <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" } }>
                        <CircularProgress />
                    </Box>
      }
    console.log(contactData)
    return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Контакные данные
      </Typography>
      {
        contactData.phone && (
            <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            >       
                 <Image src={PhoneIcon} className={styles.icon} alt='phone'/>
                 <Typography id="modal-modal-title" variant="h6" component="p">
                 <Link href={`tel:${contactData.phone}`}>{contactData.phone}</Link>
                </Typography>
            </Stack>
        )
      }
       {
        contactData.whatsapp && (
            <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            >       
                 <Image src={WhatsappIcon} className={styles.icon} alt='whats'/>
                 <Typography id="modal-modal-title" variant="h6" component="p">
                    {contactData.whatsapp}
                </Typography>
            </Stack>
        )
      }
       {
        contactData.telegram && (
            <Stack
            direction="row"
            justifyContent="center"
            gap="5px"
            alignItems="center"
            >       
                 <Image src={TelegramIcon} className={styles.icon} alt='whats'/>
                 <Typography id="modal-modal-title" variant="h6" component="p">
                        {contactData.telegram}
                </Typography>
            </Stack>
        )
      }
    
    </Box>
  </Modal>
    )
}
export default  Contacts