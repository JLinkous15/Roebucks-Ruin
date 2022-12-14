export const EditIngredients = ( {
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
                    ingredientId: 0,
                    volume: 0,
                    ingredient: {
                      id: 0,
                      name: "",
                      ingredientTypeId: 0
                    }})
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
                    <input 
                    type="number"
                    step="0.125"
                    max="4"
                    min="0"
                    id="volume" 
                    className={theme?"dark":"light"} 
                    placeholder="number of ounces/dashes"
                    onChange={(e)=>{
                        const copy = {...currentIngredient}
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
                        const value = parseInt(e.target.value)
                        const filteredCopy = copyIngredients.filter((ingredient)=>ingredient?.ingredientType?.id===value)
                        console.log(filteredCopy)
                        setFilteredIngredients(filteredCopy)

                        const copyIngredient = {...currentIngredient}
                        copyIngredient.ingredient.ingredientTypeId = value
                        setCurrentIngredient(copyIngredient)
                    }}>
                        <option value="0">What type of ingredient?</option>
                        {ingredientTypes.map((type, index)=>{
                            return <option 
                            key={index} 
                            value={type.id}>
                                    {type.name}
                                </option> 
                            })}
                    </select>

                {/* INGREDIENTS */}

                    <select
                    id="ingredientSelect"
                    className={theme?"dark":"light"}
                    onChange={(e)=>{
                        const copy = {...currentIngredient}
                        const [targetId, targetName] = e.target.value.split("--")
                        copy.ingredientId = parseInt(targetId)
                        copy.ingredient.name = targetName
                        setCurrentIngredient(copy)
                    }}>
                    <option value="0">Ingredient Name?</option>
                        {filteredIngredients.map((ingredient, index)=>{
                            return <option key={index} name={ingredient.name} value={`${ingredient.id}--${ingredient.name}`}>{ingredient.name}</option> 
                        })}
                    </select>
                    
                {/* BUTTON */}

                    <button className={`btn ${theme?"dark":"light"}`}
                    onClick={(event)=>
                        handleIngredientButton(event)
                    }>Add to Cocktail</button>
                </fieldset>
            </>)
}