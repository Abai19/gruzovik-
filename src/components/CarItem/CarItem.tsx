import cn from 'classnames'
import Image from 'next/image';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styles from './CarItem.module.scss'
import startIcon from '@assets/from.svg'
import endIcon from '@assets/to.svg'
import { ICarItem } from '@src/types/types';
export default function CarItem (cargo: ICarItem) {
    dayjs.locale('ru');

    const datePickerStyles = {
        '& .MuiInputBase-input': {
          padding: '8.5px 14px;',
        },
      };
    return (
        <div>
            <div>
                <div className={styles.cargoItemBlock}>
                    <div className={styles.cargoItemLeft}>
                            <Image src={startIcon} alt="start"/>
                            <div></div>
                            <Image src={endIcon} alt="end"/>
                    </div>
                    <div className={styles.cargoItemRight}>
                            <div className={styles.title}>
                                {cargo.from}
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Груз - Овощи 
                                </div>
                                <div>
                                    Тип машины - {cargo.transportType} 
                                </div>
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Вес - {cargo.weight} т
                                </div>
                                <div>
                                Кол-во машин - 2
                                </div>
                            </div>
                            <div>
                                Дата погрузки - {cargo.shipmentDate}
                            </div>
                            <div>
                             Цена: {cargo.price.toLocaleString()}
                            </div>
                            <div className={cn(styles.title, styles.cargoInfo)}>
                                <div>  {cargo.to}</div> 
                                <div> Контакты</div>
                            </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}