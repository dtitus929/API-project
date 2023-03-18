import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage(props) {
    const { setShow } = props;
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (
            email === '' ||
            username === '' ||
            firstName === '' ||
            lastName === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [email, username, firstName, lastName, password, confirmPassword]);

    if (sessionUser) return <Redirect to="/" />;

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {
            setIsDisabled(false)
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(async () => {
                    setShow(false)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setIsDisabled(true)
                        setErrors(Object.values(data.errors));
                        if (data.message === 'User already exists') {
                            let newErrors = errors;
                            newErrors.push('Username must be unique')
                            setErrors(newErrors);
                        }
                    }
                });
        }
        setIsDisabled(true)
        return setErrors(['Password does not match confirmation password']);
    };

    return (

        <>
            <div className='modal-header'>
                <div>&nbsp;</div>
                <div className='modal-title'>Sign Up</div>
                <div><button className="modal-close" onClick={() => { handleClose() }}>X</button></div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">

                {errors.length > 0 &&
                    <ul style={{ padding: '0px', margin: '2px 0px 20px 8px', color: 'red' }}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }

                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className='modal-submit-button'
                    disabled={isDisabled}
                >Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
