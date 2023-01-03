import { useEffect, useState } from "react"
import { Pagination } from "../Pagination"
import { CocktailList } from "../MyBar/CocktailList"
import "./Browse.css"

export const Browse = ({theme, setHamburger, setMyBarMenu}) => {
//cocktails
const [cocktails, setCocktails] = useState([])
const [filteredCocktails, setFilteredCocktails] = useState([])
//ingredients and types
const [cocktailTypes, setCocktailTypes] = useState([])
const [cocktailIngredients, setCocktailIngredients] = useState([])
const [spirits, setSpirits] = useState([])
const [users, setUsers] = useState([])
const [types, setTypes] = useState([])
//search parameters
const [searchType, setSearchType] = useState(0)
const [searchSpirit, setSearchSpirit] = useState(0)
const [searchUser, setSearchUser] = useState(0)

//Pagination
const [currentPage, setCurrentPage] = useState(1)
const [cocktailsPerPage, setCocktailsPerPage] = useState(9)

useEffect(()=>{
    fetch(`http://localhost:8088/cocktails?_expand=user`)
    .then(res=>res.json())
    .then(res=>{
        setCocktails(res.reverse())
        setFilteredCocktails(res)
    })

    fetch(`http://localhost:8088/cocktailTypes?_expand=cocktail`)
    .then(res=>res.json())
    .then(res=>setCocktailTypes(res))

    fetch(`http://localhost:8088/cocktailIngredients?_expand=ingredient`)
    .then(res=>res.json())
    .then(res=>setCocktailIngredients(res))

    fetch(`http://localhost:8088/ingredients?ingredientTypeId=1`)
    .then(res=>res.json())
    .then(res=>setSpirits(res))

    fetch(`http://localhost:8088/types`)
    .then(res=>res.json())
    .then(res=>setTypes(res))

    fetch(`http://localhost:8088/users`)
    .then(res=>res.json())
    .then(res=>setUsers(res))
}, [])

//this needs to be 1 long use effect that listens for changes in all 3 search fields, pushing objects to a fresh list each time.
//logically, every change in state needs to affect the full list of cocktails. As such, filtering that particular list is the solution.
//the hard part will be finding the tests to filter.
useEffect(()=>{
    let cocktailsCopy = [...cocktails]
    const cocktailTypesCopy = [...cocktailTypes]
    const ingredientsCopy = [...cocktailIngredients]
    let cocktailList = []
    if(searchUser){
        cocktailsCopy = cocktailsCopy.filter(cocktail=>{
            return cocktail.userId===searchUser
        })
    }
    if(searchSpirit){
        //filter ingredients based on ingredientId
        const filteredSpirit = ingredientsCopy.filter(spirit => {
            return spirit.ingredientId === searchSpirit
        })
        //filter cocktailsCopy using cocktailId of filteredIngredients
        if(!cocktailList.includes()){}
        cocktailsCopy = cocktailsCopy.filter(cocktail => {
            return filteredSpirit.some(spirit => {
                return spirit.cocktailId === cocktail.id
            })
        })
    }
    //filtering type will have a very similar solution to filtering ingredients
    if(searchType){
        //filter types based on typeId
        const filteredTypes = cocktailTypesCopy.filter(type => {
            return type.typeId === searchType
        })
        //filter cocktailsCopy using cocktailId of filteredTypes
        if(!cocktailList.includes()){}
        cocktailsCopy = cocktailsCopy.filter(cocktail => {
            return filteredTypes.some(type => {
                return type.cocktailId === cocktail.id
            })
        })
    }
    setFilteredCocktails(cocktailsCopy)
}, [searchUser, searchSpirit, searchType])


//current posts via pagination
const indexOfLastPost = currentPage * cocktailsPerPage
const indexOfFirstPost = indexOfLastPost - cocktailsPerPage
const currentCocktails = filteredCocktails.slice(indexOfFirstPost, indexOfLastPost)

//paginate
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
}

    return <section className={`browse componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            <div className="browseSelectors">
                <form>
                    <select 
                    className={theme?"dark":"light"}
                    onChange={(e)=>{
                        const value = parseInt(e.target.value)
                        setSearchType(value)
                    }}>
                        <option value="0">Browse By Type</option>
                        {types.map(type=>{
                            return <option 
                                    value={type.id} 
                                    key={type.id}>
                                        {type.name}
                                    </option>
                        })}
                    </select>
                    <select 
                    className={theme?"dark":"light"}
                    onChange={(e)=>{
                        const value = parseInt(e.target.value)
                        setSearchSpirit(value)
                    }}>
                        <option value="0">Browse By Spirit</option>
                        {spirits.map(spirit=>{
                            return <option
                                    value={spirit.id}
                                    key={spirit.id}>
                                        {spirit.name}
                                    </option>
                        })}
                    </select>
                    <select 
                    className={theme?"dark":"light"}
                    onChange={(e)=>{
                        const value = parseInt(e.target.value)
                            setSearchUser(value)
                    }}>
                        <option value="0">Browse By User</option>
                        {users.map(user=>{
                            return <option
                                    value={user.id}
                                    key={user.id}>{user.handle}</option>})}
                    </select>
                </form>
                <select 
                className={`browse-pageSelect ${theme?"dark":"light"}`}
                onChange={(e)=>{setCocktailsPerPage(parseInt(e.target.value))}}>
                    <option value="9">9</option>
                    <option value="18">18</option>
                    <option value="27">27</option>
                </select>
            </div>
                <CocktailList userCocktails = {currentCocktails} />
                <Pagination cocktailsPerPage={cocktailsPerPage} totalCocktails={filteredCocktails.length} paginate={paginate} theme={theme} />
            </section>
}