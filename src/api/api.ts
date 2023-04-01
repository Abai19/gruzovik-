import { ILog, IToken } from "@src/types/types";
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



