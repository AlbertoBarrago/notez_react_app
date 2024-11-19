import axios_instance from "@/interceptor/axios.js";
import CommonService from "@/services/common/common.js";

const CService = new CommonService();
/**
 * @typedef {Object} AuthResp
 * @property {string} access_token - The access_token
 * @property {string} token_type - The token_type
 */

/**
 * @typedef {Object} User
 * @property {string} id - The user's ID
 * @property {string} username - The user's username
 * @property {string} email - The user's email
 * @property {string} created_at - The date the user was created
 * @property {string} role - The user's role
 * @property {string} picture - The user's image_url
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

        CService.storeTokenAndUser(response.data);
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

        CService.storeTokenAndUser(response.data);
        return response.data;
    }

    /**
     * Google OAuth LoginForm
     * @param data
     * @returns {Promise<any>}
     */
    async googleOAuth(data) {
        delete data.select_by
        const response = await axios_instance.post('/oauth/google', data);
        CService.storeTokenAndUser(response.data);
        return response.data;
    }

    /**
     * Google OAuth Register
     * @param data
     * @returns {Promise<any>}
     */
    async googleAuthSignup(data) {
        delete data.select_by
        const response = await axios_instance.post('/users/register/google', data);
        CService.storeTokenAndUser(response.data);
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
     * Retrieves the user data stored in localStorage.
     *
     * @return {User|null} The parsed user data object if available, otherwise null.
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