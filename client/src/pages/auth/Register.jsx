import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {render } from 'react-dom';
import { register, reset } from '../../features/authSlice'
import { FaUserCircle } from 'react-icons/fa'

const Register = () => {

    let errors = {}
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

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

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {

        e.preventDefault()

        if (password !== password2) {
            const element = (
                <div className="alert alert-danger">
                    <span>Passwords must match!</span>
                </div>
            )
            render(element, document.getElementById("errors-container"))
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }
    return (
        <>
            <main className="pb-4">
                <div className="text-center py-4">
                    <h2>Naujas Vartotojas</h2>
                    <hr className="my-4 py-1 w-10 m-auto"></hr>
                </div>
                <div className="container w-25 m-auto p-3 border rounded shadow">
                    <div className="text-center">
                        <FaUserCircle id="user-icon" className="mb-3 text-dark"/>
                    </div>
                    <div id="errors-container">

                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className="form-label">Vardas</label>
                                <input type="text" className="form-control" id="name" placeholder="Vardas" name="name"
                                    value={name} onChange={onChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
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
                            <div className="col-xs-12 mb-3">
                                <label htmlFor="password2" className="form-label">Pakartoti Slaptazodi</label>
                                <input type="password" className="form-control" id="password2" placeholder="Pakartoti Slaptazodi" name="password2"
                                    value={password2} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 d-grid">
                                <button className="btn btn-primary" type="submit">Registruotis</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register