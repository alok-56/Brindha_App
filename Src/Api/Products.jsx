import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "../Helper/Contant";

// Fetch cateogery
export const GetCategries = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/master/users/get/cateogries`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'token': token
            }
        })
        res = await res.json()
        return res

    } catch (error) {
        return error.message
    }
}


//fetch products
export const FetchProductApi = async (page = 1, filters = {}) => {
    const token = await AsyncStorage.getItem("token");

    const queryParams = new URLSearchParams();

    queryParams.append("page", page.toString());
    queryParams.append("limit", "10");

    if (filters.minPrice !== undefined) queryParams.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.discount !== undefined) queryParams.append("discount", filters.discount.toString());
    if (filters.search !== undefined && filters.search !== "") queryParams.append("search", filters.search);
    if (filters.CategoryId) queryParams.append("CategoryId", filters.CategoryId);
    if (filters.SubcategoryId) queryParams.append("SubcategoryId", filters.SubcategoryId);
    if (filters.Ecofriendly !== undefined) queryParams.append("Ecofriendly", filters.Ecofriendly.toString());
    if (filters.tag) queryParams.append("tag", filters.tag);

    const url = `${BaseUrl}/product/users/get/products?${queryParams.toString()}`;

    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                token,
            },
        });
        res = await res.json();
        console.log(res)
        return res;
    } catch (error) {
        return { status: false, message: error.message };
    }
};
