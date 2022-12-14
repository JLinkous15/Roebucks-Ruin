import { useParams } from "react-router-dom"

export const EditRecipe = (
                        {
                        cocktail,
                        currentCocktailTypesArray,
                        theme,
                        setCurrentCocktailTypesArray,
                        currentCocktailIngredients,
                        setCurrentCocktailIngredients,
                        userCocktailTypesArray,
                        setUserCocktailTypesArray,
                        cocktailId
                        }) => {
    
    const deleteUserCocktailTypesArrayElement = (e) =>{
        e.preventDefault()
        const typeId = parseInt(e.target.id)

        fetch(`http://localhost:8088/cocktailTypes/${typeId}`, {method: "DELETE"})
        .then(()=>{
            fetch(`http://localhost:8088/cocktailTypes?cocktailId=${cocktailId}&_expand=type`)
            .then(res=>res.json())
            .then(setUserCocktailTypesArray)
        })
        
    }
console.log(currentCocktailIngredients)
    return <>
    
                <ul id="recipeList">
                    
                    <li style={{fontStyle: "bold", fontSize: "20px"}} 
                        value={cocktail.name}
                    >
                        {cocktail.name}
                    </li>

                    {userCocktailTypesArray
                        ?userCocktailTypesArray.map((cocktailType, index)=>{
                        return <li key={index} id={cocktailType.id}>{cocktailType?.type?.name}
                            <button 
                            className={`btn ${theme?"dark":"light"}`}
                            onClick={(e)=>deleteUserCocktailTypesArrayElement(e)}
                            >Delete</button>
                        </li>})
                        :""
                    }

                    {currentCocktailTypesArray.map((type, index)=><li key={index}>{type.name}
                        <button 
                        className={`btn ${theme?"dark":"light"}`}
                        onClick={()=>{
                            const copy = [...currentCocktailTypesArray]
                            copy.splice(index, 1)
                            setCurrentCocktailTypesArray(copy)
                        }}>Delete</button></li>)}

                    {currentCocktailIngredients.map((cocktailIngredient, index)=>
                        <li key={index} id={index}>{cocktailIngredient.volume} {cocktailIngredient.ingredient.ingredientTypeId===3? "dashes":"ounces"} {cocktailIngredient.ingredient.name}
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
                    
                    {cocktail.methodName
                        ?<li>{cocktail?.methodName}</li>
                        :<li>{cocktail?.method?.name}</li>}
                </ul>
                <div id="previewImage">
                    <img id="previewImage_img" src={cocktail.image} alt="cocktail image"/>
                </div>
                {cocktail.notes?
                    <p className="notes">{cocktail.notes}</p>:""}
                
            
    </>
}