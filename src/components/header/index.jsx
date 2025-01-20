import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
        <h2>Recruit Bridge</h2>
      </div>

      <nav>
        <NavLink to="/">Applications</NavLink>

        <NavLink to="/job/form">New Application</NavLink>
      </nav>
    </header>
  );
};

export default Header;
