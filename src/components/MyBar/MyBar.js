import { useEffect, useState } from "react"

export const MyBar = ({theme, hamburger, setHamburger, setMyBarMenu}) => {
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    const [userCocktails, setUserCocktails] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktails?userId=${localUserObj.id}`)
        .then(res=>res.json())
        .then(setUserCocktails)
    },[])
    return <section className={`mybar ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            {/* {userCocktails.map(cocktail=>{
                return 
                })} */}
        
    </section>
}