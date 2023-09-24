import React, { useCallback, useState } from "react";
import styles from "./login-form.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm: React.FC<{}> = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    console.log(formData);

    // function to handle email input
    const onChangeEmail = useCallback((text: string) => {
        setFormData((prev) => {
            return { ...prev, email: text };
        });
    }, []);

    // function to handle email input
    const onChangePassword = useCallback((text: string) => {
        setFormData((prev) => {
            return { ...prev, password: text };
        });
    }, []);
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

                <button className="button">Log In</button>
            </form>
        </motion.div>
    );
};

export default LoginForm;
