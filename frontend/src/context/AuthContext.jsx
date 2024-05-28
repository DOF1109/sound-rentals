import { createContext, useState } from 'react'


export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [userName, setUserName] = useState("")
    const [user, setUser] = useState({})
    const [isLogged, setIsLogged] = useState(false)

    const handleLogin = ( finalyUser )=> {
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
        console.log(dataName)
    }


    let data = {
        user,
        isLogged,
        userName,
        handleName,
        handleLogin,
        handleLogout
    }

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent
