import { apiList, callGet } from "@/axios/api"
import { getToken } from "@/lib/auth"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"

const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [reload, setReload] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [userStatus, setUserStatus] = useState()
    const [verified, setVerified] = useState(false)

    const fetchUserInfo = () => {
        if (getToken()) {
            callGet(`${apiList.merchant}/info`).then((res) => {
                if (res?.status) {
                    setUserInfo(res.data)
                }
            })
        }
    }

    useEffect(() => {
        fetchUserInfo()
    }, [pathname])

  


    return (
        <MainContext.Provider
            value={{
                reload,
                userInfo,
                setReload,
                fetchUserInfo
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext);