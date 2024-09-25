import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import CurrentEmployee from './pages/CurrentEmployee/CurrentEmployee'



function Router() {
  
  return (
    
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CurrentEmployee" element={<CurrentEmployee />} />
        </Routes>
      </BrowserRouter>
    
  );
}
export default Router;