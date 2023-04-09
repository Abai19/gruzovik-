import { ProfileInfo } from "@src/api/api"
import { useAuth } from "@src/context/AuthContext"
import { useEffect } from "react"

export default function Profile () {
    const {token}= useAuth()
    useEffect(()=> {
        if(token){
            ProfileInfo(token)
        }
    },[token])
    return (
        <div>
            profile
        </div>
    )
}