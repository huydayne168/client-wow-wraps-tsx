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
            ],
        },
    ]);
    return <RouterProvider router={route} />;
}

export default App;
