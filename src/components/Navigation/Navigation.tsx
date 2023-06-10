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
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
     const [startDate, setStartDate] = useState<Date | null>(null);
     const [endDate, setEndDate] = useState<Date | null>(null);

    const [show, setShow] = useState(true)
    const router   = useRouter();
    dayjs.locale('ru');

    const datePickerStyles = {
      '& .MuiInputBase-input': {
        padding: '8.5px 14px;',
      },
      '& label' : {
          left: "-1px",
          top: "-7px",
          color: "#999"
      }
    };
      const handleSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(router.pathname == '/'){
          const searchParams = new URLSearchParams({
            startDate: startDate ? dayjs(startDate).format('DD.MM.YYYY') : '',
            endDate: endDate ? dayjs(endDate).format('DD.MM.YYYY') : '',
            city: (formData.get('city')?.toString() || ''),
            page: '1',
            limit: '10',
          });
          const url = `?${searchParams}`;
          router.push(url);
        }
        else {
          const searchParams = new URLSearchParams({
            from: (formData.get('from')?.toString() || ''),
            date: selectedDate ? dayjs(selectedDate).format('DD.MM.YYYY') : '',
            to: (formData.get('to')?.toString() || ''),
            page: '1',
            limit: '10',
          });
          const url = `?${searchParams}`;
          router.push(url);
        }
      };
    return (
        <div className='main'>
               <div className={styles.navBlock}>
            <div>
              <div className={cn( styles.navItems,{
                  [styles.active]: show
                })} onClick={()=>{
                    setShow(true)
                    router.push('/')
                    }}>Грузы</div>
                <div className={cn( styles.navItems,{
                  [styles.active]: !show
                })} onClick={()=>{
                    setShow(false)
                    router.push('/cars')
                    }}>Транспорт</div>
            </div>
              

              <div>
                <button className='btnBlack' onClick={()=> router.push('/addCargo')}>Добавить груз</button>
                <button className='btnBlack' onClick={()=> router.push('/addCar')}>Добавить транспорт</button>
              </div>
           
              {/* <Cargo /> */}
          </div>
            <div className={styles.filterBlock}>
              <form onSubmit={handleSubmit}>
                {
                  router.pathname == '/' ? 
                  <>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru" >
                    <MobileDatePicker  
                        label= "Дата начала"
                        closeOnSelect ={true}
                        format="DD.MM.YYYY"
                        sx={datePickerStyles}
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                    <MobileDatePicker  
                        label= "Дата окончания"  
                        sx={datePickerStyles}
                        closeOnSelect ={true}
                        format="DD.MM.YYYY"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </LocalizationProvider>
                <TextField
                    placeholder='Город'
                    id="outlined-size-small"
                    size="small"
                    name='city'
                />
                </> : 
                 <>
                     <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru" >
                    <MobileDatePicker  
                        label= "Дата"  
                        sx={datePickerStyles}
                        closeOnSelect ={true}
                        format="DD.MM.YYYY"
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </LocalizationProvider>
                <TextField
                    placeholder='Откуда'
                    id="outlined-size-small"
                    size="small"
                    name='from'
                />
                <TextField
                    placeholder='Куда'
                    id="outlined-size-small"
                    size="small"
                    name='to'
                />
                 </>
                }
               
                <button className="btnBlue" type='submit'> Найти 
                  { router.pathname == "/" ? ' грузы' : ' транспорт'}
                </button>
                </form>
            </div>
        </div>
    )
}