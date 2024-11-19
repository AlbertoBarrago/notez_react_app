import axios_instance from "@/interceptor/index.js";
import CommonService from "@/services/common/index.js";

/**
 * @typedef {Object} AuthResp
 * @type {CommonService}
 */
const CService = new CommonService();

class RegisterService {
    /**
     * Registers a new user
     */
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
}

export default new RegisterService;