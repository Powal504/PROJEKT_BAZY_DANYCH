import React from "react";
import styles from './Forget_password.module.css';
import { Link } from "react-router-dom";

function Forget_password() {
    return (
        <div className={`container ${styles.forgetPassword}`}>
            <div className="row">
                <div className="col-md-12 col-md-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="text-center">
                                <img src="https://i.ibb.co/rshckyB/car-key.png" alt="car-key" border="0" />
                                <h2 className="text-center">Zapomniałeś hasła?</h2>
                                <p>Możesz zresetować hasło tutaj:</p>
                                <form id="register-form" role="form" autoComplete="off" className="form" method="post">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input className="form-control" id="sel1" placeholder="Email">
                                                
                                            </input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                            <input id="forgetpass" name="forgetpass" placeholder="Nowe haslo" className="form-control" type="password" />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                            <input id="forgetpass" name="forgetpass" placeholder="Powtórz hasło" className="form-control" type="password" />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <input name="btnForget" className={`btn btn-lg btn-primary btn-block ${styles.btnForget} `} value="Reset Password" type="submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forget_password;