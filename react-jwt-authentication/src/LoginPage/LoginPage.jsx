import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                {/*                 <div className="alert alert-info">
                    Username: test<br />
                    Password: test
                </div> */}

                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <div className="col-md-12">
                            <div className="card card-container" style={{
                                backgroundColor: '#f7f7f7',
                                padding: '20px 25px 30px',
                                margin: '0 auto 25px',
                                marginTop: '50px',
                                mozBorderRadius: '2px',
                                webkitBorderRadius: '2px',
                                borderRadius: '10px',
                                mozBoxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
                                webkitBoxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
                                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
                                maxWidth: '350px !important'
                            }}>
                                <h2 style={{ textAlign: 'center', paddingBottom: 20, color: '#0D5C75' }}>Login</h2>
                                <img
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                    alt="profile-img"
                                    className="profile-img-card"
                                    style={{  width: '96px',
                                        height: '96px',
                                        margin: '0 auto 10px',
                                        display: 'block',
                                        mozBorderRadius: '50%',
                                        webkitBorderRadius: '50%',
                                        borderRadius: '50%'}}
                                />
                                <Form>

                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-block" style={{color: '#ffffff', display: 'flex', flexDirection: 'column', marginTop: 30,border: 'none', alignItems: 'center', borderRadius: '5px', backgroundColor: '#0D5C75'}} disabled={isSubmitting}>Login</button>
                                        {isSubmitting &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                    {status &&
                                        <div className={'alert alert-danger'}>{status}</div>
                                    }
                                </Form>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export { LoginPage }; 