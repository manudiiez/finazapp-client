import { API_URI } from "@/utils/config.js";

export class User {
    register = async (data) => {
        try {
            const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_AUTH_REGISTER}`
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json()
            if (response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }
    }

    update = async (body, token) => {
        try {
            const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_AUTH_UPDATE}`
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": `${token}`,
                },
                body: JSON.stringify(body),
            });
            const result = await response.json()
            if (response.status !== 200) throw result
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}