import Axios from "axios"
import { useNavigate } from "react-router-dom"

export const ArticleSubmitButton = ({theme, article, image}) => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    const submitArticle = (e) => {
        e.preventDefault()
        
        const formData = new FormData()
            formData.append("file", image)
            formData.append("upload_preset", "klbtjzwi")

            Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
            .then((res)=>{
                const copy = {...article}
                const urlString = res.data.url
                copy.image = urlString
                copy.userId = localUserObj.id
                copy.date = Date.now()
                
                return copy}
            )
            .then((article)=>{
                fetch(`http://localhost:8088/articles`, {method: "POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(article)
                })
                .then(res=>res.json())
                .then((res)=>navigate(`/articles/${res.id}/view`))
            })}

    return  <div className="blog-submit-button-container">
                <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={(e)=>submitArticle(e)}>
                        Submit Article
                </button>
            </div>
}