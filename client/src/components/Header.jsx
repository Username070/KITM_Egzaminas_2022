import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/authSlice';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-light bg-light navbar-expand-lg border-bottom shadow-sm">
                    <span className="navbar-brand text-dark ps-3">Finansai</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end pe-3" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Pagrindinis</Link>
                            </li>
                            {user ? (
                                <>
                                    <li className="btn-group nav-item">
                                        <a type="button" className="dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.name}
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="nav-link border-0 dropdown-item" onClick={onLogout}>Atsijungti</button>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Registracija</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Prisijungimas</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header