import axios from "axios";
import axiosInstance from "@/interceptors/http.js";

const instance = axios.create();
instance.interceptors.request.use(axiosInstance);

/**
 * @typedef {Object} Note
 * @property {string} title - The title of note
 * @property {string} content - The content of note
 */

class AuthedNotesService {
    constructor(auth) {
        this.notes = [];
        this.auth = auth;  // Added an auth instance to the constructor
    }

    /**
     * Fetches notes based on provided identifiers.
     *
     * @param {Array<number>} ids - An array of note IDs to fetch.
     * @return {Promise<Array<Object>>} A promise that resolves to an array of note objects.
     */
    async getNotesByIds(ids) {
        try {
            const resp = await axios({
                method: "get",
                url: "/api/notes",
                params: {
                    ids
                }
            });
            return resp.data;
        } catch (e) {
            throw new Error('Invalid note');
        }
    }

    /**
     * Add note
     * @param {Note} note - The object of note (title, content)
     * @return {Object} The updated note data from the server.
     * @throws {Error} If the note is invalid or the server returns an error.
     */
    async addNote(note) {
        try {
            const resp = await axios({
                method: "post",
                url: "/api/notes",
                data: note
            });

            if (resp.data.success) {
                this.notes.push(resp.data);
            }
        } catch (e) {
            throw new Error('Invalid note');
        }
    }

    /**
     * Updates an existing note by sending a PUT request to the server.
     *
     * @param {Object} note - The note object to be updated.
     * @return {Object} The updated note data from the server.
     * @throws {Error} If the note is invalid or the server returns an error.
     */
    async updateNote(note) {
        try {
            const resp = await axios({
                method: "put",
                url: "/api/notes",
                data: note
            });
            if (resp.data.success) {
                this.notes.push(resp.data);
            }
            return resp.data;
        } catch (e) {
            throw new Error('Invalid note');
        }
    }

    /**
     * Removes a note with the specified ID by sending a delete request to the server.
     *
     * @param {string} id - The unique identifier of the note to be removed.
     * @return {Promise} A promise that resolves with the server response indicating the success or failure of the note removal.
     */
    async removeNote(id) {
        try {
            const resp = await axios({
                method: "delete",
                url: "/api/notes",
                data: {
                    id
                }
            });
            if (resp.data.success) {
                this.notes = this.notes.filter(note => note.id !== id);
            }
            return resp.data;
        } catch (e) {
            throw new Error('Invalid note');
        }
    }
}

export default AuthedNotesService;