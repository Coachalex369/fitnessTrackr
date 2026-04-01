import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityPage from "./activities/ActivityPage";
import Register from "./auth/Register";
import Login from "./auth/Login";

function NotFound() {
  return <h1>404 Page Not Found</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="activities/:activityId" element={<ActivityPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}