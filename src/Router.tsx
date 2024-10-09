import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import CurrentEmployee from './pages/CurrentEmployee/CurrentEmployee'
import PrivateRoute from "./components/PrivateRoute/privateRoute";




function Router() {
  
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/createEmployees" element={<PrivateRoute />}>
          <Route path="/createEmployees" element={<Home />} />
        </Route>
        <Route path="/" element={<CurrentEmployee />} />
      </Routes>
      </BrowserRouter>
    
  );
}
export default Router;