import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./MyBar.css"

export const MyBar = ({theme, hamburger, setHamburger, setMyBarMenu}) => {
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    const [userCocktails, setUserCocktails] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktails?userId=${localUserObj.id}`)
        .then(res=>res.json())
        .then(setUserCocktails)
    },[])
    return <section className={`mybar componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            <div className="mybar_cocktails">
            {userCocktails.map((cocktail, index)=>{
                return <Link key={index} 
                to={`/mybar/${cocktail.id}/view`} 
                className={`mybar_cocktailList`}
                style={{backgroundImage: `url(${cocktail.image})`}}>{cocktail.name}</Link>

                })}
        </div>
    </section>
}