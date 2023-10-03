import React, { useEffect, useState } from "react";
import styles from "./user-data.module.css";
import { Avatar, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import http from "../../utils/http";
import { useAppSelector } from "../../hooks/store-hooks";
import { User } from "../../models/user";
import { Checkout } from "../../models/checkout";
import Checkouts from "./Checkouts";
const UserData: React.FC<{}> = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const [userInfo, setUserInfo] = useState<User>();
    const [userCheckouts, setUserCheckouts] = useState<Checkout[]>([]);

    // get user checkout:
    useEffect(() => {
        const getUserCheckouts = async () => {
            try {
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN + "/user/get-user",
                    {
                        params: {
                            _id: currentUser._id,
                        },
                    }
                );
                setUserInfo(res.data.foundUser);
                setUserCheckouts(res.data.userCheckouts);
            } catch (error) {
                console.log(error);
            }
        };
        getUserCheckouts();
    }, [currentUser._id]);
    console.log(userInfo);

    return (
        <div className={`${styles["user-data"]} content-container`}>
            <h2 className="content-heading">Profile</h2>

            <div className={`${styles["user-info"]} content-container`}>
                <Avatar className={styles["avatar"]}>
                    {userInfo?.userName.toUpperCase()[0]}
                </Avatar>

                <div className={styles["user-info-desc"]}>
                    <div className={styles["info-type"]}>
                        <span>Name:</span> <span>{userInfo?.userName}</span>
                    </div>
                    <div className={styles["info-type"]}>
                        <span>Email:</span> <span>{userInfo?.email}</span>
                    </div>
                    <div className={styles["info-type"]}>
                        <span>Phone Number:</span>{" "}
                        <span>{userInfo?.phoneNumber}</span>
                    </div>
                </div>
            </div>

            <Checkouts checkouts={userCheckouts} />
        </div>
    );
};

export default UserData;
