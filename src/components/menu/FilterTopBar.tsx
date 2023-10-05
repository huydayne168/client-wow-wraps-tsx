import { useCallback, useEffect, useState } from "react";
import styles from "./filter-top-bar.module.css";
import http from "../../utils/http";
import { useSearchParams } from "react-router-dom";
function FilterTopBar() {
    const [search, setSearch] = useSearchParams();
    const [categories, setCategories] = useState<any[] | null>([]);
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

    console.log(categories);

    const sortCategory = useCallback(
        (categoryId: string) => {
            search.set("category", categoryId);
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
                                    key={category._id}
                                    onClick={() => {
                                        sortCategory(category._id);
                                    }}
                                    className={
                                        active === category._id
                                            ? styles["active"]
                                            : ""
                                    }
                                >
                                    {category.name}
                                </li>
                            );
                        })}
                </ul>
            )}
        </div>
    );
}

export default FilterTopBar;
