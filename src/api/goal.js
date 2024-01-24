import { API_URI } from "@/utils/config.js";

export class Goal {
    save = async (body, token) => {
        try {
            body.date = new Date(body.date)
            const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_GOAL}`
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": `${token}`,
                },
                body: JSON.stringify(body),
            });
            const result = await response.json()
            if (response.status !== 201) throw result
            return result
        } catch (error) {
            throw error
        }
    }

    getAll = async (token) => {
        try {
            const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_GOAL}`
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": `${token}`,
                },
            });
            const result = await response.json()
            if (response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }
    }

    update = async (body, token, id) => {
        try {
            body.date = new Date(body.date)
            const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_GOAL}/${id}`
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
            throw error
        }
    }

    delete = async (token, id) => {
        try {
            const url = `${API_URI}/${process.env.NEXT_PUBLIC_ENDPOINT_GOAL}/${id}`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": `${token}`,
                }
            });
            const result = await response.json()
            if (response.status !== 200) throw result
            return result
        } catch (error) {
            throw error
        }
    }

}