import { Link, redirect, useNavigate } from "react-router-dom"
import "./Home.css"
import "../../index.css"
import { useEffect, useState } from "react"
import { Hero } from "../Hero"
import { Carrousel } from "../Carrousel"
import { DoubleHero } from "./DoubleHero"

export const Home = ({theme, setHamburger, setMyBarMenu}) => {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [firstArticle, setFirstArticle] = useState([])
    const [secondRow, setSecondRow] = useState([])
    const [thirdRow, setThirdRow] = useState([])
    const [cocktails, setCocktails] = useState([])
    const [filteredCocktails, setFilteredCocktails] = useState(cocktails)
    const [cocktailTypes, setCocktailTypes] = useState([])
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
 

    useEffect(()=>{
        fetch(`http://localhost:8088/articles?expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then(setArticles)

        fetch(`http://localhost:8088/articles?id=1&_expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then(setFirstArticle)
        
        fetch(`http://localhost:8088/articles?_expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.reverse()
            setSecondRow(copy.slice(0, 2))
        })
        
        fetch(`http://localhost:8088/articles?_expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.reverse()
            setThirdRow(copy.slice(2, 4))
        })
        
        fetch(`http://localhost:8088/cocktails`)
        .then(res=>res.json())
        .then((res)=>{
            res.reverse()
            res.length = 10
            setCocktails(res)
        })

        fetch(`http://localhost:8088/types`)
        .then(res=>res.json())
        .then(setCocktailTypes)        
    },[])

    useEffect(()=>{
        fetch(`http://localhost:8088/cocktailTypes?typeId=4&_expand=cocktail`)
        .then(res=>res.json())
        .then((response)=>{
            let filtered = []
            response.forEach(res=>filtered.push(res.cocktail))
            setFilteredCocktails(filtered.reverse())
        })
    }, [cocktails])

    return <section className={`componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
                {/*hero for latest blog post */}
                {firstArticle.map(article=>{return <Link 
                    to={`/articles/${article.id}/view`}
                    key={article.id}
                    ><Hero theme={theme} article={article} /></Link>})}
                {/* 2nd and 3rd most recent blog posts */}
                <div className="doubleHero-container">
               <DoubleHero array={secondRow} theme={theme} />
                </div>
                {/* Carrousel 1 */}
                <h3 style={{padding: "0 5vw"}}>Most Recent Cocktails:</h3>
                <Carrousel cocktails={cocktails} theme={theme}/>
                {/*4th and 5th most recent blog posts*/}
                <div className="doubleHero-container">
                <DoubleHero array={thirdRow} theme={theme} />
                </div>
                {/* Carrousel 2 */}
                <h3 style={{padding: "0 5vw"}}>Most Recent Fixxes:</h3>
                <Carrousel cocktails={filteredCocktails} theme={theme}/>
    </section>
}