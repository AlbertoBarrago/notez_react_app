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
                url: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_END_POINT}/login`,
                data: {
                    username,
                    password
                }
            });

            if (response.data) {
                this.user = response.data;
            }

            this.storeToken(response.data.access_token);
            this.storeUser(response.data.user);
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
                url: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_END_POINT}/register`,
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

    /**
     * Stores the provided token in local storage
     *
     * @param {string} token - The token to be stored.
     * @return {void}
     */
    storeToken(token) {
        localStorage.setItem('token', token);
    }

    /**
     * Retrieves the stored token from local storage.
     *
     * @return {string | null} The token if it exists, otherwise null.
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Stores the provided user object in the browser's local storage.
     *
     * @param {Object} user - The user object to be stored.
     * @return {void}
     */
    storeUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Retrieves the user data stored in localStorage.
     *
     * @return {Object|null} The parsed user data object if available, otherwise null.
     */
    getUser() {
       return JSON.parse(localStorage.getItem('user'));
    }

    isLoggedIn() {
        console.log(this.getUser());
        return !!this.getUser();
    }

    /**
     * Removes the 'token' item from the browser's local storage.
     * @return {void} No return value.
     */
    removeToken() {
        localStorage.removeItem('token');
    }
}

export default Auth;