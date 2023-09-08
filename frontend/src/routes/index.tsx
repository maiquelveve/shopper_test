import { Routes, Navigate, Route } from "react-router-dom";
import { Dashboard } from "../pages/home";
import { LayoutDashboard, LayoutSingle } from "../components";
import { ErrorPage } from "../pages/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <LayoutDashboard>
            <Dashboard />
          </LayoutDashboard>
        } 
      />
      <Route 
        path='/error' 
        element={
          <LayoutSingle>
            <ErrorPage />
          </LayoutSingle>
        } 
      />
      <Route path='*' element={<Navigate to="/error" />} />
    </Routes>
  );
};

export default AppRoutes;
