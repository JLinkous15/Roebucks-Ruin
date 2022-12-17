import { Outlet, Route, Routes } from "react-router-dom"
import { EditCocktail } from "../EditCocktail/EditCocktail"
import { Home } from "../Home/Home"
import { MyBar } from "../MyBar/MyBar"
import { CreateCocktail } from "../MyBar/CreateCocktail"
import { ViewCocktail } from "../MyBar/ViewCocktail"
import { BlogList } from "../Blog/BlogList"
import { BlogView } from "../Blog/BlogView"
import { BlogWrite } from "../Blog/BlogWrite"


export const ApplicationViews = ({theme, hamburger, setHamburger, myBarMenu, setMyBarMenu}) => {
	
	return <Routes>
				<Route path="/" element={
					//do i need a home component?
					<Outlet 
					/>
				}>
					<Route path="blog" element={
						<BlogList 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="blog/blogwrite" element={
						<BlogWrite 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="blog/:blogId/view" element={
						<BlogView 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
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

