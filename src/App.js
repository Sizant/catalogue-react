import LoginForm from "./components/loginForm";
import CardPage from "./components/card";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";


function App(){


    return (
        <HashRouter>
        <Routes>
            <Route path="/" element={<LoginForm />}/>
            <Route path="/card" element={<CardPage />}/>
        </Routes>
        </HashRouter>
        

    )  
}

export default App;