import Axios from 'axios'
import { useNavigate } from "react-router-dom"

export const SubmitButton = (
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

    /* Promise Functions */
    const createIngredientsPromise = (ingredientObj) => {
        fetch("http://localhost:8088/cocktailIngredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredientObj)})
    }
    
    const createTypesPromise = (typeObj) => {
        fetch("http://localhost:8088/cocktailTypes", {
        method: "POST",
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
        }else{
            const formData = new FormData()
            formData.append("file", image)
            formData.append("upload_preset", "klbtjzwi")

            Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
            .then((res)=>{

                const urlString = res.data.url
                const cocktailCopy = {...cocktail}
                cocktailCopy.userId = localUserObj.id
                cocktailCopy.image = urlString
                cocktailCopy.dateCompleted=Date.now()
                delete cocktailCopy.method
                setCocktail(cocktailCopy)
                
                return cocktailCopy}
            )
            .then((cocktail)=>{
                fetch("http://localhost:8088/cocktails", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(cocktail)})
                .then(response=>response.json())
                .then(response=>{
                    const cocktailResponseId = response.id
                    currentCocktailIngredients.forEach(thisIngredient=> delete thisIngredient.ingredient)
                    const finalIngredientArray = currentCocktailIngredients.map((ingredient)=>{return ({...ingredient, cocktailId: cocktailResponseId})}) //adding cocktail foreign key from response
                    
                    currentCocktailTypesArray.forEach(type=> delete type.name)
                    const finalTypeArray = currentCocktailTypesArray.map((type)=>{return ({...type, cocktailId: cocktailResponseId})}) //adding cocktail foreign key from response
                    Promise.all(finalIngredientArray.map(ingredient=>createIngredientsPromise(ingredient)))
                    Promise.all(finalTypeArray.map(type=>createTypesPromise(type)))

                    return cocktailResponseId
                })
                .then((res)=>{
                    setTimeout(()=>navigate(`/mybar/${res}/view`), 2500)
        })
        })}
        }
            
    
    return <button 
            className="btn" 
            type="Submit"
            onClick={(e)=>{
                post(e)
            }}>Submit
            </button>
    
}