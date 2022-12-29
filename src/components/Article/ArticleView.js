import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Hero } from "../Hero"
import "./Article.css"

export const ArticleView = ({theme, setHamburger, setMyBarMenu}) => {
    const {articleId} = useParams()
    const [article, setArticle] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/articles?id=${articleId}&_expand=articleTopic&_expand=user`)
        .then(res=>res.json())
        .then(setArticle)
    }, [articleId])
    return <section className={`blog componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            
        {article.map(article=>{return <><Hero article={article} key={article.id} theme={theme}/>
            <p className="blog-content">
            {article.content}
            </p></>})}
        
        </section>
}