import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage(props) {
    const { setShow } = props;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(async () => {
                setShow(false)
            })
            .catch(async (res) => {
                const data = await res.json();
                console.log('code:', data.statusCode);
                if (data.statusCode === 401) setErrors(true);
            })

    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors === true && (<li>The provided credentials were invalid.</li>)}
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
        </form>
    );
}

export default LoginFormPage;
