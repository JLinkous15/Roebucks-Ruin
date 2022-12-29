import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Hero } from "../Hero"


export const ArticleList = ({theme, setHamburger, setMyBarMenu}) => {
    const [articles, setArticles] = useState([])
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:8088/articles?_expand=articleTopic`)
        .then(res=>res.json())
        .then((res)=>{
            const copy = res.sort((a, b)=>{
                if(a.id > b.id){
                    return -1
                }else if (a.id < b.id){
                    return 1 
                }
            return 0}
            )
            setArticles(copy)
        })
    }, [])

    console.log(articles)
 
    return (<section className={`ArticleList componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
            setMyBarMenu(true)}}>

                {localUserObj.staff
                    ?<Link to="/articles/articlewrite" className={theme?"light":"dark"}>Write a new article.</Link>
                    :""}
                {articles.map(article=>{return <Hero article={article}/>})}
            </section>)
}