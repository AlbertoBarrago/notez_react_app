class CommonService {
    /**
     * Fetches a list of all tags.
     */

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
}

export default CommonService;