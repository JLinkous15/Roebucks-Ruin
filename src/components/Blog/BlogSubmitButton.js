import { Axios } from "axios"
import { useNavigate } from "react-router-dom"

export const BlogSubmitButton = ({theme, blog, image}) => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    const submitBlog = (e) => {
        e.preventDefault()
        
        const formData = new FormData()
            formData.append("file", image)
            formData.append("upload_preset", "klbtjzwi")

            Axios.post(`https://api.cloudinary.com/v1_1/dwbxabkg7/image/upload`, formData)
            .then((res)=>{
                const copy = {...blog}
                const urlString = res.data.url
                copy.image = urlString
                copy.employeeId = localUserObj.id
                copy.date=Date.now()
                
                return copy}
            )
            .then((blog)=>{
                fetch(`http://localhost:8088/blogs`, {method: "POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(blog)
                })
                .then(res=>res.json())
                .then((res)=>navigate(`blog/${res.id}/view`))
            })}

    return  <div className="blog-submit-button-container">
                <button 
                    className={`btn ${theme?"dark":"light"}`}
                    onClick={(e)=>{submitBlog(e)}}>
                        Submit Article
                </button>
            </div>
}