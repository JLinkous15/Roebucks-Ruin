import { useEffect, useState } from "react"
import "../../index.css"

/*The "add to cocktail" button adds all info for the cocktailIngredients table to an array to be posted upon submit.
The "submit cocktail" button posts all cocktailIngredients using .forEach() array method method 
The Cocktail table will be updated using the localStorage user, the users table, and certain inputs below, including name, image, date, etc.*/
export const MyBar = ({theme}) => {
    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([])
    const [currentCocktail, setCurrentCocktail] = useState([])
    const [cocktail, setCocktail] = useState({
        name:"",
        type: 0,
        image: "",
        userId: 0,
        searchTags: "",
        notes: "",
        postDate: ""
    })

	useEffect(()=>{
		fetch(`http://localhost:8088/ingredients?_expand=ingredientType`)
		.then(res=>res.json())
		.then(setIngredients)
	}, [])

    //filter the ingredient names by type
useEffect(()=>{

}, [])


 
	
    const formData = new FormData()

    return <section className={theme?"componentContainer light":"componentContainer dark"}>
            <h2>Create a Cocktail</h2>
            <form>
                <fieldset>
                    <input type="text"/>
                    oz
                    <select onChange={(e)=>{
                        /*This should setFilteredIngredients based on primary / forign keys*/}}>
                        <option value="0">What type of ingredient?</option>
                        {ingredients.map((ingredient)=>{
                            return <option key={ingredient.ingredientType.id} value={ingredient?.ingredientType?.id}>{ingredient?.ingredientType?.name}</option> 
                        })}
                    </select>
                    <select>
                    <option value="0">Ingredient Name?</option>
                        {filteredIngredients.map((ingredient)=>{
                            return <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option> 
                        })}
                    </select>
                    <button onClick={()=>{}}className="btn">Add to Cocktail</button>
                </fieldset>
            </form>
        </section>
}

