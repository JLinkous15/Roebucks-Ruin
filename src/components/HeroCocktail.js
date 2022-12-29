import { DateConverter } from "./DateConverter"

export const HeroCocktail = ({cocktail, theme, types}) => {
const [primaryType] = types
    return<>
            <div className="hero" style={{backgroundImage: `url(${cocktail.image})`}}>
                <div className="hero-content">
                    <label 
                    htmlFor="hero" 
                    className={`heroLabel ${theme?"dark":"light"}`}>{cocktail?.method?.name}</label>
                    <h1 className="hero-item">{cocktail.name}</h1>
                    <h3 className="hero-item">{primaryType?.type?.name}</h3>
                    <h4 className="hero-item"><DateConverter date={cocktail.dateCompleted} /> | by: {cocktail?.user?.handle}</h4>
                </div>
            </div>
            
        </>
}