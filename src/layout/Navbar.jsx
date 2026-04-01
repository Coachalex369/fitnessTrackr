import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav>
      <NavLink to="/">Activities</NavLink>

      {!token && <NavLink to="/register">Register</NavLink>}
      {!token && <NavLink to="/login">Login</NavLink>}

      {token && <button onClick={logout}>Logout</button>}
    </nav>
  );
}