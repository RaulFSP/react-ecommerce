import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router"

export default function Auth() {
    const { signUp, user, logout, login } = useContext(AuthContext)
    const [mode, setMode] = useState("signup")
    const [error, setError] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    function onSubmit(data) {
        setError(null)
        let result
        if (mode === "signup") {
            result = signUp(data.email, data.password)

        } else {
            result = login(data.email, data.password)
        }
        if (result.sucess) {
            navigate("/")
        } else {
            setError(result.error)
        }

    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    {user && <button onClick={() => logout()}>logout</button>}

                    <h1 className="page-title">
                        {mode === "signup" ? "Sign Up" : "Login"}
                    </h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                {...register("email",
                                    { required: "Email is required" }
                                )}
                            />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-input" id="password" {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "the password must have 6 characters or more" },
                                    maxLength: { value: 12, message: "the password must have 12 characters or less" }
                                }
                            )} />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>
                        <button className="btn btn-primary btn-large" type="submit">

                            {mode === "signup" ? "Confirm" : "Login"}
                        </button>
                    </form>
                    <div className="auth-switch">
                        {mode === "signup"
                            ? (<p>Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span></p>)
                            : (<p>Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span></p>)}

                    </div>
                </div>
            </div>
        </div>)
}