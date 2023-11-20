import { event } from 'jquery';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  console.log(userContext);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [dirty, setDirty] = useState({
    email: false,
    password: false
  })

  const validate = () => {
    const errorsData = {};
    errorsData.email = [];
    errorsData.password = [];
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (!email) {
      errorsData.email.push("Email Can't be Empty");
    }
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push("Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit")
      }
    }
    setErrors(errorsData);
  }
  let isValid = () => {
    let valid = true;

    //reading all controls from errors
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }

    }
    return valid;
  };

  const onLoginClick = async () => {
    //set all controls as dirty

    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    //call validate
    validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        //Status code is 200
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          userContext.setUser({
            ...userContext.user,
            isLoggedIn: true,
            currentUserName: responseBody[0].fullName,
            currentUserId: responseBody[0].id,
          })
          navigate('/dashboard');
        } else {
          toast.error('Invalid Login, please try again')
        }
      } else {
        toast.error('Unable to connect to server');
      }
    }
  };
  useEffect(() => {
    validate();
  }, [email, password])

  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
          </div>

          <div className="card-body border-bottom border-success">
            {/* email starts */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, email: true })
                  validate()
                }}
                placeholder="Email"
              />
              <div className='text-danger'>
                {
                  dirty["email"] && errors["email"][0] ? errors[email] : ""
                }
              </div>
            </div>
            {/* email ends  */}

            {/* password starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, password: true })
                  validate()
                }}
              />
              <div className='text-danger'>
                {
                  dirty["password"] && errors["password"][0] ? errors["password"] : ""
                }
              </div>
            </div>
            {/* password ends  */}
          </div>

          <div className='card-footer text-center'>
            <button className='btn btn-success' onClick={onLoginClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login