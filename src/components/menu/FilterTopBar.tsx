import { useCallback, useEffect, useState } from "react";
import styles from "./filter-top-bar.module.css";
import http from "../../utils/http";
import { useSearchParams } from "react-router-dom";
function FilterTopBar() {
    const [search, setSearch] = useSearchParams();
    const [categories, setCategories] = useState<string[] | null>([]);
    const [active, setActive] = useState<string | null>(
        search.get("category") || "All"
    );
    const [isLoading, setIsLoading] = useState(false);

    // we can fetch all category after:
    useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            try {
                const res = await http.get("/api/category/get-categories");
                setCategories(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, []);

    const sortCategory = useCallback(
        (category: string) => {
            search.set("category", category);
            setSearch(search, {
                replace: true,
            });
            search.set("page", "1");
            setSearch(search, {
                replace: true,
            });
            setActive(search.get("category"));
        },
        [search]
    );

    return (
        <div className={styles["filter-top-bar"]}>
            {isLoading ? (
                <p style={{ opacity: "0" }}>Loading...</p>
            ) : (
                <ul>
                    <li
                        onClick={() => {
                            sortCategory("All");
                        }}
                        className={active === "All" ? styles["active"] : ""}
                    >
                        All
                    </li>
                    {categories &&
                        categories.map((category) => {
                            return (
                                <li
                                    key={category}
                                    onClick={() => {
                                        sortCategory(category);
                                    }}
                                    className={
                                        active === category
                                            ? styles["active"]
                                            : ""
                                    }
                                >
                                    {category}
                                </li>
                            );
                        })}
                </ul>
            )}
        </div>
    );
}

export default FilterTopBar;
