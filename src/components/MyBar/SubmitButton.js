import Axios from 'axios'
import { useEffect, useState } from 'react'
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

    // const postFunction = async (formData) => {
    //     return await Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
    // }

    /* Promise Functions */
    const createIngredientsPromise = (ingredientObj) => {
        fetch("http://localhost:8088/cocktailIngredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredientObj)})
        .then(res=>res.json())
    }
    
    const createTypesPromise = (typeObj) => {
        fetch("http://localhost:8088/cocktailTypes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(typeObj)})
        .then(res=>res.json())
    }

    /* POST Function */
    const post = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "klbtjzwi")

        if(cocktail.notes.toLowerCase().includes("olive")||cocktail.notes.toLowerCase().includes("olives")){
            localStorage.removeItem("roebucks_user", { replace : true })
                            
            fetch(`http://localhost:8088/users?id=${localUserObj.id}`, {method: "DELETE"})
            .then(res=>res.json())
            .then(()=>{
                //setTimeOut?
                window.alert("This is an olive-free zone. You were warned... Your account has been deleted.")
                navigate("/")
            })

        }else{
             Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
                .then((res)=>{
                setTimeout(20000)
                    const urlString = res.data.url
                    const cocktailCopy = {...cocktail}
                    cocktailCopy.userId = localUserObj.id
                    cocktailCopy.image = urlString
                    cocktailCopy.dateCompleted=Date.now()
                    delete cocktailCopy.methodName
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
                    currentCocktailIngredients.forEach(ingredient=> delete ingredient["name"])
                    const finalIngredientArray = currentCocktailIngredients.map((ingredient)=>{return ({...ingredient, cocktailId: cocktailResponseId})}) //adding cocktail foreign key from response
                    
                    currentCocktailTypesArray.forEach(type=> delete type["name"])
                    const finalTypeArray = currentCocktailTypesArray.map((type)=>{return ({...type, cocktailId: cocktailResponseId})}) //adding cocktail foreign key from response
                    Promise.all(finalIngredientArray.map(ingredient=>createIngredientsPromise(ingredient)))
                    Promise.all(finalTypeArray.map(type=>createTypesPromise(type)))

                    return cocktailResponseId
                })
                .then((res)=>{
                    navigate(`/mybar/${res}/view`)
            })
            })
            }
        }
   
    return <button 
            className="btn" 
            type="Submit"
            onClick={(e)=>{
                post(e)
            }}>Submit
            </button>
    
}