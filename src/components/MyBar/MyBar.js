import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./MyBar.css"

export const MyBar = ({theme, hamburger, setHamburger, setMyBarMenu}) => {
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    const [firstUserCocktail, setFirstUserCocktail] = useState({})
    const [userCocktails, setUserCocktails] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktails?userId=${localUserObj.id}`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.sort((a, b)=>{
                if(a.id > b.id){
                    return -1
                }else if (a.id < b.id){
                    return 1 
                }
                return 0})
                const firstElement = copy.shift()
            setFirstUserCocktail(firstElement)
            setUserCocktails(copy)
        })    
    },[])

    return <section className={`mybar componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>

            <div className="firstUserCocktail">
                <Link to={`/mybar/${firstUserCocktail.id}/view`} style={{backgroundImage: `url(${firstUserCocktail.image})`}}>
                    <h1>{firstUserCocktail.name}</h1>
                    <h2>{firstUserCocktail.dateCompleted}</h2>
                </Link>
                <ul></ul>
            </div>

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