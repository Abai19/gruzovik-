import { useAuth } from "@src/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './AddCar.module.scss'
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers'
import { addCarValues } from "@src/types/types";
import { postCar } from "@src/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import AutoCompleteInput from "@components/AutoCompleteInput/AutoCompleteInput";

interface Option {
    countryName: string;
    geonameId: number;
    name: string; 
}

export default function AddCar () {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<addCarValues>({
        contacts: {
            phone: null,
            telegram: '',
            whatsapp: ''
        },
        from : '',
        name : '',
        price : null,
        shipmentDate: null,
        to: '',
        transportType: '',
        volume: '',
        weight: ''
    })
    const router = useRouter();
    const {token} = useAuth()
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
    const datePickerStyles = {
        width: "100%",
        '& .MuiInputBase-input': {
          padding: '8.5px 14px;',
        },
        '& label' : {
            left: "-1px",
            top: "-7px",
            color: "#999"
        }
      };
      async function onSubmit (event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const  response = await  postCar(token ,data);
            if(axios.isAxiosError(response)){
                if(response.response){
                    toast.error(response.response.data.message,{autoClose:1000})
                }
                else {
                    toast.error(response.message,{autoClose:1000})
                }
            }
            else {
                toast.success('Успешно создано!',{autoClose:1000})
            }
          
        }
        catch{

        }
      };

      const onChange=(event : React.ChangeEvent<HTMLInputElement>)=> {
        setData( {
            ...data, 
            [event.target.name] : event.target.value
        })
      }
      const onChangeWithNumber=(event : React.ChangeEvent<HTMLInputElement>)=> {
        setData( {
            ...data, 
            [event.target.name] : Number(event.target.value)
        })
      }
      const changeContacts = (event : React.ChangeEvent<HTMLInputElement>)=> {
        setData( {
            ...data, 
            contacts : {
                ...data.contacts,
                [event.target.name] : event.target.value
            }
        })
      }

      const handleOptionSelect = (option: Option, key: string) => {
        setData( {
            ...data, 
            [key] :  option
        })
    };
    return (
        <div>
            <p className={styles.title}>Заявка на размещение груза </p>
            <form className={styles.main} onSubmit={onSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru" >
                
                    <MobileDatePicker  
                       label="Дата погрузки"
                       value={data.shipmentDate}
                        onChange={(newValue)=> setData({...data,shipmentDate : 
                           //  newValue !==null && typeof newValue !=="string"  ? 
                           //  newValue.format("DD.MM.YYYY")  : null
                           newValue
                       })}
                        sx={datePickerStyles}
                        closeOnSelect ={true}
                        format="DD.MM.YYYY"
                    />
                </LocalizationProvider >
                <AutoCompleteInput 
                    onOptionSelect={handleOptionSelect} 
                    label="Откуда"
                    keyProp="from"
                />
                <AutoCompleteInput 
                    onOptionSelect={handleOptionSelect} 
                    label="Куда"
                    keyProp="to"
                />
                     <TextField
                    // sx={{ width: "100%" }}
                  
                    value= {data.weight}
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
                     value= {data.volume}
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
                    // sx={{ width: "100%" }}
                    value= {data.transportType}
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
                    name= "price"
                    value= {data.price}
                    onChange={onChangeWithNumber}
                    placeholder="Цена"
                    fullWidth
                    type="number"
                    id="outlined-size-small"
                    size="small"
                />
                
                      <TextField
                    onChange={changeContacts}
                    // sx={{ width: "100%" }}
                    placeholder="Телефон"
                    name="phone"
                    fullWidth
                    type="number"
                    id="outlined-size-small"
                    size="small"
                />
                        <TextField
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
    )
}