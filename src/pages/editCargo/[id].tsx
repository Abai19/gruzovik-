import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { ICargoItem } from "@src/types/types";
import { UserCargosById } from "@src/api/api";
import { useAuth } from "@src/context/AuthContext";
import { toast } from "react-toastify";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from './EditCargo.module.scss'
import AutoCompleteInput from "@components/AutoCompleteInput/AutoCompleteInput";
import dayjs from 'dayjs';

interface Option {
    countryName: string;
    geonameId: number;
    name: string;
}
export default function EditCargo() {
    const { handleSubmit, register, setValue } = useForm<ICargoItem>();
    const [data, setData] = useState<ICargoItem>({
        contacts: {
            phone: 0,
            telegram: '',
            whatsapp: ''
        },
        from: {
            cityName: '',
            countryName: '',
            geonameID: 0
        },
        cargo_type: '',
        cars_quantity: 0,
        name: '',
        price: 0,
        shipmentDate: '',
        to: {
            cityName: '',
            countryName: '',
            geonameID: 0
        },
        transportType: '',
        volume: '',
        weight: '',
        id: 0,
        author: {
            email: "",
            name: '',
            phone: '',
            surname: ''
        },
        authorId: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const id = router.query['id'];
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (!token || !id) { // Check if token and id exist
                return;
            }
            try {
                const idL = typeof id === 'string' ? parseInt(id) : 0
                const response = await UserCargosById(token, idL);
                if (axios.isAxiosError(response)) {
                    if (response.response) {
                        toast.error(response.response.data.message, { autoClose: 1000 });
                    } else {
                        toast.error(response.message, { autoClose: 1000 });
                    }
                } else if (response) {
                    setData(response);
                    //   setValue('')
                    //setValue('from', response?.from);
                }
                setIsLoading(false);
            } catch (error) {
                // Handle error
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setValue, token, id]);

    //   const onSubmit = async (formData: ICargoItem) => {
    //     try {
    //       const response = await axios.post('your-api-endpoint', formData);
    //       // Handle the response as needed
    //     } catch (error) {
    //       // Handle any errors
    //     }
    //   };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const datePickerStyles = {
        width: "100%",
        '& .MuiInputBase-input': {
            padding: '8.5px 14px;',
        },
        '& label': {
            left: "-1px",
            top: "-7px",
            color: "#999"
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setData( {
        //     ...data, 
        //     [event.target.name] : event.target.value
        // })
    }
    const onChangeWithNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setData( {
        //     ...data, 
        //     [event.target.name] : Number(event.target.value)
        // })
    }
    const changeContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setData( {
        //     ...data, 
        //     contacts : {
        //         ...data.contacts,
        //         [event.target.name] : event.target.value
        //     }
        // })
    }
    const handleOptionSelect = (option: Option, key: string) => {
        // console.log('Selected option:', option);
        // console.log(key);
        // setData( {
        //     ...data, 
        //     [key] :  option
        // })
    };
    return (
        <div>
            <p className={styles.title}>Редактирование груза </p>
            <form className={styles.main} onSubmit={onSubmit}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru" >
            
                <MobileDatePicker  
                    // slots={() => <TextField placeholder="Выберите дату"/>}
                    label="Дата погрузки"
                    value={data.shipmentDate}
                    // onChange={(newValue)=> setData({...data,shipmentDate : 
                    //     //  newValue !==null && typeof newValue !=="string"  ? 
                    //     //  newValue.format("DD.MM.YYYY")  : null
                    //     newValue
                    // })}
                     sx={datePickerStyles}
                     closeOnSelect ={true}
                     format="DD.MM.YYYY"
                />
            </LocalizationProvider>  */}
                <AutoCompleteInput
                    onOptionSelect={handleOptionSelect}
                    label="Откуда"
                    keyProp="from"
                    countryName={data.from.countryName}
                    geonameId={data.from.geonameID}
                    name={data.from.cityName}
                />
                <AutoCompleteInput
                    onOptionSelect={handleOptionSelect}
                    label="Куда"
                    keyProp="to"
                    countryName={data.to.countryName}
                    geonameId={data.to.geonameID}
                    name={data.to.cityName}
                />

                <TextField
                    value={data.volume}
                    onChange={onChange}
                    name="volume"
                    // sx={{ width: "100%" }}
                    placeholder="Объем груза (м³)"
                    fullWidth
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    value={data.weight}
                    onChange={onChange}
                    name="weight"
                    // sx={{ width: "100%" }}
                    placeholder="Вес (т)"
                    fullWidth
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    value={data.cargo_type}
                    onChange={onChange}
                    name="cargo_type"
                    // sx={{ width: "100%" }}
                    placeholder="Тип груза"
                    fullWidth
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    // sx={{ width: "100%" }}
                    value={data.transportType}
                    name="transportType"
                    onChange={onChange}
                    placeholder="Тип машины"
                    fullWidth
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    // sx={{ width: "100%" }}
                    value={data.cars_quantity}
                    name="cars_quantity"
                    onChange={onChangeWithNumber}
                    placeholder="Количество машин"
                    fullWidth
                    type="number"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    // sx={{ width: "100%" }}
                    name="price"
                    value={data.price}
                    onChange={onChangeWithNumber}
                    placeholder="Цена"
                    fullWidth
                    type="number"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    onChange={changeContacts}
                    value={data.contacts.phone}
                    // sx={{ width: "100%" }}
                    placeholder="Телефон"
                    name="phone"
                    fullWidth
                    type="number"
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    value={data.contacts.whatsapp}
                    onChange={changeContacts}
                    // sx={{ width: "100%" }}
                    placeholder="Whatsapp"
                    name="whatsapp"
                    fullWidth
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                <TextField
                    value={data.contacts.telegram}
                    onChange={changeContacts}
                    // sx={{ width: "100%" }}
                    name="telegram"
                    placeholder="Telegram"
                    fullWidth
                    type="text"
                    id="outlined-size-small"
                    size="small"
                />
                <button className="btnBlue">Разместить</button>
            </form>
        </div>
    );
}
