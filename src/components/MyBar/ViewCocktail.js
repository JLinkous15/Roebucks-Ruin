import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../../index.css"
import "./MyBar.css"

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
        fetch(`http://localhost:8088/cocktails?id=${cocktailId}`)
        .then(res=>res.json())
        .then(res=>setCocktail(res[0]))
        
        fetch(`http://localhost:8088/cocktails?userId=${localUserObj.id}`)
        .then(res=>res.json())
        .then(res=>setUserCocktails(res))

        fetch(`http://localhost:8088/cocktailIngredients?cocktailId=${cocktailId}&_expand=ingredient`)
        .then(res=>res.json())
        .then(setThisCocktailsIngredients)
        
        fetch(`http://localhost:8088/cocktailTypes?cocktailId=${cocktailId}&_expand=type`)
        .then(res=>res.json())
        .then(setThisCocktailsTypes)

    }, [, cocktailId])

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
        Promise.all(thisCocktailsIngredients.map(ingredient=>deleteCocktailIngredients(ingredient)))
        Promise.all(thisCocktailsTypes.map(ingredient=>deleteCocktailTypes(ingredient)))
        setTimeout(()=>{navigate(`/mybar`)}, 2000)
    }
    
    return <section className={`viewCocktail componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            <div className="top">
            <div className="leftSide">
                <label className="recipe_label" htmlFor="recipe">{cocktail.name}</label>
                <img 
                src={cocktail.image} 
                alt="cocktail"
                className="viewCocktailImage"/>
                <ul>
                    {thisCocktailsIngredients.map(cocktailIngredient=>{
                        return <li key={cocktailIngredient.id}>{cocktailIngredient.volume} 
                        {cocktailIngredient?.ingredient?.ingredientTypeId===6
                            ?"muddled"
                            :cocktailIngredient.ingredientId===3
                                ?"dashes"
                                :"ounces"} {cocktailIngredient?.ingredient?.name}</li>
                    })}
                </ul>
                {cocktail.userId===localUserObj.id
                ?<>
                    <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={(e)=>{
                        navigate(`../mybar/${cocktailId}/edit`)
                    }}>
                        Edit
                    </button>
                    <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={deleteCocktail}>
                        Delete
                    </button>
                </>
                :""}
                </div>
                <div className="rightSide">
                    <p>{cocktail.notes}</p>
                </div>
                </div>
                {/*links and carrousels of user cocktails*/}
                <ul className="userCocktailList">
                    {userCocktails.map((userCocktail, index)=>{
                        return <li key={index} 
                        className={`userCocktails ${theme?"dark":"light"}`}
                        style={{backgroundImage: `url(${userCocktail.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"}}>
                            <Link to={`../../mybar/${userCocktail.id}/view`}
                            className="link"
                            >{userCocktail.name}</Link>
                        </li>})}
                </ul>
            </section>
    
}