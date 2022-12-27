import { DateConverter } from "./DateConverter"

export const Hero = ({article, theme}) => {

    return<>
            <div className="hero" style={{backgroundImage: `url(${article.image})`}} key={article.id}>
                <div className="hero-content">
                    <label 
                    htmlFor="hero" 
                    className={`heroLabel ${theme?"dark":"light"}`}>{`${article?.articleTopic?.name}`}</label>
                    <h1 className="hero-item">{article.title}</h1>
                    <h3 className="hero-item">{article.subTitle}</h3>
                    <h4 className="hero-item"><DateConverter date={article.date} /> | by: {article?.user?.handle}</h4>
                </div>
            </div>
            
        </>
}