// import http from "../utils/http";
import { useAppDispatch } from "./store-hooks";
import { curUserActions } from "../stores/store-toolkit";
import http from "../utils/http";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
const useRefreshToken = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const refresh = async function () {
        try {
            const response = await http.get("/refresh", {
                withCredentials: true,
            });
            dispatch(
                curUserActions.storeNewAccessToken(response.data.accessToken)
            );
            return response.data.accessToken;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    navigate("/login");
                    console.log("error");
                } else if (error.request) {
                    console.log(error.request);
                    navigate("/login");
                }
                dispatch(curUserActions.logout());
            }
        }
    };
    return refresh;
};

export default useRefreshToken;
