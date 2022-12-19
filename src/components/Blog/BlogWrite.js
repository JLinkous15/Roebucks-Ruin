import { useEffect, useState } from "react"
import { BlogSubmitButton } from "./BlogSubmitButton"
import "./Blog.css"
import "../../index.css"

export const BlogWrite = ({theme, setHamburger, setMyBarMenu}) => {
    const [image, setImage] = useState({})
    const [imageString, setImageString] = useState("")
    const [blogTopics, setBlogTopics] = useState([])
    const [blogTopicName, setBlogTopicName] = useState("")
    const [blog, setBlog] = useState({
        userId: 0,
        title: "",
        subTitle: "",
        image: "",
        content: "",
        blogTopicId: "",
        date: 0
      })

      useEffect(()=>{
        fetch(`http://localhost:8088/blogTopics`)
        .then(res=>res.json())
        .then(setBlogTopics)
      }, [])

      useEffect(()=>{

        if(image.name){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)

            fileReader.addEventListener("load", ()=>{
                const url = fileReader.result
                setImageString(url)
        })}
      },[image])



    //image, content, employeeId, datePosted
console.log(blogTopicName)
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
                        onChange={(e)=>{
                            const copy = {...blog}
                            const [topicId, topicName] = e.target.value.split("--")
                            copy.blogTopicId = parseInt(topicId)
                            setBlog(copy)
                            setBlogTopicName(topicName)
                        }}>
                            <option value="0">Choose a Topic</option>
                            {blogTopics.map((topic, index)=>{
                                return <option key={index} value={`${topic.id}--${topic.name}`}>{topic.name}</option>
                            })}
                        </select>
                </fieldset>

                <label htmlFor="title">Title</label>
                <fieldset className={`blog-form-fieldset`}>
                    <input type="text" 
                        className={theme?"dark":"light"}
                        style={{width: "25rem"}}
                        onChange={(e)=>{
                            const copy = {...blog}
                            copy.title = e.target.value
                            setBlog(copy)
                        }} />
                </fieldset>
                
                <label htmlFor="subtitle">Sub-title</label>
                <fieldset className={`blog-form-fieldset`}>
                    <input type="text" 
                        className={theme?"dark":"light"}
                        style={{width: "25rem"}}
                        onChange={(e)=>{
                            const copy = {...blog}
                            copy.subTitle = e.target.value
                            setBlog(copy)
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
                        onChange={(e)=>{
                            const copy = {...blog}
                            copy.content = e.target.value
                            setBlog(copy)
                        }} />
                </fieldset>
                
               <BlogSubmitButton
               theme={theme}
               blog={blog}
               image={image} />
            </form>

            {blog.title && image
                ?<div className="hero" style={imageString?{backgroundImage: `url(${imageString})`}:{backgroundImage:"none"}} >
                <div className="hero-content">
                    {blogTopicName
                    ?<label 
                    htmlFor="hero" 
                    className={`heroLabel ${theme?"dark":"light"}`}>{`${blogTopicName}`}</label>:""}
                    <h1 className="hero-item">{blog.title}</h1>
                    <h3 className="hero-item">{blog.subTitle}</h3>
                    <h3 className="hero-item">Date | Author</h3>
                </div>
                
            </div>
            :""}
            <div>
                <p className="blog-content">
                {blog.content}
                </p>
            </div>

        </section>
}