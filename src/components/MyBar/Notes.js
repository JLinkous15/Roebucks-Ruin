export const Notes = ({theme, setCocktail, cocktail}) => {
    return <>
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
        </>
}