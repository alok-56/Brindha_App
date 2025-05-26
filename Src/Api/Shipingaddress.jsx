import AsyncStorage from "@react-native-async-storage/async-storage"
import { BaseUrl } from "../Helper/Contant"

// Create Shioing Address
export const CreateShipingAddress = async (payload) => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/user/create/shipingaddress`, {
            method: "POST",
            body: JSON.stringify(payload),
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

// Fetch My Shiping Address

export const GetMyShiping = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/user/get/shipingaddress`, {
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