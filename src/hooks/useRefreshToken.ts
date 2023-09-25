// import http from "../utils/http";
import { useAppDispatch } from "./store-hooks";
import { curUserActions } from "../stores/store-toolkit";
import http from "../utils/http";
const useRefreshToken = () => {
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
            console.log(error);
        }
    };
    return refresh;
};

export default useRefreshToken;
