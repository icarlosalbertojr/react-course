import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Repository from "./pages/Repository";


export default function MyRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/repository/:repositoryName" element={<Repository/>} />
            </Routes>
        </BrowserRouter>
    )
}