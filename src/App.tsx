import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayOut from "./components/layout/RootLayOut";
import HomePage from "./pages/HomePage";
import { screenActions } from "./stores/store-toolkit";
import { useAppDispatch } from "./hooks/store-hooks";
import MenuPage from "./pages/MenuPage";
import DetailProductPage from "./pages/DetailProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
    // const screenWidth = useSelector((state: any) => state.screenWidth);
    const dispatch = useAppDispatch();
    // change ui when screen width less than 768px:
    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener("change", (e) => {
                console.log(e.matches);
                if (e.matches) {
                    dispatch(screenActions.setLarge());
                } else {
                    dispatch(screenActions.setSmall());
                }
            });
    }, [dispatch]);
    const route = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },

        {
            path: "/sign-up",
            element: <SignUp />,
        },
        {
            element: <RootLayOut />,
            path: "",
            children: [
                {
                    element: <HomePage />,
                    path: "/",
                },
                {
                    element: <MenuPage />,
                    path: "/menu",
                },
                {
                    element: <DetailProductPage />,
                    path: "/detail-page",
                },
                {
                    element: <CartPage />,
                    path: "/cart-page",
                },
                {
                    element: <CheckoutPage />,
                    path: "/checkout-page",
                },
                {
                    element: <Profile />,
                    path: "/profile",
                },
            ],
        },
    ]);

    return <RouterProvider router={route} />;
}

export default App;
