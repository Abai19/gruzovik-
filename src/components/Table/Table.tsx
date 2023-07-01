import { ICarItem, ICargoItem, IContacts } from "@src/types/types";
import { Table as TableMui, TableContainer, TableHead, TableRow, TableCell, TableBody, tableCellClasses } from '@mui/material';
import { formatDateString } from "@src/helpers/helpers";
import styled from "@emotion/styled";
import Image from 'next/image';
import PhoneIcon from '@assets/ph_phone.svg'
import { useState } from "react";
import Contacts from "@components/Contacts/Contacts";
import PencilIcon from '@assets/pencilDesktop.svg';
import TrashIcon from '@assets/trashDesktop.svg';
import { useRouter } from "next/router";
import DeleteComponent from "@components/DeleteComponent/DeleteComponent";

interface CargoTableProps {
    cargos?: ICargoItem[];
    cars?: ICarItem[];
    page: 'cars' | 'cargo';
    isEditable?: boolean;
    fetchData?: (token: string) => void
}
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: "bold",
        lineHeight: '18px',
        color: '#2C2E34',
    }
}));

const StyledTableCellBody = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
        fontWeight: "bold",
        lineHeight: '18px',
        color: 'var(--blue)',
    }
}));
const Table: React.FC<CargoTableProps> = ({ cars, cargos, page, isEditable, fetchData }) => {
    const [contactData, setContactData] = useState<IContacts | null>(null)
    const [open, setOpen] = useState(false);
    const { push } = useRouter();
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getContacts = (contacts: IContacts) => {
        setContactData(contacts)
        handleOpen()
    }
    return (
        <>
            <TableContainer>
                <TableMui>
                    <TableHead>
                        {
                            page === 'cargo' ? (
                                <TableRow>
                                    <StyledTableCell>Дата</StyledTableCell>
                                    <StyledTableCell>Направление</StyledTableCell>
                                    <StyledTableCell>Груз</StyledTableCell>
                                    <StyledTableCell>Тип</StyledTableCell>
                                    <StyledTableCell>Вес</StyledTableCell>
                                    <StyledTableCell>Кол-во</StyledTableCell>
                                    <StyledTableCell>Цена</StyledTableCell>
                                    <StyledTableCell>Контакты</StyledTableCell>
                                    {
                                        isEditable &&
                                        <StyledTableCell>Редактировать</StyledTableCell>
                                    }
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <StyledTableCell>Дата</StyledTableCell>
                                    <StyledTableCell>Направление</StyledTableCell>
                                    <StyledTableCell>Вес</StyledTableCell>
                                    <StyledTableCell>Тип машины</StyledTableCell>
                                    <StyledTableCell>Объем</StyledTableCell>
                                    <StyledTableCell>Цена</StyledTableCell>
                                    <StyledTableCell>Контакты </StyledTableCell>
                                    {
                                        isEditable &&
                                        <StyledTableCell>Редактировать</StyledTableCell>
                                    }
                                </TableRow>
                            )
                        }
                    </TableHead>
                    <TableBody>
                        {page === 'cargo' && cargos && cargos.map((cargo) => (
                            <TableRow key={cargo.id}>
                                <StyledTableCellBody>{formatDateString(cargo.shipmentDate)}</StyledTableCellBody>
                                <StyledTableCellBody>{cargo.from.cityName} - {cargo.to.cityName}</StyledTableCellBody>
                                <StyledTableCellBody>{cargo.cargo_type}</StyledTableCellBody>
                                <StyledTableCellBody>{cargo.transportType}</StyledTableCellBody>
                                <StyledTableCellBody>{cargo.volume}</StyledTableCellBody>
                                <StyledTableCellBody>{cargo.cars_quantity}</StyledTableCellBody>
                                <StyledTableCellBody>{cargo.price}</StyledTableCellBody>
                                <StyledTableCellBody>
                                    <Image
                                        style={{ cursor: 'pointer' }}
                                        src={PhoneIcon} alt="контакты"
                                        onClick={() => getContacts(cargo.contacts)}
                                    />
                                </StyledTableCellBody>
                                {
                                    isEditable &&
                                    <StyledTableCellBody>
                                        <Image alt='edit' src={PencilIcon} style={{ cursor: 'pointer' }}
                                            onClick={() => push(`editCargo/${cargo.id}`)}
                                        />
                                        <Image alt='delete' src={TrashIcon} style={{ cursor: 'pointer' }}
                                            onClick={() => setOpenDelete(true)}
                                        />
                                    </StyledTableCellBody>
                                }
                                {
                                    openDelete &&
                                    <DeleteComponent
                                        id={cargo.id}
                                        label="cargo"
                                        open={openDelete}
                                        setOpen={setOpenDelete}
                                        fetchData={fetchData}
                                    />
                                }
                            </TableRow>
                        ))}
                        {page === 'cars' && cars && cars.map((car) => (
                            <TableRow key={car.id}>
                                <StyledTableCellBody>{formatDateString(car.shipmentDate)}</StyledTableCellBody>
                                <StyledTableCellBody>{car.from.cityName} - {car.to.cityName}</StyledTableCellBody>
                                <StyledTableCellBody>{car.weight}</StyledTableCellBody>
                                <StyledTableCellBody>{car.transportType}</StyledTableCellBody>
                                <StyledTableCellBody>{car.volume}</StyledTableCellBody>
                                <StyledTableCellBody>{car.price}</StyledTableCellBody>
                                <StyledTableCellBody>
                                    <Image
                                        style={{ cursor: 'pointer' }}
                                        src={PhoneIcon} alt="контакты"
                                        onClick={() => getContacts(car.contacts)}
                                    />
                                </StyledTableCellBody>
                                {
                                    isEditable &&
                                    <StyledTableCellBody>
                                        <Image alt='edit' src={PencilIcon} style={{ cursor: 'pointer' }}
                                            onClick={() => push(`editCar/${car.id}`)}
                                        />
                                        <Image alt='delete' src={TrashIcon} style={{ cursor: 'pointer' }}
                                            onClick={() => setOpenDelete(true)}
                                        />
                                    </StyledTableCellBody>
                                }
                                {
                                    openDelete &&
                                    <DeleteComponent
                                        id={car.id}
                                        label="car"
                                        open={openDelete}
                                        setOpen={setOpenDelete}
                                        fetchData={fetchData}
                                    />
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </TableMui>
            </TableContainer>
            {
                open && contactData && (
                    <Contacts open={open} handleClose={handleClose} contactData={contactData} />
                )
            }

        </>
    );
};
export default Table;