import cn from 'classnames'
import Image from 'next/image';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styles from './CarItem.module.scss'
import startIcon from '@assets/from.svg'
import endIcon from '@assets/to.svg'
import { ICarItem, IContacts } from '@src/types/types';
import { Button } from '@mui/material';
import { formatDateString } from '@src/helpers/helpers';
import DeleteComponent from '@components/DeleteComponent/DeleteComponent';
import { useState } from 'react';
import Contacts from '@components/Contacts/Contacts';
import trashIcon from '@assets/trash.svg'
import PencilIcon from '@assets/pencil.svg'
import { useRouter } from 'next/router';

interface IProps  {
    car: ICarItem,
    //getContacts: (contacts: Pick<ICarItem,'contacts'>)=> void,
    isEditable?: boolean,
    fetchData?: (token: string)=> void
}
export default function CarItem ({car,isEditable, fetchData}: IProps) {
    dayjs.locale('ru');
    const [openDelete, setOpenDelete] = useState(false);
    const [open, setOpen] = useState(false);
    const [contactData, setContactData]= useState<IContacts | null>(null)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getContacts =(contacts: IContacts)=> {

      console.log(contacts)
      setContactData(contacts)
      handleOpen()
    }
    const {push} = useRouter();

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
                                {car.from.countryName}, {car.from.cityName}
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Груз - Овощи 
                                </div>
                                <div>
                                    Тип машины - {car.transportType} 
                                </div>
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Вес - {car.weight} т
                                </div>
                                <div>
                                Кол-во машин - 2
                                </div>
                            </div>
                            <div>
                                Дата погрузки - {formatDateString(car.shipmentDate)}
                            </div>
                            <div>
                             Цена: {car.price}
                            </div>
                            <div className={cn(styles.title, styles.cargoInfo)}>
                                <div>{car.to.countryName}, {car.to.cityName}</div> 
                                <Button className={styles.btnContact} onClick={()=> getContacts(car.contacts)}>Контакты</Button >
                            </div>
                            {
                                isEditable && 
                                <div className={styles.editBlock}>
                                    <Image alt='edit' src={PencilIcon}
                                        onClick={()=> push(`editCargo/${car.id}`)}
                                    />
                                    <Image alt='delete' src={trashIcon}
                                        onClick={()=> setOpenDelete(true)}
                                    />
                                </div>
                            }
                    </div>  
                </div>
                {
                open && contactData && (
                    <Contacts open={open} handleClose={handleClose} contactData={contactData} />
                )
                }
                {
                openDelete && 
                <DeleteComponent 
                    id={car.id}
                    label="car"
                    open={openDelete}
                    setOpen={setOpenDelete}
                    fetchData= {fetchData}
                />
            }
            </div>
        </div>
    )
}