export const EditNotes = ({theme, setCocktail, cocktail}) => {
    return <>
        <label htmlFor="notes">Notes:</label>
            <fieldset className="fieldset_post">
                <textarea 
                className={theme?"dark":"light"}
                name="notes"
                rows="10" 
                cols="60"
                defaultValue={cocktail.notes}
                onChange={(e)=>{
                    const cocktailCopy = {...cocktail}
                    cocktailCopy.notes = e.target.value
                    setCocktail(cocktailCopy)
                }}/>
                
            </fieldset>
        </>
}