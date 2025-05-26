
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BaseUrl } from "../Helper/Contant"


// Create Order
export const CreateOrder = async (payload) => {
  
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/order/create/order`, {
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


// Verify Order
export const VerifyOrderOrder = async (payload) => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/order/verify/order`, {
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

// Fetch my Order

export const GetMyOrder= async () => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/order/my/order`, {
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