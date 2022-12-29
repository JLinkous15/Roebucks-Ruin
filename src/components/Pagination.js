import { Link } from "react-router-dom"

export const Pagination = ( {cocktailsPerPage, totalCocktails, paginate, theme} ) => {
    const pageNumbers = []
    for (let i = 1; i<= Math.ceil(totalCocktails/cocktailsPerPage); i++){
        pageNumbers.push(i)
    }
    return <ul className="page-list">
                {
                    [pageNumbers.map(number => (
                        <li key={number} className={`page-item ${theme?"dark":"light"}`}>
                            <Link className={`page-item-link ${theme?"dark":"light"}`} onClick={()=>paginate(number)}>
                                {number}
                            </Link>
                        </li>
                    ))]
                }
    </ul>
}