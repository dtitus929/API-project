import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage(props) {
    const { setShowLogin } = props;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleDemo = () => {
        setCredential('alice@user.io');
        setPassword('alicepass');
    };

    const handleDemo2 = () => {
        setCredential('CindyOwner');
        setPassword('cindypass');
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .then(async () => {
                setShowLogin(false)
                history.push("/")
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.statusCode === 401) {
                    setErrors(['The provided credentials were invalid.']);
                }
            });

    };

    return (

        <form onSubmit={handleSubmit}>
            <ul>
                {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Username or Email:
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Log In</button>
            <button onClick={async () => { handleDemo() }} type="submit">Demo User</button>
            <button onClick={async () => { handleDemo2() }} type="submit">Demo Owner</button>
        </form>

    );
}

export default LoginFormPage;
