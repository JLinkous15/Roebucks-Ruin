import { useEffect, useState } from "react"
import "../../index.css"
import "./MyBar.css"

/*The "add to cocktail" button adds all info for the cocktailIngredients table to an array to be posted upon submit.
The "submit cocktail" button posts all cocktailIngredients using .forEach() array method method 
The Cocktail table will be updated using the localStorage user, the users table, and certain inputs below, including name, image, date, etc.*/
export const MyBar = ({theme}) => {
    const [types, setTypes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([]) 
    const [ingredientTypes, setIngredientTypes] = useState([])
    const [filteredIngredientTypes, setFilteredIngredientTypes] = useState([])
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
	}, [])

    //filter the ingredients by type
useEffect(()=>{
    fetch(`http://localhost:8088/ingredients?id=${currentIngredient.ingredientTypeId}`)
    .then(res=>res.json())
    .then(setFilteredIngredientTypes)
}, [currentIngredient.ingredientTypeId])


const imageHandler = (copy) => {
    setImage(copy)
    if(document.getElementById("previewImage_img")){
        document.getElementById("previewImage_img").remove()
    }
    const fileReader = new FileReader()    
    fileReader.readAsDataURL(copy)

    fileReader.addEventListener("load",
    ()=>{
        const url = fileReader.result
        const img = new Image()
        img.src = url
        img.id = "previewImage_img"
        const div = document.getElementById("previewImage")
        div.appendChild(img)
        
    }
)}
    


//adding ingredient object to an array of ingredients and resetting the ingredient object
const handleIngredientButton = (e) => {
    e.preventDefault()

    const copyIngredientsArray = [...currentCocktailIngredients]
    const copyIngredient = {...currentIngredient}
    copyIngredientsArray.push(copyIngredient)
    setCurrentCocktailIngredients(copyIngredientsArray)
    setCurrentIngredient({
        name: "",
        volume: 0.00,
        ingredientTypeId: 0
        })
    document.getElementById(`volume`).value = "number of ounces/dashes"
    document.getElementById(`ingredientFilterSelect`).value = "0"
    document.getElementById(`ingredientSelect`).value = "0"
}

const uploadImage = (image) => {
    
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "klbtjzwi")
    fetch(`https//api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, {
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body: formData
    })
    .then(res=>console.log(res))
}

const submitForm = (e) => {
    e.preventDefault()

}

console.log(currentCocktailIngredients)

    return <section className={`mybar ${theme?"componentContainer light":"componentContainer dark"}`}>
            <div className="thebuild">
            <h2>Create a Cocktail</h2>
                <form onSubmit={submitForm}>
                    <br/>
                    <br/>
                    <label htmlFor="name-fieldset">Describe your cocktail.</label>
                    <fieldset className="fieldset_post">
                    {/* COCKTAIL NAME*/}
                            <input type="text" 
                            placeholder="Name your Cocktail" 
                            className={theme?"dark":"light"}
                            onChange={(e)=>{
                                const copy = {...cocktail}
                                copy.name=e.target.value
                                setCocktail(copy)
                            }}/>
                    {/* COCKTAIL TYPE */}
                            <select 
                            className={theme?"dark":"light"}
                            onChange={(e)=>{
                                const copyArray = [...currentCocktailTypesArray]
                                const copyObj = {...currentCocktailTypeObj}
                                const [valueTypeId, valueName] = e.target.value.split("--")
                                copyObj.typeId = parseInt(valueTypeId)
                                copyObj.name = valueName
                                copyArray.push(copyObj)
                                setCurrentCocktailTypeObj({
                                    typeId: 0,
                                    cocktailId: 0,
                                    name:""
                                  })
                                setCurrentCocktailTypesArray(copyArray)
                            }}>
                                <option value="0">Type of Cocktail?</option>
                                    {types.map(type=>{
                                        return <option key={type.id} value={`${type.id}--${type.name}`}>{type.name}
                                </option>})}
                            </select>
                    </fieldset>

                    {/* INGREDIENTS */}
                    <label htmlFor="ingredient-fieldset">What are your ingredients?</label>
                    <fieldset className="fieldset_post">
                    {/* VOLUME */}
                        <input type="number"
                        step="0.125"
                        max="4"
                        min="0"
                        id="volume" 
                        className={theme?"dark":"light"} 
                        placeholder="number of ounces/dashes"
                        onChange={(e)=>{
                            const copy = currentIngredient
                            copy.volume = parseFloat(e.target.value)
                            setCurrentIngredient(copy)
                            
                        }}/>
                    {/* SETFILTEREDINGREDIENTS */}
                        <select  
                        id="ingredientFilterSelect"
                        defaultValue={currentIngredient.ingredientTypeId}
                        className={theme?"dark":"light"}
                        onChange={(e)=>{
                            const copyIngredients = [...ingredients]
                            const copyCurrentIngredient = {...currentIngredient}
                            const value = parseInt(e.target.value)
                            const filteredCopy = copyIngredients.filter((ingredient)=> ingredient.id===value)
                            setFilteredIngredients(filteredCopy)
                            copyCurrentIngredient.ingredientTypeId = value
                            copyCurrentIngredient.name=""
                            setCurrentIngredient(copyCurrentIngredient)
                            const ingredient = document.getElementById("ingredientSelect")
                            ingredient.value = "0"
                        }}>
                            <option value="0">What type of ingredient?</option>
                            {ingredientTypes.map((ingredient)=>{
                                return <option 
                                key={ingredient.id} 
                                value={ingredient.id}>
                                        {ingredient.name}
                                    </option> 
                                })}
                        </select>

                    {/* INGREDIENTS */}

                        <select 
                        id="ingredientSelect"
                        className={theme?"dark":"light"}
                        onChange={(e)=>{
                            const value = e.target.value
                            const [nameValue, idValue] = value.split("--")
                            const copy = {...currentIngredient}
                            copy.name = nameValue
                            setCurrentIngredient(copy)
                        }}>
                        <option value="0">Ingredient Name?</option>
                            {filteredIngredients.map((ingredient)=>{
                                return <option key={ingredient.id} value={`${ingredient.name}--${ingredient.id}`}>{ingredient.name}</option> 
                            })}
                        </select>
                        <button className={`btn ${theme?"dark":"light"}`}
                        onClick={(e)=>{
                            handleIngredientButton(e)
                        }
                        }>Add to Cocktail</button>
                    </fieldset>

                    {/* METHODS */}

                    <label htmlFor="methodSelect">Method of Preparation?</label>
                    <fieldset>
                        <select 
                            id="methodSelect"
                            className={theme?"dark":"light"}>
                            <option value="0">Shaken or Stirred?</option>
                                {filteredIngredients.map((ingredient)=>{
                                    return <option key={ingredient.id} value={`${ingredient.name}--${ingredient.id}`}>{ingredient.name}</option> 
                                })}
                        </select>
                    </fieldset>
                    {/* IMAGE */}

                    <label htmlFor="file">Image:</label>
                    <fieldset className="fieldset_post">
                        <input type="file" 
                        id="imageFile" 
                        accept="image/jepg"
                        className={theme?"dark":"light"}
                        onChange={(e)=>{
                            const copy = e.target.files[0]
                            imageHandler(copy) 
                            }}
                        // style={image?{backgroundImage: this.image}:{backgroundImage: "none"}}
                        />
                    </fieldset>

                    {/* NOTES */}

                    <label htmlFor="notes">Notes:</label>
                    <fieldset className="fieldset_post">
                        <textarea 
                        className={theme?"dark":"light"}
                        name="notes"
                        rows="10" 
                        cols="60"
                        placeholder="Additional notes on cocktail production or history."
                        onChange={(e)=>{
                            const cocktailCopy = {...cocktail}
                            cocktailCopy.notes = e.target.value
                            setCocktail(cocktailCopy)
                        }}/>
                        
                    </fieldset>
                    <button className="btn" type="Submit">Submit</button>
                </form>
            </div>

            <div className="theRecipe">
                <ul>
                    {cocktail.name?
                    <li>{cocktail.name}</li>
                    :""}
                    {currentCocktailTypesArray? currentCocktailTypesArray.map((type, index)=><li key={index}>{type.name}<button className={`btn ${theme?"dark":"light"}`}>Delete</button></li>):""}
                    {currentCocktailIngredients.map((cocktail, index)=>{
                        return <li key={`${index}`}>{cocktail.volume} {cocktail.ingredientTypeId===3? "dashes":"ounces"} {cocktail.name}<button className={`btn ${theme?"dark":"light"}`}>Delete</button></li>
                    })}
                </ul>
                <div id="previewImage"></div>
                {cocktail.notes?
                <p className="notes">{cocktail.notes}</p>:""}
                
            </div>
        </section>
}

