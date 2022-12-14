import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

export const EditSubmitButton = (
    {
        image, 
        cocktail, 
        setCocktail, 
        currentCocktailIngredients, 
        userCocktailIngredientsArray,
        currentCocktailTypesArray,
        userCocktailTypesArray,
        userCocktailImage
    }) => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
    const [allCocktailTypes, setAllCocktailTypes] = useState([])
    const [allCocktailIngredients, setAllCocktailIngredients] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktailTypes`)
        .then(res=>res.json())
        .then(setAllCocktailTypes)

        fetch(`http://localhost:8088/cocktailIngredients`)
        .then(res=>res.json())
        .then(setAllCocktailIngredients)
    }, [])

    /* Post Promise Functions */
    const createIngredientsPostPromise = (ingredientObj) => {
        fetch("http://localhost:8088/cocktailIngredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredientObj)})
        .then(res=>res.json())
    }
    
    const createTypesPostPromise = (typeObj) => {
        fetch("http://localhost:8088/cocktailTypes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(typeObj)})
        .then(res=>res.json())
    }
    /* Put Promise Functions */
    const createIngredientsPutPromise = (ingredientObj) => {
        fetch(`http://localhost:8088/cocktailIngredients/${ingredientObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredientObj)})
        .then(res=>res.json())
    }
    
    const createTypesPutPromise = (typeObj) => {
        fetch(`http://localhost:8088/cocktailTypes/${typeObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(typeObj)})
        .then(res=>res.json())
    }
    /* Delete Promise Functions */
    const createIngredientsDeletePromise = (ingredientObj) => {
        fetch(`http://localhost:8088/cocktailIngredients/${ingredientObj.id}`, {method: "DELETE"})}
    
    const createTypesDeletePromise = (typeObj) => {
        fetch(`http://localhost:8088/cocktailTypes/${typeObj.id}`, {method: "DELETE"})}

    /* POST Function */
    const post = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "klbtjzwi")

        if(cocktail.notes.toLowerCase().includes("olive")||cocktail.notes.toLowerCase().includes("olives")){
            localStorage.removeItem("roebucks_user", { replace : true })
                            
            fetch(`http://localhost:8088/users?id=${localUserObj.id}`, {method: "DELETE"})
            .then(()=>{
                //setTimeOut?
                window.alert("This is an olive-free zone. You were warned... Your account has been deleted.")
                setTimeout(50000)
                navigate("/")
            })

        }

        if(!userCocktailImage){
            Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
            .then((res)=>{
            setTimeout(20000)
            const urlString = res.data.url
            const cocktailCopy = {...cocktail}
            cocktailCopy.image = urlString
            cocktailCopy.dateCompleted=Date.now()
            delete cocktailCopy.methodName
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
                        if(allCocktailIngredients.includes(ingredient)){
                            createIngredientsPutPromise(ingredient)
                        }else if(allCocktailIngredients.includes(ingredient)){
                            createIngredientsPostPromise(ingredient)
                        }
                        }))

                    Promise.all(finalTypeArray.map(type=>createTypesPutPromise(type)))

                    return cocktailResponseId
                })
            .then((res)=>{
                navigate(`/mybar/${res}/view`)
        })
        })
        }else{
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
                const finalPostIngredientArray = finalIngredientArray.filter(finalIngredient=>!allCocktailIngredients.includes(finalIngredient))
                const finalPutIngredientArray = finalIngredientArray.filter(finalIngredient=>allCocktailIngredients.includes(finalIngredient))
                const finalPostTypeArray = finalTypeArray.filter(finalIngredient=>!allCocktailTypes.includes(finalIngredient))
                const finalPutTypeArray = finalTypeArray.filter(finalIngredient=>allCocktailTypes.includes(finalIngredient))

                Promise.all(finalPostIngredientArray.map(ingredient=>createIngredientsPostPromise(ingredient)))
                Promise.all(finalPutIngredientArray.map(ingredient=>createIngredientsPutPromise(ingredient)))
                Promise.all(finalPostTypeArray.map(type=>createTypesPostPromise(type)))
                Promise.all(finalPutTypeArray.map(type=>createTypesPutPromise(type)))

                return cocktailResponseId
            })
            .then((res)=>{
                    navigate(`/mybar/${res}/view`)
            })
            
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
                    
                }}>Delete
            </button>
            </>
    
}