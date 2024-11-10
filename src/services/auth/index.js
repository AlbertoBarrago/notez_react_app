import axios from "axios";

/**
 * @typedef {Object} AuthResp
 * @property {string} access_token - The access_token
 * @property {string} token_type - The token_type
 */
class Auth {
    constructor() {
        this.user = null;
    }

    /**
     * Logs in a user
     * @param {string} username - The user's email
     * @param {string} password - The user's password
     * @returns {Promise<AuthResp>} - The response from the login request
     * @throws {Error} - If there is an issue with the login request
     */
    async login(username, password) {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/api/v1/login", //TODO: add baseApi
                data: {
                    username,
                    password
                }
            });

            console.log(response.data)
            if (response.data) {
                this.user = response.data;
            }

            this.storeToken(response.data.access_token);
            return response.data;

        } catch (e) {
            throw new Error(e.message);
        }

    }

    /**
     * Registers a new user
     * @param {string} email - The user's email
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * @returns {Promise<Object>} - The response from the registration request
     * @throws {Error} - If there is an issue with the registration request
     */
    async register(email, username, password) {
        try {
            const response = await axios({
                method: "post",
                url: "/api/auth/register",  //TODO: fix me
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

    storeToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }
}

export default Auth;