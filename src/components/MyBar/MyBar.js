import { useEffect, useState } from "react"
import { Pagination } from "../Pagination"
import { CocktailList } from "./CocktailList"
import "./MyBar.css"

export const MyBar = ({theme, setHamburger, setMyBarMenu}) => {
const [userCocktails, setUserCocktails] = useState([])
const [currentPage, setCurrentPage] = useState(1)
const [cocktailsPerPage, setCocktailsPerPage] = useState(9)

const localUser = localStorage.getItem("roebucks_user")
const localUserObj = JSON.parse(localUser)

useEffect(()=>{
    fetch(`http://localhost:8088/cocktails?userId=${localUserObj.id}`)
    .then(res=>res.json())
    .then(res=>setUserCocktails(res.reverse()))
}, [])

//current posts via pagination
const indexOfLastPost = currentPage * cocktailsPerPage
const indexOfFirstPost = indexOfLastPost - cocktailsPerPage
const currentCocktails = userCocktails.slice(indexOfFirstPost, indexOfLastPost)

//paginate
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
}

    return <section className={`createCocktail ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
                <select 
                className={`myBar-pageSelect ${theme?"dark":"light"}`}
                onChange={(e)=>{setCocktailsPerPage(parseInt(e.target.value))}}>
                    <option value="9">9</option>
                    <option value="18">18</option>
                    <option value="27">27</option>
                </select>
                <CocktailList userCocktails = {currentCocktails} />
                <Pagination cocktailsPerPage={cocktailsPerPage} totalCocktails={userCocktails.length} paginate={paginate} theme={theme} />
            </section>
}