import { useAuth } from "@src/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box/Box";
export default function AddCargo (){
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {token} = useAuth()
    useEffect(()=> {
        if(!token) {
            router.push('/login')
        }
        else {
            setIsLoading(false);
        }
    },[])
    if (isLoading) {
        return       <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" } }>
                        <CircularProgress />
                    </Box>
      }
    return (
        <div>
            Добавить груз 
        </div>
    )
}