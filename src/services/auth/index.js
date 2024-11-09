import axios from "axios";

class Auth {
    constructor() {
        this.user = null;
    }

    async login(email, password) {
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

        if(response.data.error) {
            throw new Error(response.data.error);
        }

        return response.data;
    }

    async register(email, username, password) {
        const response = axios({
            method: "post",
            url: "/api/auth/register",
            data: {
                email,
                username,
                password
            }
        })
        if (response.data.token) {
            this.user = response.data;
        }

        if(response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    }
}