import LoginForm from "./components/loginForm";
import CardPage from "./components/card";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(){


    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginForm />}/>
            <Route path="/card" element={<CardPage />}/>
        </Routes>
        </BrowserRouter>
        

    )  
}

export default App;