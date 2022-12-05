import { RoebucksRuin } from "./components/RoebucksRuin"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar"
import { Footer } from "./components/Footer/Footer"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <RoebucksRuin />
    </BrowserRouter>
)

