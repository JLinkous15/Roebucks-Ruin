import { Outlet, Route, Routes } from "react-router-dom"
import { EditCocktail } from "../EditCocktail/EditCocktail"
import { MyBar } from "../MyBar/MyBar"
import { ViewCocktail } from "../MyBar/ViewCocktail"

export const ApplicationViews = ({theme, hamburger, setHamburger}) => {
	
	return <Routes>
				<Route path="/" element={
					//do i need a home component?
					<Outlet 
					/>
				}>
					<Route path="mybar" element={ 
						<MyBar 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}/>}/>
					<Route path="mybar/:cocktailId/view" element={ 
						<ViewCocktail
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}/>}
						/>
					<Route path="mybar/:cocktailId/edit" element={ 
						<EditCocktail
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}/>}
						/>
					</Route>
		
		
			</Routes>
}

