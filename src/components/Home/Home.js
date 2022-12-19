import { Link, useNavigate } from "react-router-dom"
import "./Home.css"
import "../../index.css"
import { useEffect, useState } from "react"
import { Hero } from "../Hero"
import { Carrousel } from "../Carrousel"

export const Home = ({theme, setHamburger, setMyBarMenu}) => {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [firstArticle, setFirstArticle] = useState([])
    const [secondRowArticle, setSecondRowArticle] = useState([])
    const [thirdRowArticle, setThirdRowArticle] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/articles?_expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then((res)=>{setArticles(res)
        setFirstArticle(res.slice(0, 1))
        res.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          })
          console.log(res)
          setSecondRowArticle(res.slice(0, 2))
          setThirdRowArticle(res.slice(2, 4))
       })
    },[])

console.log(secondRowArticle)
    return <section className={`componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
                {/*hero for latest blog post */}
                {firstArticle.map(article=>{return <Link 
                    to={`/articles/${article.id}/view`}
                    key={article.id}
                    ><Hero theme={theme} article={article} /></Link>})}
                {/* 2nd and 3rd most recent blog posts */}
                <div className="secondRow">
                    {secondRowArticle.map(article=><Hero theme={theme} article={article}/>)}
                </div>
                {/*Carrousel for most recent drinks in a given category*/}
                <div className="carrouselOne">
                    <Carrousel />
                </div>
                {/*4th and 5th most recent blog posts*/}
                <div className="secondRow">
                    {thirdRowArticle.map(article=><Hero theme={theme} article={article}/>)}
                </div>
                {/*Carrousel for most recent drinks in a given category*/}
        
    </section>
}