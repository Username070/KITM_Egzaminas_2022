import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTransaction, getTransactions, reset } from "../../features/transactionSlice";

const Main = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { transaction, isError, isSuccess, message, isLoading } = useSelector((state) => state.transactions);
  
    const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(reset())
    }, []);
  
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
  
      if (isSuccess) {
        navigate("/")
      }
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, dispatch, isSuccess, transaction, isError, message]);
  
    const [formData, setFormData] = useState({
      title: "",
      type: "",
      ammount: "",
    });
  
    const { title, type, ammount } = formData;
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const onSubmit = async (e) => {
  
      e.preventDefault();
  
      const transactionData = {
        title,
        type,
        ammount,
    }
  
      dispatch(createTransaction(transactionData))
    };

    return (
    <>
      <main className="pb-4">
        <div className="text-center py-4">
          <h2>Naujas Irasas</h2>
          <hr className="my-4 py-1 w-10 m-auto"></hr>
        </div>
        <div className="position-relative">
          <div className={isLoading ? ("container w-25 p-3 border rounded shadow blur") : ("container w-25 p-3 border rounded shadow")}>
            <div id="errors-container">
              {isError ? (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              ) : ("")}
            </div>
            <form onSubmit={onSubmit} id="form">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 mb-3">
                    <label htmlFor="title" className="form-label">
                      Pavadinimas
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Pavadinimas"
                      name="title"
                      value={title}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col-xs-12 mb-3">
                    <label htmlFor="type" className="form-label">
                      Tipas
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      placeholder="Tipas"
                      name="type"
                      value={type}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="col-xs-12 mb-3">
                    <label htmlFor="ammount" className="form-label">
                      Suma
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ammount"
                      placeholder="Suma"
                      name="ammount"
                      value={ammount}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 d-grid">
                    <button className="btn btn-primary" type="submit">
                      Pateikti
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
    )
}

export default Main;