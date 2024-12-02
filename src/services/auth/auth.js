import axios_instance from "@/interceptor/axios.js";
import CommonService from "@/services/common/common.js";
import {toast} from "sonner";

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
 * @property {string} picture_url - The user's image_url
 */
class AuthService {

    /**
     * Logs in a user
     * @param {string} username - The user's email
     * @param {string} password - The user's password
     * @returns {Promise<AuthResp>} - The response from the auth request
     * @throws {Error} - If there is an issue with the auth request
     */
    async login(username, password) {
        const response = await axios_instance.post('/auth/login', {
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
        const response = await axios_instance.post('/users/', {
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
        const response = await axios_instance.post('/oauth/login', data);
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
        const response = await axios_instance.post('/oauth/register', data);
        CService.storeTokenAndUser(response.data);
        return response.data;
    }

    /**
     * Reset the password for Google auth
     * @param username
     * @returns {Promise<any>}
     */
    async sendResetEmail(username) {
        const response = await axios_instance.post('/auth/send-reset-email', {
            username
        });
        toast.success('Reset Email sent successfully');
        return response.data;
    }

    /**
     * Reset the password for Google auth
     * @param token
     * @param newPassword
     * @returns {Promise<any>}
     */
    async resetPassword(token, newPassword) {
        const response = await axios_instance.post('/auth/reset', {
            token: token,
            new_password: newPassword
        });
        return response.data;
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