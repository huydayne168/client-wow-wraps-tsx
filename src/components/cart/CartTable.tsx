import React, { useCallback, useMemo } from "react";
import styles from "./cart-table.module.css";
import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { Cart } from "../../models/cart";
import { useNavigate } from "react-router-dom";
const CartTable: React.FC<{ cart?: Cart }> = ({ cart }) => {
    const navigate = useNavigate();

    const cartDemo = useMemo(() => {
        return {
            _id: "1222",
            user: "huydayne",
            foods: [
                {
                    food: {
                        name: "Pho",
                        _id: "asdasdasd",
                        amount: 5,
                        price: 35,
                        rate: 4,
                        shortDescription: "this is the best food in VN",
                        longDescription:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente repellat laborum enim rem. Minus possimus saepe assumenda facere consequatur? Dignissimos incidunt illo cum sit cupiditate eius accusantium, impedit quis! Deserunt eius, dolores dolor recusandae, tempore ab ipsum exercitationem, facilis velit aperiam nemo ipsam pariatur? Debitis sapiente omnis laboriosam eius.",
                        tags: ["yummy", "a little spicy"],
                        category: "Lunch",
                        reviews: [
                            {
                                _id: "abc",
                                date: "04/07",
                                reviewContent: "this iis so good",
                                rate: 5,
                                user: {
                                    _id: "1",
                                    userName: "Huynguyen viet",
                                    avatar: "https://tse4.mm.bing.net/th?id=OIP.HgMixLfzHr2KOQyoJfbqwwHaHa&pid=Api&P=0&h=180",
                                    email: "huydayne1608@gmail.com",
                                },
                            },
                        ],
                        images: "https://tse3.mm.bing.net/th?id=OIP.BBCV7Fgtdg3PjEduyFAn3gHaE7&pid=Api&P=0&h=180",
                    },
                    amount: 2,
                },
                {
                    food: {
                        name: "Pho",
                        _id: "asdasdasd",
                        amount: 5,
                        price: 35,
                        rate: 4,
                        shortDescription: "this is the best food in VN",
                        longDescription:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente repellat laborum enim rem. Minus possimus saepe assumenda facere consequatur? Dignissimos incidunt illo cum sit cupiditate eius accusantium, impedit quis! Deserunt eius, dolores dolor recusandae, tempore ab ipsum exercitationem, facilis velit aperiam nemo ipsam pariatur? Debitis sapiente omnis laboriosam eius.",
                        tags: ["yummy", "a little spicy"],
                        category: "Lunch",
                        reviews: [
                            {
                                _id: "abc",
                                date: "04/07",
                                reviewContent: "this iis so good",
                                rate: 5,
                                user: {
                                    _id: "1",
                                    userName: "Huynguyen viet",
                                    avatar: "https://tse4.mm.bing.net/th?id=OIP.HgMixLfzHr2KOQyoJfbqwwHaHa&pid=Api&P=0&h=180",
                                    email: "huydayne1608@gmail.com",
                                },
                            },
                        ],
                        images: "https://tse3.mm.bing.net/th?id=OIP.BBCV7Fgtdg3PjEduyFAn3gHaE7&pid=Api&P=0&h=180",
                    },
                    amount: 2,
                },
                {
                    food: {
                        name: "Pho",
                        _id: "asdasdasd",
                        amount: 5,
                        price: 35,
                        rate: 4,
                        shortDescription: "this is the best food in VN",
                        longDescription:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente repellat laborum enim rem. Minus possimus saepe assumenda facere consequatur? Dignissimos incidunt illo cum sit cupiditate eius accusantium, impedit quis! Deserunt eius, dolores dolor recusandae, tempore ab ipsum exercitationem, facilis velit aperiam nemo ipsam pariatur? Debitis sapiente omnis laboriosam eius.",
                        tags: ["yummy", "a little spicy"],
                        category: "Lunch",
                        reviews: [
                            {
                                _id: "abc",
                                date: "04/07",
                                reviewContent: "this iis so good",
                                rate: 5,
                                user: {
                                    _id: "1",
                                    userName: "Huynguyen viet",
                                    avatar: "https://tse4.mm.bing.net/th?id=OIP.HgMixLfzHr2KOQyoJfbqwwHaHa&pid=Api&P=0&h=180",
                                    email: "huydayne1608@gmail.com",
                                },
                            },
                        ],
                        images: "https://tse3.mm.bing.net/th?id=OIP.BBCV7Fgtdg3PjEduyFAn3gHaE7&pid=Api&P=0&h=180",
                    },
                    amount: 2,
                },
                {
                    food: {
                        name: "Pho",
                        _id: "asdasdasd",
                        amount: 5,
                        price: 35,
                        rate: 4,
                        shortDescription: "this is the best food in VN",
                        longDescription:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente repellat laborum enim rem. Minus possimus saepe assumenda facere consequatur? Dignissimos incidunt illo cum sit cupiditate eius accusantium, impedit quis! Deserunt eius, dolores dolor recusandae, tempore ab ipsum exercitationem, facilis velit aperiam nemo ipsam pariatur? Debitis sapiente omnis laboriosam eius.",
                        tags: ["yummy", "a little spicy"],
                        category: "Lunch",
                        reviews: [
                            {
                                _id: "abc",
                                date: "04/07",
                                reviewContent: "this iis so good",
                                rate: 5,
                                user: {
                                    _id: "1",
                                    userName: "Huynguyen viet",
                                    avatar: "https://tse4.mm.bing.net/th?id=OIP.HgMixLfzHr2KOQyoJfbqwwHaHa&pid=Api&P=0&h=180",
                                    email: "huydayne1608@gmail.com",
                                },
                            },
                        ],
                        images: "https://tse3.mm.bing.net/th?id=OIP.BBCV7Fgtdg3PjEduyFAn3gHaE7&pid=Api&P=0&h=180",
                    },
                    amount: 2,
                },
            ],
        };
    }, []);

    const gotoCheckout = useCallback(() => {
        navigate("/checkout-page", { state: cartDemo });
    }, [navigate, cartDemo]);

    return (
        <div className={`${styles["cart-table"]} content-container`}>
            <h2 className="content-heading">Your Cart</h2>

            <TableContainer
                className={styles["table"]}
                component={Paper}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.10);",
                    marginTop: "3rem",
                    border: "2px solid #fff",
                    // maxHeight: "50rem",
                }}
            >
                <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    stickyHeader
                >
                    <TableHead>
                        <TableRow sx={{ height: "5rem", padding: ".8rem" }}>
                            <TableCell
                                sx={{ color: "#000", fontSize: "2.4rem" }}
                                align="center"
                            >
                                Food
                            </TableCell>
                            <TableCell
                                sx={{ color: "#000", fontSize: "2.4rem" }}
                                align="center"
                            >
                                Price
                            </TableCell>
                            <TableCell
                                sx={{ color: "#000", fontSize: "2.4rem" }}
                                align="center"
                            >
                                Quantity
                            </TableCell>
                            <TableCell
                                sx={{ color: "#000", fontSize: "2.4rem" }}
                                align="center"
                            >
                                Subtotal
                            </TableCell>
                            <TableCell
                                sx={{ color: "#000", fontSize: "2.4rem" }}
                                align="center"
                            >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartDemo.foods.map((food) => (
                            <TableRow
                                // key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                    borderColor: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                <TableCell
                                    sx={{ color: "#fff", fontSize: "1.6rem" }}
                                    align="center"
                                >
                                    <div className={styles["food-desc"]}>
                                        <img src={food.food.images} alt="" />
                                        <div className={styles["name"]}>
                                            {food.food.name}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell
                                    sx={{ color: "#fff", fontSize: "1.6rem" }}
                                    align="center"
                                >
                                    ${food.food.price}
                                </TableCell>
                                <TableCell
                                    sx={{ color: "#fff", fontSize: "1.6rem" }}
                                    align="center"
                                >
                                    <table className={styles["change-amount"]}>
                                        <thead>
                                            <tr>
                                                <td>-</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name="amount"
                                                        id="amount"
                                                        value={food.amount}
                                                    />
                                                </td>
                                                <td>+</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </TableCell>
                                <TableCell
                                    sx={{ color: "#fff", fontSize: "1.6rem" }}
                                    align="center"
                                >
                                    ${food.amount * food.food.price}
                                </TableCell>
                                <TableCell
                                    sx={{ color: "#fff", fontSize: "1.6rem" }}
                                    align="center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                            stroke="white"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M20.708 6.23975H3.75"
                                            stroke="white"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                            stroke="white"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <form className={styles["actions-form"]}>
                <div className={styles["coupon"]}>
                    <input
                        type="text"
                        name="coupon"
                        id="coupon"
                        placeholder="Enter a coupon"
                    />
                    <button className={`button`}>Apply Coupon</button>
                    <button className="button">Update Your Cart</button>
                </div>
                <div
                    onClick={gotoCheckout}
                    className={`${styles["goto-checkout"]} button`}
                >
                    Proceed to Checkout
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="56"
                        height="26"
                        viewBox="0 0 56 26"
                        fill="none"
                    >
                        <path
                            d="M1 13H55M55 13C50.9091 12.36 42.7273 9.064 42.7273 1M55 13C50.9091 13.64 42.7273 16.936 42.7273 25"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </form>
        </div>
    );
};

export default CartTable;
