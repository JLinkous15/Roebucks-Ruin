export const Recipe = (
                        {
                        cocktail,
                        currentCocktailTypesArray,
                        theme,
                        setCurrentCocktailTypesArray,
                        currentCocktailIngredients,
                        setCurrentCocktailIngredients
                        }) => {
   
    return <>
    
                <ul id="recipeList">
                    
                    <li>{cocktail.name}</li>

                    {currentCocktailTypesArray.map((type, index)=><li key={index}>{type.name}
                        <button className={`btn ${theme?"dark":"light"}`}
                        onClick={()=>{
                            const copy = [...currentCocktailTypesArray]
                            copy.splice(index, 1)
                            setCurrentCocktailTypesArray(copy)
                        }}>Delete</button></li>)}

                    {currentCocktailIngredients.map((cocktail, index)=>
                        <li key={index} id={index}>{cocktail.volume} {cocktail.ingredientTypeId===3? "dashes":"ounces"} {cocktail.name}
                            <button className={`btn ${theme?"dark":"light"}`}
                            onClick={(e)=>{
                                const copy = [...currentCocktailIngredients]
                                copy.splice(index, 1)
                                setCurrentCocktailIngredients(copy)
                            }}>Delete</button></li>
                    )}
                    
                    <li>{cocktail.methodName}</li>
                </ul>
                <div id="previewImage"></div>
                {cocktail.notes?
                    <p className="notes">{cocktail.notes}</p>:""}
                
            
    </>
}