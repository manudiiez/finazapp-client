export class Transaction {
    getResume = async (startDate, endDate, token) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_TRANSACTION_RESUME}?startDate=${startDate}&endDate=${endDate}`
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

    getAll = async (token) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_ENDPOINT_TRANSACTION}`
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
}