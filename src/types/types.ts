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