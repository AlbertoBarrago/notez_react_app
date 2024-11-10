import axios from "axios";

class Auth {
    constructor() {
        this.user = null;
    }

    async login(email, password) {
        try {
            const response = axios({
                method: "post",
                url: "/api/auth/login",
                data: {
                    email,
                    password
                }
            });

            if (response.data.token) {
                this.user = response.data;
            }

            return response.data;

        } catch (e) {
            throw new Error(e.message);
        }

    }

    async register(email, username, password) {
        try {
            const response = await axios({
                method: "post",
                url: "/api/auth/register",
                data: {
                    email,
                    username,
                    password
                }
            });
            if (response.data.token) {
                this.user = response.data;
            }

            return response.data;

        } catch (e) {
            throw new Error(e.message);
        }

    }
}