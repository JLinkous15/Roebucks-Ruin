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
        cocktailId: 0,
        name:""
    })
    const [currentCocktailTypesArray, setCurrentCocktailTypesArray] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState({
        name: "",
        volume: 0,
        ingredientTypeId: 0
      })
    const [cocktail, setCocktail] = useState({
          name:"",
          typeId: 0,
          image: "",
          userId: 0,
          methodId: 0,
          methodName: "",
          searchTags: "",
          notes: "",
          postDate: ""
        })
        
        
    //initial fetch of data on initial render
	useEffect(()=>{
		fetch(`http://localhost:8088/ingredients`)
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
    fetch(`http://localhost:8088/ingredients?id=${currentIngredient.ingredientTypeId}`)
    .then(res=>res.json())
    .then(setFilteredIngredientTypes)
}, [currentIngredient.ingredientTypeId])

// const uploadImage = (image) => {
    
//     const formData = new FormData()
//     formData.append("file", image)
//     formData.append("upload_preset", "klbtjzwi")
//     fetch(`https//api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, {
//         method: "POST",
//         headers:{
//             "content-type":"application/json"
//         },
//         body: formData
//     })
//     .then(res=>console.log(res))
// }

// const submitForm = (e) => {
//     e.preventDefault()

// }

    return <section className={`mybar ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)}}>
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

                    <SubmitButton />
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

