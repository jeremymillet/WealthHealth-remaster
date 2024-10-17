import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import CurrentEmployee from './pages/CurrentEmployee/CurrentEmployee'
import PrivateRoute from "./components/PrivateRoute/privateRoute";
import EditEmployeePage from "./pages/EditEmployee/editEmployee";




function Router() {
  
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CurrentEmployee />} />
        <Route path="/createEmployees" element={<PrivateRoute />}>
          <Route index element={<Home />} /> 
          <Route path="editEmployees/:id" element={<EditEmployeePage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    
  );
}
export default Router;