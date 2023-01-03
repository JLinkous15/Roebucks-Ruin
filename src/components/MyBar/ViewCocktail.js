import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../../index.css"
import { Carrousel } from "../Carrousel"
import { HeroCocktail } from "../HeroCocktail"

export const ViewCocktail = ({theme, hamburger, setHamburger, setMyBarMenu}) => {
    const navigate = useNavigate()
    const { cocktailId } = useParams()
    const [ cocktail, setCocktail ] = useState([])
    const [ userCocktails, setUserCocktails ] = useState([])
    const [ thisCocktailsIngredients, setThisCocktailsIngredients ] = useState([])
    const [ thisCocktailsTypes, setThisCocktailsTypes ] = useState([])

    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    useEffect(()=>{
        /* fetching data for the specific cocktail using params */
        fetch(`http://localhost:8088/cocktails?id=${cocktailId}&_expand=user&_expand=method`)
        .then(res=>res.json())
        .then(res=>setCocktail(res[0]))

        fetch(`http://localhost:8088/cocktailIngredients?cocktailId=${cocktailId}&_expand=ingredient`)
        .then(res=>res.json())
        .then(setThisCocktailsIngredients)
        
        fetch(`http://localhost:8088/cocktailTypes?cocktailId=${cocktailId}&_expand=type`)
        .then(res=>res.json())
        .then(setThisCocktailsTypes)

    }, [cocktailId])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktails?userId=${cocktail.userId}`)
        .then(res=>res.json())
        .then(res=>setUserCocktails(res.reverse()))
    }, [cocktail])

    //Functions to turn array into delete promises

    const deleteCocktailIngredients = (obj) => {
        return fetch(`http://localhost:8088/cocktailIngredients/${obj.id}`, {method: "DELETE"})
    }
    const deleteCocktailTypes = (obj) => {
        return fetch(`http://localhost:8088/cocktailTypes/${obj.id}`, {method: "DELETE"})
    }

    const deleteCocktail = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8088/cocktails/${cocktailId}`, {method: "DELETE"})
        // Promise.all(thisCocktailsIngredients.map(ingredient=>deleteCocktailIngredients(ingredient)))
        // Promise.all(thisCocktailsTypes.map(ingredient=>deleteCocktailTypes(ingredient)))
        setTimeout(()=>{navigate(`/mybar`)}, 2000)
    }
    
    return <section className={`viewCocktail componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            {/* A div for the cocktail in question, ingredients ordered by type (spirit first), notes, and about the bartender. Need a new component for this. */}
            <a href={cocktail.image}>
                <HeroCocktail cocktail={cocktail} theme={theme} types={thisCocktailsTypes}/>
            </a>
                <ul className="view-cocktail-recipe">
                    {thisCocktailsIngredients.map((cocktail, index)=>
                        <li key={index} id={index}>
                            <h2 style={{
                                display: "inline"}}>
                                {cocktail.volume}
                            </h2>
                            <h3 style={{display: "inline"}}>
                                {` ${cocktail?.ingredient.ingredientTypeId===3? "dashes":"ounces"} ${cocktail.ingredient.name}`}
                            </h3>
                        </li>
                    )}
                </ul>
                <p className="view-cocktail-notes">{cocktail.notes}</p>
                {cocktail.userId===localUserObj.id
                ?<div className="viewCocktail-button">
                    <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={(e)=>{
                        navigate(`../mybar/${cocktailId}/edit`)
                    }}>
                        Edit Cocktail
                    </button>
                    <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={(e)=>{
                        deleteCocktail(e)
                        navigate(`/mybar`)
                    }}>
                        Delete Cocktail
                    </button>
                </div>
                :""}
                <h3 style={{padding: "0 5vw"}}>See More From This User:</h3>
                <Carrousel cocktails={userCocktails} theme={theme}/>
            </section>
    
}