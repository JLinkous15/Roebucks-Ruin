import { Outlet, Route, Routes } from "react-router-dom"
import { EditCocktail } from "../EditCocktail/EditCocktail"
import { Home } from "../Home/Home"
import { MyBar } from "../MyBar/MyBar"
import { CreateCocktail } from "../CreateCocktail/CreateCocktail"
import { ViewCocktail } from "../MyBar/ViewCocktail"
import { ArticleList } from "../Article/ArticleList"
import { ArticleView } from "../Article/ArticleView"
import { ArticleWrite } from "../Article/ArticleWrite"
import { Browse } from "../Browse/Browse"
import { ArticleEdit } from "../Article/ArticleEdit"


export const ApplicationViews = ({theme, hamburger, setHamburger, myBarMenu, setMyBarMenu}) => {
	
	return <Routes>
				<Route path="/" element={

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
					<Route path="/browse" element={
						<Browse 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="articles" element={
						<ArticleList 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="articles/articlewrite" element={
						<ArticleWrite 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="articles/:articleId/view" element={
						<ArticleView 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}
						myBarMenu={myBarMenu}
						setMyBarMenu={setMyBarMenu} />} />
					<Route path="articles/:articleId/edit" element={
						<ArticleEdit 
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

