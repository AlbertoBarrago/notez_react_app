import axios from "axios";
import auth from "@/services/auth/index.js";
const auth_instance = new auth();
const token =  auth_instance.getToken();
const axios_instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Bearer ${token}`
    }
});

/**
 * @typedef {Object} Note
 * @property {string} title - The title of note
 * @property {string} content - The content of note
 */

/**
 * AuthedNotesService provides a service for managing notes with authorization.
 *
 * This class includes methods to fetch, add, update, and remove notes via HTTP requests to the server.
 * It uses an authentication instance passed during construction to handle any auth-related operations.
 */
class NotesService {
    constructor() {
        this.notes = [];
    }

    /**
     * Fetches notes based on provided identifiers.
     *
     * @param {Array<number>} ids - An array of note IDs to fetch.
     * @return {Promise<Array<Object>>} A promise that resolves to an array of note objects.
     */
    async getNotesByIds(ids) {
        try {
            const resp = await axios_instance.get('/notes', {
                params: {
                    ids: ids.join(',')
                }
            });
            return resp.data;
        } catch (e) {
            throw new Error('Invalid note');
        }
    }

    async getNotes() {
        try {
            console.log("Response data... loading");
            const resp = await axios_instance.get('/notes');
            console.log("Response data:", resp);
            return resp.data;
        } catch (e) {
            console.error("Error fetching notes:", e.message, e.stack);
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
            const resp = await axios_instance.post('/notes', note);
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
            const resp = await axios_instance.put('/notes', note);
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
            const resp = await axios_instance.delete(`/notes/${id}`);
            if (resp.data.success) {
                this.notes = this.notes.filter(note => note.id !== id);
            }
            return resp.data;
        } catch (e) {
            throw new Error('Invalid note');
        }
    }
}

export default NotesService;