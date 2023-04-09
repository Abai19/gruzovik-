import { ILog, IReg, IToken } from "@src/types/types";
import { API } from "@src/variables/variables";
import axios from "axios";
import { toast } from "react-toastify";

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
    const { data, status } = await axios.get<Promise<string>>(
      API.auth.profile,
      {
        headers: {
            "Content-Type ": "application/json",
            "AUTHORIZATION": `bearer ${token} `


        },


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

