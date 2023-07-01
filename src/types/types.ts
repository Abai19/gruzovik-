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
export interface IContacts {
    phone: number | null,
    telegram: string,
    whatsapp: string
}
export type addCargoValues = {
    name: string;
    from: string;
    to: string;
    weight: string;
    volume: string;
    cars_quantity: number | null;
    transportType: string;
    cargo_type : string;
    shipmentDate: Dayjs | null | string ;
    price: number | null;
    contacts :IContacts;
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
    contacts : IContacts;
  };

  export interface ICargoItem {
    id: number,
    name: string,
    from: {
      cityName: string;
      countryName: string;
      geonameID: number;
    },
    to:  {
      cityName: string;
      countryName: string;
      geonameID: number;
    },
    weight: string,
    volume: string,
    transportType: string,
    shipmentDate: string,
    price: number,
    cargo_type: string;
    cars_quantity: number;
    authorId: number,
    contacts: IContacts,
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
    from: {
      cityName: string;
      countryName: string;
      geonameID: number;
    },
    to: {
      cityName: string;
      countryName: string;
      geonameID: number;
    },
    weight: string,
    volume: string,
    transportType: string,
    shipmentDate: string,
    price: number,
    authorId: number,
    contacts: IContacts,
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

export interface IUserProfile {
  avatar: null;
  email: string;
  id: number;
  name: string;
  phone: string;
  surname: string;
  telegram: string;
  whatsapp: string;
}