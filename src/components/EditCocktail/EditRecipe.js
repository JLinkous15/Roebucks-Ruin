import { useParams } from "react-router-dom"

export const EditRecipe = (
                        {
                        cocktail,
                        currentCocktailTypesArray,
                        theme,
                        setCurrentCocktailTypesArray,
                        currentCocktailIngredients,
                        setCurrentCocktailIngredients
                        }) => {
    console.log(currentCocktailTypesArray)
    return <>
    
                <ul id="recipeList">
                    
                    <li style={{fontStyle: "bold", fontSize: "20px"}} 
                        value={cocktail.name}
                    >
                        {cocktail.name}
                    </li>

                    {currentCocktailTypesArray.map((cocktailType, index)=><li key={index}>{cocktailType?.type?.name}
                        <button 
                        className={`btn ${theme?"dark":"light"}`}
                        onClick={()=>{
                            if(cocktailType.id){
                                fetch(`http://localhost:8088/cocktailTypes/${cocktailType.id}`, {method: "DELETE"})
                            }
                            const copy = [...currentCocktailTypesArray]
                            copy.splice(index, 1)
                            setCurrentCocktailTypesArray(copy)
                        }}>Delete</button></li>)}

                    {currentCocktailIngredients.map((cocktailIngredient, index)=>
                        <li key={index} id={index}>{cocktailIngredient.volume} {cocktailIngredient.ingredient.ingredientTypeId===3? "dashes":"ounces"} {cocktailIngredient?.ingredient?.name}
                            <button className={`btn ${theme?"dark":"light"}`}
                            onClick={(e)=>{
                                if(cocktailIngredient.id){
                                fetch(`http://localhost:8088/cocktailIngredients/${cocktailIngredient.id}`, {method: "DELETE"})
                                }
                                const copy = [...currentCocktailIngredients]
                                copy.splice(index, 1)
                                setCurrentCocktailIngredients(copy)
                                
                            }}>Delete</button></li>
                    )}
                    
                    <li>{cocktail?.method?.name}</li>
                </ul>
                <div id="previewImage">
                    <img id="previewImage_img" src={cocktail.image} alt="cocktail image"/>
                </div>
                {cocktail.notes?
                    <p className="notes">{cocktail.notes}</p>:""}
                
            
    </>
}