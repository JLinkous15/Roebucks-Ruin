import Axios from "axios"
import { useNavigate } from "react-router-dom"

export const ArticleEditButton = ({theme, article, image, imageString}) => {
    const navigate = useNavigate()

    const submitArticle = (e) => {
        e.preventDefault()
        if(image.name){
        const formData = new FormData()
            formData.append("file", image)
            formData.append("upload_preset", "klbtjzwi")

            Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
            .then((res)=>{
                const copy = {...article}
                const urlString = res.data.url
                copy.image = urlString
                
                return copy}
            )
            .then((article)=>{
                fetch(`http://localhost:8088/articles/${article.id}`, {method: "PUT",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(article)
                })
                .then(res=>res.json())
                .then((res)=>navigate(`/articles/${res.id}/view`))
            })
        }else{
            fetch(`http://localhost:8088/articles/${article.id}`, {method: "PUT",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(article)
            })
            .then(res=>res.json())
            .then((res)=>navigate(`/articles/${res.id}/view`))}
        }
    return  <div className="blog-submit-button-container">
                <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={(e)=>submitArticle(e)}>
                        Submit Article
                </button>
            </div>
}