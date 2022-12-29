import { Link } from "react-router-dom"

export const CocktailList = ({userCocktails}) => {

    return <div className="cocktail-list">
            {userCocktails.map(cocktail => {
                return (<div className="cocktail-list-item">
                            <Link to={`/mybar/${cocktail.id}/view`}
                            style={{backgroundImage: `url(${cocktail.image})`}}
                            className="cocktail-list-link">
                                    <h3>{cocktail.name}</h3>
                            </Link>
                    </div>)
                
            })}
    </div>
}