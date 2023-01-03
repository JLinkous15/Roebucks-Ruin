import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Article.css"
import "../../index.css"
import { ArticleEditButton } from "./ArticleEditButton"

export const ArticleEdit = ({ theme, setHamburger, setMyBarMenu }) => {
    const [image, setImage] = useState({})
    const [imageString, setImageString] = useState("")
    const [articleTopics, setArticleTopics] = useState([])
    const [articleTopicName, setArticleTopicName] = useState("")
    const [user, setUser] = useState({})
    const [article, setArticle] = useState({
        userId: 0,
        title: "",
        subTitle: "",
        image: "",
        content: "",
        articleTopicId: "",
        date: ""
    })
    const {articleId} = useParams()

    useEffect(()=>{
        fetch(`http://localhost:8088/articleTopics`)
        .then(res=>res.json())
        .then(setArticleTopics)
    }, [])
    
    useEffect(()=>{
        fetch(`http://localhost:8088/articles?id=${articleId}&_expand=articleTopic`)
        .then(res=>res.json())
        .then((res)=>{
            setArticleTopicName(res[0]?.articleTopic.name)
            delete res[0].articleTopic
            setArticle(res[0])
        })
    }, [articleId])

    useEffect(()=>{
    fetch(`http://localhost:8088/users?id=${article.userId}`)
    .then(res=>res.json())
    .then(res=>{setUser(res[0])
        setImageString(article.image)
    })
    }, [article])

    useEffect(()=>{
    if(image.name){
        const fileReader = new FileReader()
        fileReader.readAsDataURL(image)

        fileReader.addEventListener("load", ()=>{
            const url = fileReader.result
            setImageString(url)
        })
    }
    },[image])
console.log(article)
    return <section 
    className={`componentContainer ${theme?"light":"dark"}`} 
    onClick={(e)=>{setHamburger(true)
                    setMyBarMenu(true)}}>
            <form className={`blog-form`}>
            <label htmlFor="topic">Topic</label>
                <fieldset className={`blog-form-fieldset`}>
                    <select 
                        className={theme?"dark":"light"}
                        style={{width: "25rem"}}
                        value={article.articleTopicId}
                        onChange={(e)=>{
                            const copy = {...article}
                            const topicId = parseInt(e.target.value)
                            copy.articleTopicId = topicId
                            setArticle(copy)
                        }}>
                            <option value="0">Choose a Topic</option>
                            {articleTopics.map((topic, index)=>{
                                return <option key={index} value={topic.id}>{topic.name}</option>
                            })}
                        </select>
                </fieldset>

                <label htmlFor="title">Title</label>
                <fieldset className={`blog-form-fieldset`}>
                    <input type="text" 
                        className={theme?"dark":"light"}
                        style={{width: "25rem"}}
                        defaultValue={article.title}
                        onChange={(e)=>{
                            const copy = {...article}
                            copy.title = e.target.value
                            setArticle(copy)
                        }} />
                </fieldset>
                
                <label htmlFor="subtitle">Sub-title</label>
                <fieldset className={`blog-form-fieldset`}>
                    <input type="text" 
                        className={theme?"dark":"light"}
                        style={{width: "25rem"}}
                        defaultValue={article.subTitle}
                        onChange={(e)=>{
                            const copy = {...article}
                            copy.subTitle = e.target.value
                            setArticle(copy)
                        }} />
                </fieldset>

                <label htmlFor="file">Image</label>                    
                <fieldset>
                    <input type="file" 
                        className={theme?"dark":"light"}
                        style={{width: "25rem"}}
                        onChange={(e)=>{
                            const copy = e.target.files[0]
                            setImage(copy)
                        }} />
                </fieldset>

                <label htmlFor="Content">Content</label>                    
                <fieldset>
                    <textarea
                        className={theme?"dark":"light"}
                        style={{width: "50rem", height:"33vh"}}
                        defaultValue={article.content}
                        onChange={(e)=>{
                            const copy = {...article}
                            copy.content = e.target.value
                            setArticle(copy)
                        }} />
                </fieldset>
                
            <ArticleEditButton
            theme={theme}
            article={article}
            image={image}
            imageString={imageString} />
            </form>

            {imageString
                ?<div className="hero" style={{backgroundImage: `url(${imageString})`}} >
                    <div className="hero-content">
                        {articleTopicName
                        ?<label 
                        htmlFor="hero" 
                        className={`heroLabel ${theme?"dark":"light"}`}>{`${articleTopicName}`}</label>:""}
                        <h1 className="hero-item">{article.title}</h1>
                        <h3 className="hero-item">{article.subTitle}</h3>
                        <h4 className="hero-item">{article.date} | by : {user.handle}</h4>
                    </div>
                </div>
            :""}
            <p className="blog-content">
                {article.content}
            </p>

        </section>
}