import dayjs, { Dayjs } from 'dayjs';

export interface ILog  {
    email: string,
    password: string
}
export interface IToken {
    token : string 
}
export interface IReg {
    email: string,
    phone: string,
    name: string,
    surname: string,
    password: string,
    avatar: File | '',
    telegram: string,
    whatsapp: string
}
export type addCargoValues = {
    name: string;
    from: string;
    to: string;
    weight: string;
    volume: string;
    transportType: string;
    shipmentDate: Dayjs | null | string ;
    price: number | null;
    contacts : {
        phone: number | null,
        telegram: string,
        whatsapp: string
    }
  };

  export type addCarValues = {
    name: string;
    from: string;
    to: string;
    weight: string;
    volume: string;
    transportType: string;
    shipmentDate: Dayjs | null | string ;
    price: number | null;
    contacts : {
        phone: number | null,
        telegram: string,
        whatsapp: string
    }
  };

  export interface ICargoItem {
    id: number,
    name: string,
    from: string,
    to: string,
    weight: string,
    volume: string,
    transportType: string,
    shipmentDate: string,
    price: number,
    authorId: number,
    contacts: [
      {
        id: number,
        contact: string
      }
    ],
    author: {
      name: string,
      surname: string,
      email: string,
      phone: string
    }
  }
  export  interface ICargo{
    cargos: ICargoItem[],
    count:number
}   






export interface ICarItem {
    id: number,
    name: string,
    from: string,
    to: string,
    weight: string,
    volume: string,
    transportType: string,
    shipmentDate: string,
    price: number,
    authorId: number,
    contacts: [
      {
        id: number,
        contact: string
      }
    ],
    author: {
      name: string,
      surname: string,
      email: string,
      phone: string
    }
  }
  export  interface ICar{
    cars: ICarItem[],
    count:number
}   