export const EditNameAndType = ( 
    {
        cocktail, 
        setCocktail, 
        currentCocktailTypeObj, 
        currentCocktailTypesArray, 
        setCurrentCocktailTypeObj, 
        setCurrentCocktailTypesArray, 
        types, 
        theme
        } ) => {
    return (<>
                <label htmlFor="name-fieldset">Describe your cocktail.</label>
                <fieldset className="fieldset_post">
                {/* COCKTAIL NAME*/}
                        <input 
                        required
                        type="text" 
                        placeholder="Name your Cocktail"
                        defaultValue={cocktail.name} 
                        className={theme?"dark":"light"}
                        onChange={(e)=>{
                            const copy = {...cocktail}
                            copy.name=e.target.value
                            setCocktail(copy)
                        }}/>
                {/* COCKTAIL TYPE */}
                        <select
                        required
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
            </>
    )
}