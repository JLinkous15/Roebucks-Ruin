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
const [searchSpirit, setSearchSpirit] = useState("")
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

    fetch(`http://localhost:8088/cocktailIngredients?_expand=cocktail&_expand=ingredient`)
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


useEffect(()=>{
    const cocktailsCopy = [...cocktails]
    const filteredCocktailsCopy = [...filteredCocktails]
    const cocktailTypesCopy = [...cocktailTypes]
    const cocktailSpiritsCopy = [...spirits]
    //these are all uniqe situations with unique data. Further conditionals are unnecessary.
    if(searchUser && searchSpirit && searchType){

    }else if(searchUser && searchSpirit && !searchType){ 
        
    }else if(searchUser && !searchSpirit && searchType){
        
    }else if(!searchUser && searchSpirit && searchType){
        
    }else if(searchUser && !searchSpirit && !searchType){

    }else if(!searchUser && !searchSpirit && searchType){
        
    }else if(!searchUser && searchSpirit && !searchType){
        
    }else{
        setFilteredCocktails(cocktailsCopy)
    }
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
                        if(parseInt(value)){
                            setSearchType(value)
                        }else{
                            setSearchType(0)
                        }
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
                                    value={spirit.name}
                                    key={spirit.id}>
                                        {spirit.name}
                                    </option>
                        })}
                    </select>
                    <select 
                    className={theme?"dark":"light"}
                    onChange={(e)=>{
                        const value = parseInt(e.target.value)
                        if(parseInt(value)){
                            setSearchUser(value)
                        }else{
                            setSearchUser(0)
                        }
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