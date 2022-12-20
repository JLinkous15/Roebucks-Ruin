import { Link } from "react-router-dom"

export const DoubleHero = ({secondRow, theme}) => {

    return <>
                {secondRow.map(article=>{return <>
                <Link to={`/articles/${article.id}/view`} className="doubleHero" style={{backgroundImage: `url(${article.image})`}} key={article.id}>
                    <div className="doubleHero-content">
                        <label 
                        htmlFor="doubleHero" 
                        className={`doubleHeroLabel ${theme?"dark":"light"}`}>{`${article?.articleTopic?.name}`}</label>
                        <h1 className="doubleHero-item">{article.title}</h1>
                        <h3 className="doubleHero-item">{article.subTitle}</h3>
                        <h4 className="doubleHero-item">{article.date.toString()} | by: {article?.user?.handle}</h4>
                    </div>
                </Link>
                </>})}
               
        </>
}