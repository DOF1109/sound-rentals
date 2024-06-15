import { createContext, useEffect, useState } from 'react'
import {getUserByEmail} from "../api/userApi"
import {getDjFavoritos} from "../api/djsApi"

export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [userName, setUserName] = useState("")
    const [user, setUser] = useState({})
    const [userDb, setUserDb] = useState(undefined)
    const [isLogged, setIsLogged] = useState(false)
    const [djFavorites, setDjFavorites] = useState([])

    const handleLogin = async ( finalyUser )=> {
        //En el estado 'user' tenemos la direccion de email y el rol
        setUser(finalyUser)
        setIsLogged(true)
        //Guardo datos del logeo del usuario en localStorage
        localStorage.setItem("userInfo", JSON.stringify(finalyUser))
        localStorage.setItem("isLogged", JSON.stringify(true))
    }

    const handleLogout = ()=> {
        setUser({})
        setIsLogged(false)
        //Borro datos del logeo del usuario en localStorage
        localStorage.removeItem("userInfo")
        localStorage.removeItem("isLogged")
        //localStorage.removeItem("userName")
    }

    const handleName = ( dataName )=> {
       setUserName(dataName)
       localStorage.setItem("userName", JSON.stringify(dataName))
    }

    //Buscar usuario en BD 
    const loadUserDb = async ()=>{
        const userCheckLS = JSON.parse(localStorage.getItem("userInfo")) || undefined;
        const userDbCheckLs = JSON.parse(localStorage.getItem("userDb")) || undefined;

        if(userCheckLS){
            if(userDbCheckLs){
                setUserDb(userDbCheckLs)
            }
            else{
                const userBusqueda = await getUserByEmail(userCheck.email)
                setUserDb(userBusqueda)
                localStorage.setItem("userDb", JSON.stringify(userBusqueda))
            }
        }
    }

    const loadDjsFavorites = async ()=>{
        const djFavoritosBd = await getDjFavoritos();
        console.log(djFavoritosBd)
        setDjFavorites(djFavoritosBd)
        localStorage.setItem("djFavorites", JSON.stringify(djFavoritosBd))
    }

    useEffect(()=>{
        loadUserDb();
        loadDjsFavorites();
    },[])


    let data = {
        user,
        userDb,
        isLogged,
        userName,
        djFavorites,
        handleName,
        handleLogin,
        handleLogout,
        loadDjsFavorites
    }

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent
