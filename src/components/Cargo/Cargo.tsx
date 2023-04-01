import TextField from '@mui/material/TextField'
import cn from 'classnames'
import Image from 'next/image';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styles from './Cargo.module.scss'
import startIcon from '@assets/from.svg'
import endIcon from '@assets/to.svg'
export default function Cargo () {
    dayjs.locale('ru');

    const datePickerStyles = {
        '& .MuiInputBase-input': {
          padding: '8.5px 14px;',
        },
      };
    return (
        <div>
            <div className={styles.filterBlock}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru" >
                    <MobileDatePicker  
                        sx={datePickerStyles}
                        closeOnSelect ={true}
                        format="DD.MM.YYYY"
                    />
                </LocalizationProvider >
                
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
            <div>
                <div className={styles.cargoItemBlock}>
                    <div className={styles.cargoItemLeft}>
                            <Image src={startIcon} alt="start"/>
                            <div></div>
                            <Image src={endIcon} alt="end"/>
                    </div>
                    <div className={styles.cargoItemRight}>
                            <div className={styles.title}>
                                Волгоград (RU) 
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Груз - Овощи 
                                </div>
                                <div>
                                    Тип машины - Рефрижератор 
                                </div>
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Вес - 20 т
                                </div>
                                <div>
                                Кол-во машин - 2
                                </div>
                            </div>
                            <div>
                                Дата погрузки - 01.01.2023
                            </div>
                            <div>
                             Цена: Договорная
                            </div>
                            <div className={cn(styles.title, styles.cargoInfo)}>
                                <div>  Бишкек (KG)</div> 
                                <div> Контакты</div>
                            </div>
                    </div>
                </div>
                <div className={styles.cargoItemBlock}>
                    <div className={styles.cargoItemLeft}>
                            <Image src={startIcon} alt="start"/>
                            <div></div>
                            <Image src={endIcon} alt="end"/>
                    </div>
                    <div className={styles.cargoItemRight}>
                            <div className={styles.title}>
                                Волгоград (RU) 
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Груз - Овощи 
                                </div>
                                <div>
                                    Тип машины - Рефрижератор 
                                </div>
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Вес - 20 т
                                </div>
                                <div>
                                Кол-во машин - 2
                                </div>
                            </div>
                            <div>
                                Дата погрузки - 01.01.2023
                            </div>
                            <div>
                             Цена: Договорная
                            </div>
                            <div className={cn(styles.title, styles.cargoInfo)}>
                                <div>  Бишкек (KG)</div> 
                                <div> Контакты</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}