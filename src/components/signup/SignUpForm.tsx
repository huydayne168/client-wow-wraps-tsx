import React, { useCallback, useState, useRef, useEffect } from "react";
import styles from "./sign-up-form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import http from "../../utils/http";
const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;

const phoneNumberRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

const SignUpForm: React.FC<{}> = () => {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const [signUpState, setSignUpState] = useState("SIGN_UP_FORM"); // 2 case : signUp form and verify code form
    const formDataStored: any = JSON.parse(
        localStorage.getItem("formData") || "{}"
    );

    const [formData, setFormData] = useState({
        email: formDataStored.email || "",
        password: formDataStored.password || "",
        userName: formDataStored.userName || "",
        phoneNumber: formDataStored.phoneNumber || "",
        verifyCode: formDataStored.verifyCode || "",
    });

    const [emailValid, setEmailValid] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailErrMess, setEmailErrMess] = useState("");

    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [userNameValid, setUserNameValid] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);
    const [phoneNumberMess, setPhoneNumberMess] = useState("");

    const [verifyCodeErrMess, setVerifyCodeErrMess] = useState(false);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!formData.email.match(emailRegex)) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    }, [formData.email]);

    useEffect(() => {
        setPasswordValid(
            formData.password.length >= 8 // password more than 8 characters
        );
    }, [formData.password]);

    useEffect(() => {
        setUserNameValid(formData.userName.length >= 3); // username more than 3 characters
    }, [formData.userName]);

    useEffect(() => {
        if (!formData.phoneNumber.match(phoneNumberRegex)) {
            setPhoneNumberValid(false);
        } else {
            setPhoneNumberValid(true);
        }
    }, [formData.phoneNumber]);

    // Submit handler:
    const submitHandler = useCallback(async () => {
        try {
            const res = await http.post("/user/sign-up", {
                userName: formData.userName,
                password: formData.password,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                verifyCode: formData.verifyCode,
            });

            if (
                !formData.verifyCode &&
                res.status !== 400 &&
                res.status !== 500
            ) {
                // if valid inputs and can send email (detail in backend) so I change this component to the verify code form:
                localStorage.setItem("formData", JSON.stringify(formData));
                setSignUpState("VERIFY_CODE_FORM");
            } else {
                // after succeed verify code => go to login form to login:
                navigate("/login");
            }
        } catch (error: any) {
            console.log(error);
        }
    }, [
        formData.userName,
        formData.password,
        formData.email,
        formData.phoneNumber,
        formData.verifyCode,
    ]);

    if (signUpState === "VERIFY_CODE_FORM") {
        return (
            <motion.div
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={styles["sign-up-form"]}
            >
                <h1 className="content-heading">Verify Code</h1>
                <form action="#">
                    <div className={styles["controls"]}>
                        <label htmlFor="verifyCode"></label>
                        <input
                            type="verifyCode"
                            name="verifyCode"
                            id="verifyCode"
                            placeholder="Enter your verify code"
                            value={formData.verifyCode}
                            onChange={(e) => {
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        verifyCode: e.target.value,
                                    };
                                });
                            }}
                            required
                            className={`${
                                emailFocus && formData.email && !emailValid
                                    ? styles["err-input"]
                                    : ""
                            }`}
                        />
                        {verifyCodeErrMess ? (
                            <motion.p
                                transition={{ duration: 0.1 }}
                                initial={{ opacity: 0, scale: 0.4 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={styles["err-msg"]}
                            >
                                Wrong code!
                            </motion.p>
                        ) : (
                            ""
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            submitHandler();
                        }}
                        className="button"
                        style={{
                            marginTop: "3rem",
                        }}
                    >
                        Verify
                    </button>
                </form>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles["sign-up-form"]}
        >
            <h1 className="content-heading">Sign Up</h1>
            <form action="#">
                <div className={styles["controls"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        ref={emailRef}
                        value={formData.email}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return { ...prev, email: e.target.value };
                            });
                        }}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        className={`${
                            emailFocus && formData.email && !emailValid
                                ? styles["err-input"]
                                : ""
                        }`}
                    />
                    {emailFocus && formData.email && !emailValid ? (
                        <motion.p
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles["err-msg"]}
                        >
                            This email is not valid!
                        </motion.p>
                    ) : (
                        ""
                    )}
                    {emailErrMess ? (
                        <motion.p
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles["err-msg"]}
                        >
                            This email is already exist!
                        </motion.p>
                    ) : (
                        ""
                    )}
                </div>
                <div className={styles["controls"]}>
                    <label htmlFor="password">Username</label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter your username"
                        required
                        value={formData.userName}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return { ...prev, userName: e.target.value };
                            });
                        }}
                        onFocus={() => setUserNameFocus(true)}
                        onBlur={() => setUserNameFocus(false)}
                        className={`${
                            userNameFocus && formData.userName && !userNameValid
                                ? styles["err-input"]
                                : ""
                        }`}
                    />
                    {userNameFocus && formData.userName && !userNameValid ? (
                        <motion.p
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles["err-msg"]}
                        >
                            Your username must has more than 3 characters!
                        </motion.p>
                    ) : (
                        ""
                    )}
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
                            setFormData((prev) => {
                                return { ...prev, password: e.target.value };
                            });
                        }}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        className={`${
                            passwordFocus && formData.password && !passwordValid
                                ? styles["err-input"]
                                : ""
                        }`}
                    />
                    {passwordFocus && !passwordValid ? (
                        <motion.p
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles["err-msg"]}
                        >
                            Password must has more than 8 characters!
                        </motion.p>
                    ) : (
                        ""
                    )}
                </div>

                <div className={styles["controls"]}>
                    <label htmlFor="password">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return { ...prev, phoneNumber: e.target.value };
                            });
                        }}
                        onFocus={() => setPhoneNumberFocus(true)}
                        onBlur={() => setPhoneNumberFocus(false)}
                        className={`${
                            phoneNumberFocus &&
                            formData.phoneNumber &&
                            !phoneNumberValid
                                ? styles["err-input"]
                                : ""
                        }`}
                    />
                    {phoneNumberFocus &&
                    formData.phoneNumber &&
                    !phoneNumberValid ? (
                        <motion.p
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles["err-msg"]}
                        >
                            This phone number is not valid!
                        </motion.p>
                    ) : (
                        ""
                    )}

                    {phoneNumberMess ? (
                        <motion.p
                            transition={{ duration: 0.1 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles["err-msg"]}
                        >
                            This phone number is already exist!
                        </motion.p>
                    ) : (
                        ""
                    )}
                </div>

                <button
                    className="button"
                    onClick={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    Sign Up
                </button>
                <div className={styles["more"]}>
                    <motion.p
                        transition={{ duration: 0.1 }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        You can <Link to={"/login"}>log in here</Link>
                    </motion.p>
                </div>
            </form>
        </motion.div>
    );
};

export default SignUpForm;
