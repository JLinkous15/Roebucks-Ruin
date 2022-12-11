export const Ingredients = ( {
    currentIngredient, 
    setCurrentIngredient, 
    ingredients, 
    setFilteredIngredients, 
    ingredientTypes, 
    filteredIngredients, 
    currentCocktailIngredients,
    setCurrentCocktailIngredients, 
    theme} ) => {

const handleIngredientButton = (event) => {
                event.preventDefault()
            
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

    return (
            <>
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
                        const copy = {...currentIngredient}
                        copy.name = value
                        setCurrentIngredient(copy)
                    }}>
                    <option value="0">Ingredient Name?</option>
                        {filteredIngredients.map((ingredient)=>{
                            return <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option> 
                        })}
                    </select>
                    <button className={`btn ${theme?"dark":"light"}`}
                    onClick={(event)=>
                        handleIngredientButton(event)
                    
                    }>Add to Cocktail</button>
                </fieldset>
            </>)
}