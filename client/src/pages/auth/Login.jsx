import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/authSlice';
import { render } from 'react-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError) {
            const element = (
                <div className="alert alert-danger">
                    <span>{message}</span>
                </div>
            )
            render(element, document.getElementById("errors-container"))
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }
        dispatch(login(userData));
    }

    return (
        <>
            <main className="pb-4">
                <div className="text-center py-4">
                    <h2>Sveiki Sugryze!</h2>
                    <hr className="my-4 py-1 w-10 m-auto"></hr>
                </div>
                <div className="container w-25 m-auto p-3 border rounded shadow">
                    <div className="text-center">
                        <FaUserCircle id="user-icon" className="mb-3 text-dark" />
                    </div>
                    <div id="errors-container">

                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-xs-12 mb-3">
                                <label htmlFor="email" className="form-label">El. Pastas</label>
                                <input type="email" className="form-control" id="email" placeholder="El. Pastas" name="email"
                                    value={email} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 mb-3">
                                <label htmlFor="password" className="form-label">Slaptazodis</label>
                                <input type="password" className="form-control" id="password" placeholder="Slaptazodis" name="password"
                                    value={password} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 d-grid">
                                <button className="btn btn-primary" type="submit">Prisijungti</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login