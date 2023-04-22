import TextField from '@mui/material/TextField'
import cn from 'classnames'
import Image from 'next/image';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styles from './Navigation.module.scss'
import startIcon from '@assets/from.svg'
import endIcon from '@assets/to.svg'
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function Navigation () {
    const [show, setShow] = useState(true)
    const {push} = useRouter();
    dayjs.locale('ru');

    const datePickerStyles = {
        '& .MuiInputBase-input': {
          padding: '8.5px 14px;',
        },
      };
    return (
        <div className='main'>
               <div className={styles.navBlock}>
            <div>
              <div className={cn( styles.navItems,{
                  [styles.active]: show
                })} onClick={()=>{
                    setShow(true)
                    push('/')
                    }}>Грузы</div>
                <div className={cn( styles.navItems,{
                  [styles.active]: !show
                })} onClick={()=>{
                    setShow(false)
                    push('/cars')
                    }}>Транспорт</div>
            </div>
              

              <div>
                <button className='btnBlack' onClick={()=> push('/addCargo')}>Добавить груз</button>
                <button className='btnBlack' onClick={()=> push('/addCar')}>Добавить транспорт</button>
              </div>
           
              {/* <Cargo /> */}
          </div>
            <div className={styles.filterBlock}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru" >
                    <MobileDatePicker  
                        sx={datePickerStyles}
                        closeOnSelect ={true}
                        format="DD.MM.YYYY"
                    />
                </LocalizationProvider>
                <TextField
                    placeholder='Откуда'
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    placeholder='Куда'
                    id="outlined-size-small"
                    size="small"
                />
                <button className="btnBlue"> Найти грузы</button>
            </div>
        </div>
    )
}