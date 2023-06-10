import TextField from "@mui/material/TextField";
import { ProfileEdit, ProfileInfo } from "@src/api/api"
import { useAuth } from "@src/context/AuthContext"
import { IUserProfile } from "@src/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useForm,SubmitHandler  } from "react-hook-form";
import styles from './Profile.module.scss'
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import AddingBlock from "@components/AddingComponent/AddingComponent";

export default function Profile () {
    const {token}= useAuth();
    const router = useRouter();
    const [profileData, setProfileData] = useState<IUserProfile | null>(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUserProfile>();
    const onSubmit: SubmitHandler<IUserProfile> =  async(data) => {
        try {
           
              const res = await ProfileEdit(token, data)
              if(res instanceof Object) {
                toast.success('Данные успешно изменены',{autoClose:1000})
              }
              else {
                toast.error('Что то пошло не так',{autoClose:1000})
              }
            
          } catch (error) {
            toast.success('Что то пошло не так',{autoClose:1000})
          }
    }
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (token) {
              const data = await ProfileInfo(token);
              if(data instanceof Object) {
                setProfileData(data as IUserProfile);
              }
             
            }
          } catch (error) {
            console.log('Error:', error);
            setProfileData(null); 
          }
        };
    
        fetchData();
      }, [token]);
    return (
        <>
        <AddingBlock/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>Мой профиль</div>
            { profileData &&  
            <Box className={styles.main}>
        <TextField
                // sx={{ width: "100%" }}
                {...register("name")}
                defaultValue={profileData.name}
                placeholder="Имя"
                fullWidth
                type="text"
                id="outlined-size-small"
                size="small"
            />
                 <TextField
                    {...register("surname")}
                    defaultValue={profileData.surname}
                // sx={{ width: "100%" }}
                placeholder="Фамилия"
                fullWidth
                type="text"
                id="outlined-size-small"
                size="small"
            />
    
                 <TextField
                    {...register("email")}
                    defaultValue={profileData.email}
                placeholder="E-mail"
                fullWidth
                type="text"
                id="outlined-size-small"
                size="small"
            />
                 <TextField
                   {...register("phone")}
                   defaultValue={profileData.phone}
                placeholder="Номер телефона"
                fullWidth
                type="text"
                id="outlined-size-small"
                size="small"
            />
             <TextField
                    {...register("whatsapp")}
                    defaultValue={profileData.whatsapp}
                placeholder="Whatsapp"
                fullWidth
                type="text"
                id="outlined-size-small"
                size="small"
            />
            <TextField
                    {...register("telegram")}
                    defaultValue={profileData.telegram}
                placeholder="Telegram"
                fullWidth
                type="text"
                id="outlined-size-small"
                size="small"
            />
             <button  type="submit" className="btnBlue">Сохранить</button>
             </Box>
             
            }
            </form>
        </>
    )
}