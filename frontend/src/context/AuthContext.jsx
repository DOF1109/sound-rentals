import { createContext, useEffect, useState } from 'react'
import {getUserByEmail, getUsers} from "../api/userApi"
import {getDjFavoritos,getDjCalificados} from "../api/djsApi"
import { getAllUsers } from '../firebaseConfig'

export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [userName, setUserName] = useState("")
    const [user, setUser] = useState(undefined)
    const [userDb, setUserDb] = useState(undefined)
    const [usersFb, setUsersFb] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [djFavorites, setDjFavorites] = useState([])
    const [djCalificados, setDjCalificados] = useState([])

    const handleLogin = async ( finalyUser )=> {
        //Guardo datos del logeo del usuario en localStorage
        localStorage.setItem("userInfo", JSON.stringify(finalyUser))
        localStorage.setItem("isLogged", JSON.stringify(true))

        //En el estado 'user' tenemos la direccion de email y el rol
        setUser(finalyUser)
        setIsLogged(true)
    }

    const handleLogout = ()=> {
        //Borro datos del logeo del usuario en localStorage
        localStorage.removeItem("userInfo")
        localStorage.removeItem("isLogged")
        localStorage.removeItem("userDb")
        localStorage.removeItem("djFavorites")
        localStorage.removeItem("djCalificados")
        
        setUser(undefined)
        setUserDb(undefined)
        setIsLogged(false)
    }

    const handleName = ( dataName )=> {
        setUserName(dataName)
        localStorage.setItem("userName", JSON.stringify(dataName))
    }

    //Buscar usuario en BD 
    const loadUserDb = async ()=>{
        if(user){
            const usersBd = await getUsers();
            const userBusqueda = usersBd.find((u)=>u.email==user.email);
            setUserDb(userBusqueda)
            localStorage.setItem("userDb", JSON.stringify(userBusqueda))
        }
    }

    const loadUsersFb = async ()=>{
        const data = await getAllUsers();
        if (data) setUsersFb(data);
    }

    const loadDjsFavorites = async ()=>{
        const djFavoritosBd = await getDjFavoritos();
        setDjFavorites(djFavoritosBd)
        localStorage.setItem("djFavorites", JSON.stringify(djFavoritosBd))
    }

    const loadDjsCalificados = async ()=>{
        const djCalificadosBd = await getDjCalificados();
        setDjCalificados(djCalificadosBd)
        localStorage.setItem("djCalificados", JSON.stringify(djCalificadosBd))
    }

    useEffect(()=>{
        loadUserDb();
        loadUsersFb();
    },[user])

    useEffect(()=>{
        if(userDb){
            loadDjsFavorites();
            loadDjsCalificados();
        }
    },[userDb])


    let data = {
        user,
        userDb,
        usersFb,
        loadUsersFb,
        isLogged,
        userName,
        djFavorites,
        djCalificados,
        handleName,
        handleLogin,
        handleLogout,
        loadDjsFavorites,
        loadDjsCalificados
    }

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent
