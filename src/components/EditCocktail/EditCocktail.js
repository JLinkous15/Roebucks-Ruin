import { useEffect, useState } from "react"
import "../../index.css"
import "./EditCocktail.css"
import { EditNameAndType } from "./EditNameAndType"
import { EditIngredients } from "./EditIngredients"
import { EditMethods } from "./EditMethods"
import { EditPicture } from "./EditPicture"
import { EditNotes } from "./EditNotes"
import { EditRecipe } from "./EditRecipe"
import { EditSubmitButton } from "./EditSubmitButton"
import { useParams } from "react-router-dom"

export const EditCocktail = ({theme, setHamburger, setMyBarMenu}) => {
    const {cocktailId} = useParams()
    const [types, setTypes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([]) 
    const [ingredientTypes, setIngredientTypes] = useState([])
    const [filteredIngredientTypes, setFilteredIngredientTypes] = useState([])
    const [methods, setMethods] = useState([])
    const [currentCocktailIngredients, setCurrentCocktailIngredients] = useState([])
    const [userCocktailIngredientsArray, setUserCocktailIngredientsArray] = useState([])
    const [image, setImage] = useState({})
    const [userCocktailImage, setUserCocktailImage] = useState("")
    const [currentCocktailTypeObj, setCurrentCocktailTypeObj] = useState({
        typeId: 0,
        cocktailId: 0,
        type: {
          name: ""
        }
      })
    const [currentCocktailTypesArray, setCurrentCocktailTypesArray] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState({
        ingredientId: 0,
        volume: 0,
        ingredient: {
          id: 0,
          name: "",
          ingredientTypeId: 0
        }})
    const [cocktail, setCocktail] = useState({
        id: 0,
        name: "",
        image: "",
        userId: 0,
        methodId: 0,
        notes: "",
        dateCompleted: 0,
        method: {
          id: 0,
          name: ""
        }
      })
        
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
        
    //initial fetch of data on initial render
	useEffect(()=>{
		fetch(`http://localhost:8088/ingredients?_expand=ingredientType`)
		.then(res=>res.json())
		.then(setIngredients)

        fetch(`http://localhost:8088/types`)
        .then(res=>res.json())
        .then(setTypes)
        
        fetch(`http://localhost:8088/ingredientTypes`)
        .then(res=>res.json())
        .then(setIngredientTypes)

        fetch(`http://localhost:8088/methods`)
        .then(res=>res.json())
        .then(setMethods)

        fetch(`http://localhost:8088/cocktails?id=${cocktailId}&_expand=method`)
        .then(res=>res.json())
        .then((res)=>
            {setCocktail(res[0])
            setUserCocktailImage(res[0].image)})
        
        fetch(`http://localhost:8088/cocktailTypes?cocktailId=${cocktailId}&_expand=type`)
        .then(res=>res.json())
        .then(setCurrentCocktailTypesArray)

        fetch(`http://localhost:8088/cocktailIngredients?cocktailId=${cocktailId}&_expand=ingredient`)
        .then(res=>res.json())
        .then(setCurrentCocktailIngredients)

	}, [])


    //filter the ingredients by type
useEffect(()=>{
    fetch(`http://localhost:8088/ingredients?id=${currentIngredient.ingredientId}`)
    .then(res=>res.json())
    .then(setFilteredIngredientTypes)
}, [currentIngredient.ingredientId])

    return <section className={`componentContainer mybar ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            <div className="thebuild">
            <h2>Edit Your Cocktail</h2>
                <form>
                    <br/>
                    <br/>

                    {/* WILL NEED PROPS */}
                    <EditNameAndType 
                    cocktail={cocktail} 
                    setCocktail={setCocktail}
                    currentCocktailTypeObj={currentCocktailTypeObj}
                    currentCocktailTypesArray={currentCocktailTypesArray}
                    setCurrentCocktailTypeObj={setCurrentCocktailTypeObj}
                    setCurrentCocktailTypesArray={setCurrentCocktailTypesArray}
                    types={types}
                    theme={theme}
                    />

                    <EditIngredients 
                    currentIngredient={currentIngredient}
                    setCurrentIngredient={setCurrentIngredient}
                    ingredients={ingredients}
                    setFilteredIngredients={setFilteredIngredients}
                    ingredientTypes={ingredientTypes}
                    filteredIngredients={filteredIngredients}
                    currentCocktailIngredients={currentCocktailIngredients}
                    setCurrentCocktailIngredients={setCurrentCocktailIngredients}
                    theme={theme}
                    />

                    <EditMethods
                    cocktail={cocktail}
                    setCocktail={setCocktail}
                    methods={methods}
                    theme={theme}/>

                    <EditPicture
                    setImage={setImage}
                    theme={theme}
                    cocktail={cocktail} />
                    

                    <EditNotes 
                    theme={theme}
                    cocktail={cocktail}
                    setCocktail={setCocktail}/>

                    <EditSubmitButton 
                    image={image}
                    cocktail={cocktail}
                    setCocktail={setCocktail}
                    currentCocktailIngredients={currentCocktailIngredients}
                    currentCocktailTypesArray={currentCocktailTypesArray}
                    userCocktailImage={userCocktailImage} />
                </form>
            </div>
            <div className="theRecipe">
                <EditRecipe 
                cocktail={cocktail}
                currentCocktailTypesArray={currentCocktailTypesArray}
                theme={theme}
                setCurrentCocktailTypesArray={setCurrentCocktailTypesArray}
                currentCocktailIngredients={currentCocktailIngredients}
                setCurrentCocktailIngredients={setCurrentCocktailIngredients}
                cocktailId={cocktailId}/>
            </div>
            
        </section>
}

