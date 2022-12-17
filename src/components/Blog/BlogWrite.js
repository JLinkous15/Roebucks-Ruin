import { useEffect, useState } from "react"

export const BlogWrite = ({theme, setHamburger, setMyBarMenu}) => {
    const [image, setImage] = useState({})
    const [imageString, setImageString] = useState("")
    const [blog, setBlog] = useState({
        employeeId: 0,
        title: "",
        subTitle: "",
        image: "",
        content: "",
        dateCompleted: 0
      })

      useEffect(()=>{

        if(image.name){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)

            fileReader.addEventListener("load", ()=>{
                const url = fileReader.result
                setImageString(url)
        })}
      },[image])

    const submitBlog = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8088/blogs`, {method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify()
        })
    }

    //image, content, employeeId, datePosted

    return <section 
    className={`componentContainer ${theme?"light":"dark"}`} 
    onClick={(e)=>{setHamburger(true)
                    setMyBarMenu(true)}}>
            <form className={`blog-form`}>
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
                
                <div className="blog-submit-button-container">
                    <button 
                        className={`btn ${theme?"dark":"light"}`}
                        onClick={(e)=>{submitBlog(e)}}>
                            Submit Article
                    </button>
                </div>
            </form>
            <div className="blogContainer">
                <div className="blog-hero preview" style={imageString?{backgroundImage: `url(${imageString})`}:{backgroundImage:"none"}} >
                    <div className="blog-hero-content">
                        <h1>{blog.title}</h1>
                        <h2>{blog.subTitle}</h2>
                        <h3></h3>
                    </div>
                </div>
                <p className="blog-content">
                    {blog.content}
                </p>
            </div>
        </section>
}