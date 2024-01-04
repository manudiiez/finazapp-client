export class Category {
    getAll = async (token) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY}`
            const response = await fetch(url, {
                method: "GET",
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

    save = async (body, token) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY}`
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

    delete = async (id, token) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY}/${id}`
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