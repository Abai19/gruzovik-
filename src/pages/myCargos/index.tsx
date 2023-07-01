import AddingBlock from "@components/AddingComponent/AddingComponent";
import CargoItem from "@components/CargoItem/CargoItem";
import { UserCargos } from "@src/api/api";
import { useAuth } from "@src/context/AuthContext";
import { ICargo, ICargoItem } from "@src/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import BoxPic from '@assets/box.svg';
import styles from './myCargos.module.scss'
import Table from "@components/Table/Table";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function myCargos() {
    const [cargos, setCargos] = useState<ICargoItem[] | null>(null);
    const matches = useMediaQuery('(min-width:925px)');

    const { token } = useAuth();
    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            if (token) {
                const data = await UserCargos(token);
                if (data instanceof Object) {
                    setCargos(data as ICargoItem[]);
                }

            }
        } catch (error) {
            console.log('Error:', error);
            setCargos(null);
        }
    };
    return (
        <>
            <AddingBlock />
            <div className="main">
                {
                    cargos !== null && cargos.length> 0 ? (
                        <>
                            <h3 className={styles.title}>Мои грузы</h3>
                            {matches ? (
                                <Table page="cargo" fetchData={fetchData} isEditable cargos={cargos} />
                            ) : (
                                cargos.map((cargo) => <CargoItem fetchData={fetchData} isEditable key={cargo.id} cargo={cargo} />)
                            )}

                        </>
                    ) : (
                        <div className={styles.notFoundBlock}>
                            <p>У Вас пока нет активных грузов</p>
                            <Image alt="box" src={BoxPic} />
                        </div>
                    )
                }
            </div>
        </>
    )
}