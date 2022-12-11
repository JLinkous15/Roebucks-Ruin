import { useEffect, useState } from "react"
import "../../index.css"
import "./MyBar.css"
import { NameAndType } from "./NameAndType"
import { Ingredients } from "./Ingredients"
import { Methods } from "./Methods"

export const MyBar = ({theme}) => {
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

    return <section className={`mybar ${theme?"componentContainer light":"componentContainer dark"}`}>
            <div className="thebuild">
            <h2>Create a Cocktail</h2>
                <form onSubmit={submitForm}>
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
                    {cocktail.methodId?<li>{cocktail.methodName}</li>:""}
                </ul>
                <div id="previewImage"></div>
                {cocktail.notes?
                    <p className="notes">{cocktail.notes}</p>:""}
                
            </div>
        </section>
}

