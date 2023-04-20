import React from 'react'
import PropTypes from 'prop-types'

const LogInForm = (props) => {
    return (
        <form onSubmit={ props.handleLogin }>
            <h2>Log In To Application</h2>
            <div>
                username: <input name="username" type="text" value={ props.username } required onChange={({ target }) => props.setUsername(target.value)}></input>
            </div>
            <div>
                password: <input name="password" type="text" value={ props.password } required onChange={({ target }) => props.setPassword(target.value)}></input>
            </div>
            <div>
                <button id='login-button' type="submit">Login</button>
            </div>
        </form>
    );
}

LogInForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

export default LogInForm;