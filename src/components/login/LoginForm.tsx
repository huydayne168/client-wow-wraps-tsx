import React, { useCallback, useState } from "react";
import styles from "./login-form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import http from "../../utils/http";
import { useAppDispatch } from "../../hooks/store-hooks";
import { curUserActions } from "../../stores/store-toolkit";
import { AxiosError } from "axios";

const LoginForm: React.FC<{}> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        email: localStorage.getItem("email") || "",
        password: "",
    });

    const [errMess, setErrMess] = useState("");

    // function to handle email input
    const onChangeEmail = useCallback((text: string) => {
        setFormData((prev) => {
            localStorage.setItem("email", text);
            return { ...prev, email: text };
        });
    }, []);

    // function to handle email input
    const onChangePassword = useCallback((text: string) => {
        setFormData((prev) => {
            return { ...prev, password: text };
        });
    }, []);

    const submitHandler = useCallback(async () => {
        try {
            const res = await http.post(
                "/user/login",
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const userInfo = res.data?.userInfo;
            const accessToken = res.data?.accessToken;
            dispatch(
                curUserActions.storeUser({
                    _id: userInfo._id,
                    accessToken: accessToken,
                })
            );
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.status === 401) {
                    setErrMess("Email or password is not correct!");
                }
            }
        }
    }, [formData.email, formData.password, errMess]);

    return (
        <motion.div
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles["login-form"]}
        >
            <h1 className="content-heading">Login</h1>
            <form action="#">
                {errMess ? (
                    <motion.p
                        transition={{ duration: 0.1 }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles["err-msg"]}
                    >
                        {errMess}
                    </motion.p>
                ) : (
                    ""
                )}
                <div className={styles["controls"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => {
                            onChangeEmail(e.target.value);
                        }}
                        required
                    />
                </div>

                <div className={styles["controls"]}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        value={formData.password}
                        onChange={(e) => {
                            onChangePassword(e.target.value);
                        }}
                    />
                </div>

                <div className={styles["more"]}>
                    <p>
                        You can <Link to={"/sign-up"}>sign up here</Link>
                    </p>

                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <button
                    className="button"
                    onClick={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    Log In
                </button>
            </form>
        </motion.div>
    );
};

export default LoginForm;
