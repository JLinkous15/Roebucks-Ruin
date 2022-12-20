import { Link, useNavigate } from "react-router-dom"
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
            const copy = res.sort((a, b)=>{
                if(a.id > b.id){
                    return -1
                }else if (a.id < b.id){
                    return 1 
                }
            return 0})
            copy.slice(0, 2)
            setSecondRow(copy)
        })
        
        fetch(`http://localhost:8088/articles?_expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.sort((a, b)=>{
                if(a.id > b.id){
                    return -1
                }else if (a.id < b.id){
                    return 1 
                }
            return 0})
            copy.slice(2, 4)
            setThirdRow(copy)
        })
        
        fetch(`http://localhost:8088/cocktails`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.sort((a, b)=>{
                if(a.id > b.id){
                    return -1
                }else if (a.id < b.id){
                    return 1 
                }
            return 0})
            setCocktails(copy)
        })

    },[])

    return <section className={`componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
                {/*hero for latest blog post */}
                {firstArticle.map(article=>{return <Link 
                    to={`/articles/${article.id}/view`}
                    key={article.id}
                    ><Hero theme={theme} article={article} /></Link>})}
                {/* 2nd and 3rd most recent blog posts */}
                <div className="doubleHero-container">
               <DoubleHero secondRow={secondRow} theme={theme} />
                </div>
                {/* Carrousel 1 */}

                {/*4th and 5th most recent blog posts*/}
                <div className="doubleHero-container">

                </div>
                {/* Carrousel 2 */}
        
    </section>
}