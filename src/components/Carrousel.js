import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Link } from "react-router-dom"
//accepts an array of cocktail objects with a length of 11 to produce a sliding carrousel
export const Carrousel = ({cocktails, slider, setSlider, theme}) => {

    return <div className="carrousel-slider">
                <button className={`sliderButton leftSlider ${theme?"dark":"light"}`}
                onClick={(e)=>{
                    e.preventDefault()
                    if(slider !== 0){
                    const copy = slider
                        setSlider(copy - 1)}
                }}><FaChevronLeft /> </button>
                <div className="slider"
                style={{transform: `translatex(calc(-100% * ${slider}))`}}
                >
                    {cocktails.map(cocktail=>{
                        return <div className="slideItem-container" key={cocktail.id}>
                        <Link to={`/mybar/${cocktail.id}/view`} className="sliderItem"
                        style={{backgroundImage: `url(${cocktail.image})`}}>
                            {cocktail.name}
                        </Link>
                    </div>})}
                </div>
                <button className={`sliderButton rightSlider ${theme?"dark":"light"}`}
                onClick={(e)=>{
                    e.preventDefault()
                    if(slider !== 2){
                    const copy = slider
                    setSlider(copy + 1)  
                }}}><FaChevronRight /></button>
    </div>
}