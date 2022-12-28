export const Methods = ({cocktail,setCocktail,methods,theme}) => {

    return (<>
                <label htmlFor="methodSelect">Method of Preparation?</label>
                <fieldset>
                    <select 
                        id="methodSelect"
                        className={theme?"dark":"light"}
                        onChange={(e)=>{
                            const copy = {...cocktail}
                            const [methodId, methodName] = e.target.value.split("--")
                            copy.methodId = parseInt(methodId)
                            copy.method.name = methodName
                            setCocktail(copy)
                        }}>
                        <option value="0">Shaken or Stirred?</option>
                            {methods.map((method)=>{
                                return <option key={method.id} value={`${method.id}--${method.name}`}>{method.name}</option> 
                            })}
                    </select>
                </fieldset>
            </>
            )
}