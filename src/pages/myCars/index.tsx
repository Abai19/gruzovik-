import AddingBlock from "@components/AddingComponent/AddingComponent";
import CargoItem from "@components/CargoItem/CargoItem";
import { UserCars} from "@src/api/api";
import { useAuth } from "@src/context/AuthContext";
import { ICarItem } from "@src/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import BoxPic from '@assets/box.svg';
import styles from './myCars.module.scss'
import CarItem from "@components/CarItem/CarItem";

export default function myCars () {
    const [cars, setCars] = useState<ICarItem[] | null>(null)
    const {token} = useAuth();
    useEffect(() => {
        fetchData();
      }, [token]);
      
      const fetchData = async () => {
        try {
          if (token) {
            const data = await UserCars(token);
            if(data instanceof Object) {
                setCars(data as ICarItem[]);
            }
           
          }
        } catch (error) {
          console.log('Error:', error);
          setCars(null); 
        }
      };
    return (
        <> 
        <AddingBlock/>
        <div className="main">
            {
                cars !== null ? (
                    <>
                    <h3  className={styles.title}>Мой транспорт</h3>
                    {cars.map((car) => (
                        <CarItem  fetchData={fetchData} isEditable key={car.id} car={car} />
                    ))}
                    </>
                ) : (
                    <div className={styles.notFoundBlock}>
                    <p>У Вас пока нет активных транспортов</p>
                    <Image alt="box" src={BoxPic} />
                    </div>
                )
            }
        </div>
        </>
    )
}