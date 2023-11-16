import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashboard"
            >
              <i className="fa fa-dashboard"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/register"
            >
              Register
            </Link>
          </li>
        </ul>

        {/* right box starts */}
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
                <i className="fa fa-user-circle"></i>User
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/#">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
        {/* right box ends */}
      </div>
    </nav>
  )
}

export default Navbar