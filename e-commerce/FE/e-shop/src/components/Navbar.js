import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  let onLogoutClick = (event) => {
    event.preventDefault();

    userContext.setUser({
      isLoggedIn: false,
      currentUserId: null,
      currentUserName: null,
    });

    window.location.hash = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
      <Link className="navbar-brand" to="/">
        eCommerce
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {userContext.user.isLoggedIn ? (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
                
              >
                <i className="fa fa-dashboard"></i> Dashboard
              </Link>
            </li>
          ) : (
            ""
          )}

          {!userContext.user.isLoggedIn ? (
            <li>
              <Link
                className="nav-link"
                to="/"
              >
                Login
              </Link>
            </li>
          ) : (
            ""
          )}

          {!userContext.user.isLoggedIn ? (
            <li>
              <Link
                className="nav-link"
                to="/register"
                
              >
                Register
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>

        {/* right box starts */}
        {userContext.user.isLoggedIn ? (
          <div style={{ marginRight: 100 }}>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-circle"></i>{" "}
                  {userContext.user.currentUserName}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    className="dropdown-item"
                    href="/"
                    onClick={onLogoutClick}
                  >
                    Logout
                  </Link>
                </div>
              </li>
              <li className='nav-item'>
                <Link to='/store'>
                 <i className='fa fa-shopping-bag'>Store</i>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}

        {/* right box ends */}
      </div>
    </nav>
  )
}

export default Navbar