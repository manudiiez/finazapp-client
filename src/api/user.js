export class User {
    register = async (data) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_AUTH_REGISTER}`
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

    update = async (id, token, body) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_USERS}/${id}`
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`,
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
}