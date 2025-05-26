import AsyncStorage from "@react-native-async-storage/async-storage"
import { BaseUrl } from "../Helper/Contant"


// Login Api
export const LoginApi = async (payload) => {
    try {
        let res = await fetch(`${BaseUrl}/user/login/User`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        res = await res.json()
        return res

    } catch (error) {
        return error.message
    }
}

// Sign Up Api
export const SignUpApi = async (payload) => {
    try {
        let res = await fetch(`${BaseUrl}/user/create/User`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        })
        res = await res.json()
        return res

    } catch (error) {
        return error.message
    }
}

// Get My Profile
export const GetProfileApi = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/user/myprofile`, {
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

// Update Profile
export const UpdateProfileApi = async (payload) => {
    const token = await AsyncStorage.getItem("token")
    try {
        let res = await fetch(`${BaseUrl}/user/update/User`, {
            method: "PATCH",
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