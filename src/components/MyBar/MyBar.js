import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DateConverter } from "../DateConverter"
import "./MyBar.css"

export const MyBar = ({theme, hamburger, setHamburger, setMyBarMenu}) => {
    const [userCocktails, setUserCocktails] = useState([])
    const [latestUserCocktail, setLatestUserCocktail] = useState({})
    const [latestCocktailType, setLatestCocktailType] = useState([])
    const [latestCocktailIngredients, setLatestCocktailIngredients] = useState([])
    const [ingredientTypes, setIngredientTypes] = useState([])
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktails?userId=${localUserObj.id}&_expand=method`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.sort((a, b)=>{
                if(a.id > b.id){
                    return -1
                }else if (a.id < b.id){
                    return 1 
                }
            return 0})
            const latest = copy.shift()
            setUserCocktails(copy)
            setLatestUserCocktail(latest)
        })

        fetch(`http://localhost:8088/ingredientTypes`)
        .then(res=>res.json())
        .then(setIngredientTypes)
    }, [])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktailTypes?cocktailId=${latestUserCocktail.id}&_expand=type`)
        .then(res=>res.json())
        .then(setLatestCocktailType)
        
        fetch(`http://localhost:8088/cocktailIngredients?cocktailId=${latestUserCocktail.id}&_expand=ingredient`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.sort((a, b)=>{
                if(a?.ingredient?.ingredientTypeId > b?.ingredient?.ingredientTypeId){
                    return 1
                }else if(a?.ingredient?.ingredientTypeId < b?.ingredient?.ingredientTypeId){
                    return -1
                }
                return 0})
            setLatestCocktailIngredients(copy)})
        
    }, [latestUserCocktail])

    return <section className={`mybar ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
    setMyBarMenu(true)}}>
        <div className="mybar-latest">
            <Link className="myBar-latest-image" style={{backgroundImage: `url(${latestUserCocktail.image})`}}>
                <h3>{latestUserCocktail.name}</h3>
                <h4><DateConverter date={latestUserCocktail.dateCompleted} /></h4>
            </Link>
        <div className="myBar-latest-recipe">
            <ul>
                {latestCocktailIngredients.map((latestIngredient, index)=>{
                    return <li key={index}>{latestIngredient.volume} {latestIngredient?.ingredient?.name}</li>
                })}
            </ul>
        </div>
        </div>
    </section>
}