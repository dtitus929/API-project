import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage(props) {
    const { setShow } = props;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)

    const history = useHistory();

    useEffect(() => {
        if (
            credential.length < 4 ||
            password.length < 6
        ) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [credential, password]);

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

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .then(async () => {
                setShow(false);
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

        <>

            <div className='modal-header'>
                <div>&nbsp;</div>
                <div className='modal-title'>Log In</div>
                <div><button className="modal-close" onClick={() => { handleClose() }}>X</button></div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">

                {errors.length > 0 &&
                    <ul style={{ padding: '0px', margin: '2px 0px 20px 8px', color: 'red' }}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }

                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />

                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className='modal-submit-button'
                    disabled={isDisabled}
                >Log In</button>

                <div style={{ display: 'flex', justifyContent: 'center', color: '#CCCCCC', marginTop: '15px' }}>
                    <button className='modal-demouser-button' onClick={async () => { handleDemo() }} type="submit">Demo Site User</button> &#183;
                    <button className='modal-demouser-button' onClick={async () => { handleDemo2() }} type="submit">Demo Spot Owner</button>
                </div>

            </form>

        </>

    );
}

export default LoginFormPage;
