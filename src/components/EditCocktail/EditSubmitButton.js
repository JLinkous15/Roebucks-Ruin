import Axios from 'axios'
import { useNavigate } from "react-router-dom"

export const EditSubmitButton = (
    {
        image, 
        cocktail, 
        setCocktail, 
        currentCocktailIngredients, 
        currentCocktailTypesArray
    }) => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
 
    /* Post Promise Functions */
    const createIngredientsPostPromise = (ingredientObj) => {
        fetch("http://localhost:8088/cocktailIngredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredientObj)})  
    }
    
    const createTypesPostPromise = (typeObj) => {
        fetch("http://localhost:8088/cocktailTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(typeObj)})    
        }

        /* Put Promise Functions */
    const createIngredientsPutPromise = (ingredientObj) => {
        fetch(`http://localhost:8088/cocktailIngredients/${ingredientObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredientObj)})  
        }
        
        const createTypesPutPromise = (typeObj) => {
            fetch(`http://localhost:8088/cocktailTypes/${typeObj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(typeObj)})
            }

    /* POST Function */
    const post = (e) => {
        e.preventDefault()
        
        if(cocktail.notes.toLowerCase().includes("olive")||cocktail.notes.toLowerCase().includes("olives")){
            
            fetch(`http://localhost:8088/users?id=${localUserObj.id}`, {method: "DELETE"})
            localStorage.removeItem("roebucks_user", { replace : true })
            navigate("/")
            window.alert("This is an olive-free zone. You were warned... Your account has been deleted.")
        }else if(image.name){
            const formData = new FormData()
            formData.append("file", image)
            formData.append("upload_preset", "klbtjzwi")

            Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
            .then((res)=>{
                
                const urlString = res.data.url
                const cocktailCopy = {...cocktail}
                cocktailCopy.image = urlString
                delete cocktailCopy.method
                setCocktail(cocktailCopy)
                
                return cocktailCopy}
                )
                .then((cocktail)=>{
                fetch(`http://localhost:8088/cocktails/${cocktail.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(cocktail)})
                    .then(response=>response.json())
                    .then(response=>{
                        const cocktailResponseId = response.id
                        
                        currentCocktailIngredients.forEach(thisIngredient=> delete thisIngredient.ingredient)
                        const finalIngredientArray = currentCocktailIngredients.map((ingredient)=>{return ({...ingredient, cocktailId: cocktailResponseId})}) 
                        
                        currentCocktailTypesArray.forEach(type=> delete type["name"])
                        const finalTypeArray = currentCocktailTypesArray.map((type)=>{return ({...type, cocktailId: cocktailResponseId})}) 
                        
                        //if ingredient/type exists, use a put. else, use a post. This will probably be within the function body of the .map
                        Promise.all(finalIngredientArray.map(ingredient=>{
                            if(ingredient.id){
                                return createIngredientsPutPromise(ingredient)
                            }else{
                                return createIngredientsPostPromise(ingredient)
                            }
                        }))
                        
                        Promise.all(finalTypeArray.map(type=>{
                            if(type.id){
                                return createTypesPutPromise(type)
                            }else{
                                return createTypesPostPromise(type)
                            }}))
                            
                            return cocktailResponseId
                        })
                        .then(res=>setTimeout(()=>navigate(`/mybar/${res}/view`),3000)
                        )})
                    }else{
                        const cocktailCopy = {...cocktail}
                        delete cocktailCopy.method
                        setCocktail(cocktailCopy)

                        fetch(`http://localhost:8088/cocktails/${cocktail.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cocktailCopy)})
                        .then(response=>response.json())
                        .then(response=>{
                            const cocktailResponseId = response.id
                            
                            currentCocktailIngredients.forEach(thisIngredient=> delete thisIngredient.ingredient)
                            const finalIngredientArray = currentCocktailIngredients.map((ingredient)=>{return ({...ingredient, cocktailId: cocktailResponseId})}) 
                            
                            currentCocktailTypesArray.forEach(cocktailType=> delete cocktailType.type)
                            const finalTypeArray = currentCocktailTypesArray.map((type)=>{return ({...type, cocktailId: cocktailResponseId})}) 
                            
                            //if ingredient/type exists, use a put. else, use a post. This will probably be within the function body of the .map
                            Promise.all(finalIngredientArray.map(ingredient=>{
                                if(ingredient.id){
                                    return createIngredientsPutPromise(ingredient)
                                }else{
                                    return createIngredientsPostPromise(ingredient)
                                }
                            }))
                            
                            Promise.all(finalTypeArray.map(type=>{
                                if(type.id){
                                    return createTypesPutPromise(type)
                                }else{
                                    return createTypesPostPromise(type)
                                }}))
                                
                                return cocktailResponseId
                            })
                            .then(res=>{return setTimeout(()=>navigate(`/mybar/${res}/view`),3000)}
                            )
                    }
                    }

    return <>
            <button 
                className="btn" 
                type="Submit"
                onClick={(e)=>{
                    post(e)
                }}>Edit
            </button>
            <button 
                className="btn" 
                type="Submit"
                onClick={(e)=>{
                    e.preventDefault()
                }}>Delete
            </button>
            </>
    
}