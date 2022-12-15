import { Outlet, Route, Routes } from "react-router-dom"
import { EditCocktail } from "../EditCocktail/EditCocktail"
import { Home } from "../Home/Home"
import { MyBar } from "../MyBar/MyBar"
import { CreateCocktail } from "../MyBar/CreateCocktail"
import { ViewCocktail } from "../MyBar/ViewCocktail"

export const ApplicationViews = ({theme, hamburger, setHamburger, myBarMenu, setMyBarMenu}) => {
	
	return <Routes>
				<Route path="/" element={
					//do i need a home component?
					<Outlet 
					/>
				}>
					<Route path="/" element={
						<Home 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="mybar" element={ 
						<MyBar 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="mybar/create" element={ 
						<CreateCocktail 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="mybar/:cocktailId/view" element={ 
						<ViewCocktail
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="mybar/:cocktailId/edit" element={ 
						<EditCocktail
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					</Route>
		
		
			</Routes>
}

