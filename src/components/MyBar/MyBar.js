import { useEffect, useState } from "react"
import "../../index.css"
import "./MyBar.css"
import { NameAndType } from "./NameAndType"
import { Ingredients } from "./Ingredients"
import { Methods } from "./Methods"
import { Picture } from "./Picture"
import { Notes } from "./Notes"
import { Recipe } from "./Recipe"
import { SubmitButton } from "./SubmitButton"

export const MyBar = ({theme, setHamburger}) => {
    const [types, setTypes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([]) 
    const [ingredientTypes, setIngredientTypes] = useState([])
    const [filteredIngredientTypes, setFilteredIngredientTypes] = useState([])
    const [methods, setMethods] = useState([])
    const [currentCocktailIngredients, setCurrentCocktailIngredients] = useState([])
    const [image, setImage] = useState({})
    const [currentCocktailTypeObj, setCurrentCocktailTypeObj] = useState({
        typeId: 0,
        name:""
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
	}, [])

    //filter the ingredients by type
useEffect(()=>{
    fetch(`http://localhost:8088/ingredients?id=${currentIngredient.ingredientId}`)
    .then(res=>res.json())
    .then(setFilteredIngredientTypes)
}, [currentIngredient.ingredientId])

console.log(currentCocktailTypesArray)
    return <section className={`mybar ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>setHamburger(true)}>
            <div className="thebuild">
            <h2>Create a Cocktail</h2>
                <form>
                    <br/>
                    <br/>

                    {/* WILL NEED PROPS */}
                    <NameAndType 
                    cocktail={cocktail} 
                    setCocktail={setCocktail}
                    currentCocktailTypeObj={currentCocktailTypeObj}
                    currentCocktailTypesArray={currentCocktailTypesArray}
                    setCurrentCocktailTypeObj={setCurrentCocktailTypeObj}
                    setCurrentCocktailTypesArray={setCurrentCocktailTypesArray}
                    types={types}
                    theme={theme}
                    />

                    <Ingredients 
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

                    <Methods
                    cocktail={cocktail}
                    setCocktail={setCocktail}
                    methods={methods}
                    theme={theme}/>

                    <Picture
                    setImage={setImage}
                    theme={theme} />
                    

                    <Notes 
                    theme={theme}
                    cocktail={cocktail}
                    setCocktail={setCocktail}/>

                    <SubmitButton 
                    image={image}
                    cocktail={cocktail}
                    setCocktail={setCocktail}
                    currentCocktailIngredients={currentCocktailIngredients}
                    currentCocktailTypesArray={currentCocktailTypesArray}/>
                </form>
            </div>
            <div className="theRecipe">
                <Recipe 
                cocktail={cocktail}
                currentCocktailTypesArray={currentCocktailTypesArray}
                theme={theme}
                setCurrentCocktailTypesArray={setCurrentCocktailTypesArray}
                currentCocktailIngredients={currentCocktailIngredients}
                setCurrentCocktailIngredients={setCurrentCocktailIngredients}
                image={image}
                setImage={setImage}/>
            </div>
            
        </section>
}

