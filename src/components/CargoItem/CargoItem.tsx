import cn from 'classnames'
import Image from 'next/image';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styles from './CargoItem.module.scss'
import startIcon from '@assets/from.svg'
import endIcon from '@assets/to.svg'
import { ICargoItem } from '@src/types/types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { formatDateString } from '@src/helpers/helpers';
import Contacts from '@components/Contacts/Contacts';
import trashIcon from '@assets/trash.svg'
import PencilIcon from '@assets/pencil.svg'
import DeleteComponent from '@components/DeleteComponent/DeleteComponent';
import { useRouter } from 'next/router';


interface IProps  {
    cargo: ICargoItem,
    isEditable?: boolean,
    fetchData?: (token: string)=> void
    // getContacts: (contacts: Pick<ICargoItem,'contacts'>)=> void
}
export default function CargoItem ({cargo, isEditable, fetchData}: IProps) {
    dayjs.locale('ru');
    const {push} = useRouter();
    const datePickerStyles = {
        '& .MuiInputBase-input': {
          padding: '8.5px 14px;',
        },
    };
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [contactData, setContactData]= useState<Pick<ICargoItem,'contacts'> | null>(null)
     const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getContacts =(contacts: Pick<ICargoItem,'contacts'>)=> {
    
    console.log(contacts)
    setContactData(contacts)
    handleOpen()
  }
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
                                {cargo.from.countryName}, {cargo.from.cityName}
                            </div>
                            <div className={styles.cargoItemInfo}>
                                <div>
                                    Груз - {cargo.cargo_type} 
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
                                Кол-во машин - {cargo.cars_quantity}
                                </div>
                            </div>
                            <div>
                                Дата погрузки - {formatDateString(cargo.shipmentDate)}
                            </div>
                            <div>
                             Цена: {cargo.price.toLocaleString()}
                            </div>
                            <div className={cn(styles.title, styles.cargoInfo)}>
                                <div>   {cargo.to.countryName}, {cargo.to.cityName}</div> 
                                <Button className={styles.btnContact} onClick={()=> getContacts({contacts: cargo.contacts})}>Контакты</Button >
                            </div>
                            {
                                isEditable && 
                                <div className={styles.editBlock}>
                                    <Image alt='edit' src={PencilIcon}
                                        onClick={()=> push(`editCargo/${cargo.id}`)}
                                    />
                                    <Image alt='delete' src={trashIcon}
                                        onClick={()=> setOpenDelete(true)}
                                    />
                                </div>
                            }
                    </div>  
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
                    id={cargo.id}
                    label="cargo"
                    open={openDelete}
                    setOpen={setOpenDelete}
                    fetchData= {fetchData}
                />
            }
        </div>
    )
}