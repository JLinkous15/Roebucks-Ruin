import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Hero } from "../Hero"
import { FaRegEdit } from "react-icons/fa"

export const ArticleList = ({theme, setHamburger, setMyBarMenu}) => {
    const [articles, setArticles] = useState([])
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:8088/articles?_expand=articleTopic`)
        .then(res=>res.json())
        .then((res)=>{
            setArticles(res.reverse())
        })
    }, [])

    return (<section className={`ArticleList componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
            setMyBarMenu(true)}}>
                <div className="article-container">
                {localUserObj.staff
                    ?<button className={`article-btn btn ${theme?"dark":"light"}`} onClick={()=>navigate("/articles/articlewrite")}> <FaRegEdit /></button>
                    :""}
                {articles.map(article=>{
                return <Link to={`/articles/${article.id}/view`}
                key={article.id}
                className="articleHero">
                    <Hero article={article}/>
                </Link>})}
                </div>
            </section>)
}