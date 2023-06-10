import { ICarItem, ICargo, ICargoItem, ILog, IReg, IToken, IUserProfile, addCarValues, addCargoValues } from "@src/types/types";
import { API } from "@src/variables/variables";
import axios from "axios";


export async function Auth (info: ILog) {
    try {
        const { data, status } = await axios.post<Promise<string>>(
          API.auth.login,
          {email: info.email, password : info.password},
          {
            headers: {
                "Content-Type ": "application/json"
            }
          }
        )
        console.log('response status is: ', status);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';    
        }
      }
}
export async function AcceptReg (info: string) {
  try {
      const { data, status } = await axios.post<Promise<{message: string}>>(
        API.auth.activation,
        {activationCode: info},
        {
          headers: {
              "Content-Type ": "application/json"
          }
        }
      )
      console.log('response status is: ', status);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error
      }else {
        console.log('unexpected error: ', error);
        return {message: "error"};    
      }
    }
}

export async function Regis(info : IReg ){
    try {

      const formData = new FormData();
      if(typeof info.avatar == "object"){
        formData.append("avatar",info.avatar);
      }
      formData.append("email",info.email);
      formData.append("name",info.name);
      formData.append("password",info.password);
      formData.append("phone",info.phone);
      formData.append("surname",info.surname);
      formData.append("telegram",info.telegram);
      formData.append("whatsapp",info.whatsapp);
      const { data, status } = await axios.post<Promise<{message: string}>>(
        API.auth.registaration,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      console.log('response status is: ', status);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error
      } else {
        console.log('unexpected error: ', error);
        return {message: "error"};    
      }
    }

}

export async function ProfileInfo(token: string){
  try {
    const { data, status } = await axios.get<IUserProfile>(
      API.auth.profile,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } 
  }
}

export async function ProfileEdit(token: string | null, info :IUserProfile ){
  try {
    const { data } = await axios.patch<IUserProfile>(
      API.auth.editProfile,
      info,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } 
  }
}

export async function postCargo (token: string | null, info: addCargoValues) {
  try {
    const { data, status } = await axios.post<Promise<string>>(
      API.cargo.create,
      info,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    console.log('response status is: ', status);
    return data;
  } 
  catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';    
    }
  }
}

export async function postCar (token: string | null, info: addCarValues) {
  try {
    const { data, status } = await axios.post<Promise<string>>(
      API.cars.create,
      info,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    console.log('response status is: ', status);
    return data;
  } 
  catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';    
    }
  }
}

export async function UserCargos(token: string){
  try {
    const { data, status } = await axios.get<ICargoItem[]>(
      API.cargo.userCargos,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } 
  }
}
export async function UserCars(token: string){
  try {
    const { data, status } = await axios.get<ICarItem[]>(
      API.cars.userCars,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } 
  }
}

export async function DeleteItem(token: string, label: string, id: number){
  try {
    const { data } = await axios.delete(
      label =="cargo" ? API.cargo.cargoById+id : API.cars.carById+id ,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } 
  }
}


export async function UserCargosById(token: string, id: number){
  try {
    const { data, status } = await axios.get<ICargoItem>(
      API.cargo.cargoById+id,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `
        },
      }
    )
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error
    } 
  }
}