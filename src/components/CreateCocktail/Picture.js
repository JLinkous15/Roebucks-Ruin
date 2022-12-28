export const Picture = ({setImage, theme}) => {
    
    const imageHandler = (copy) => {
        setImage(copy)
        if(document.getElementById("previewImage_img")){
            document.getElementById("previewImage_img").remove()
        }
        const fileReader = new FileReader()    
        fileReader.readAsDataURL(copy)
        
        fileReader.addEventListener("load",
        ()=>{
            const url = fileReader.result
            const img = new Image()
            img.src = url
            img.id = "previewImage_img"
            const div = document.getElementById("previewImage")
            div.appendChild(img)
        })
    }
    return <>
            <label htmlFor="file">Image:</label>
            <fieldset className="fieldset_post">
                <input type="file" 
                id="imageFile" 
                accept="image/jepg"
                className={theme?"dark":"light"}
                onChange={(e)=>{
                    const copy = e.target.files[0]
                    imageHandler(copy)
                    }}
                />
            </fieldset>
    </>
}