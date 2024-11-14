import axios from "axios";

const axios_instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});
/**
 * @typedef {Object} AuthResp
 * @property {string} access_token - The access_token
 * @property {string} token_type - The token_type
 */
class AuthService {

    /**
     * Logs in a user
     * @param {string} username - The user's email
     * @param {string} password - The user's password
     * @returns {Promise<AuthResp>} - The response from the login request
     * @throws {Error} - If there is an issue with the login request
     */
    async login(username, password) {
        const response = await axios_instance.post('/login', {
            username,
            password
        });

        this.storeTokenAndUser(response.data);
        return response.data;
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
        const response = await axios_instance.post('/users/register', {
            email,
            username,
            password
        });

        this.storeTokenAndUser(response.data);
        return response.data;
    }

    /**
     * Retrieves the stored token from local storage.
     *
     * @return {string | null} The token if it exists, otherwise null.
     */
    async getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Retrieves the token type from local storage.
     *
     * @return {string|null} The token type if it exists in local storage, or null if not found.
     */
    getTokenType() {
        return localStorage.getItem('token_type');
    }

    /**
     * Stores the user information and access token in local storage.
     *
     * @param {Object} data - The data object containing user information and token details.
     * @param {Object} data.user - User information object.
     * @param {string} data.access_token - Access token string.
     * @param {string} data.token_type - Type of the token.
     * @return {void}
     */
    storeTokenAndUser(data) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('token_type', data.token_type);
        localStorage.setItem('user', JSON.stringify(data.user));
    }

    /**
     * Retrieves the user data stored in localStorage.
     *
     * @return {Object|null} The parsed user data object if available, otherwise null.
     */
    getUser() {
       return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Checks if a user is currently logged in.
     *
     * This method logs the user information to the console
     * and returns a boolean indicating the user's logged-in status.
     *
     * @return {boolean} True if a user is logged in, otherwise false.
     */
    isLoggedIn() {
        return !!this.getUser();
    }

    /**
     * Removes the 'token' item from the browser's local storage.
     * @return {void} No return value.
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token_type');
    }
}

export default AuthService;