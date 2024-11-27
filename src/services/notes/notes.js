import axios_instance from "@/interceptor/axios.js";


/**
 * @typedef {Object} Note
 * @property {string} id - Unique identifier for the note
 * @property {string} title - Title of the note
 * @property {string} content - Content of the note
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array<Note>} items - Array of notes
 * @property {number} page - Current page number
 * @property {number} page_size - Number of items per page
 * @property {number} total - Total number of items
 * @property {number} total_pages - Total number of pages
 */


/**
 * AuthedNotesService provides a service for managing notes with authorization.
 *
 * This class includes methods to fetch, add, update, and remove notes via HTTP requests to the server.
 * It uses an authentication instance passed during construction to handle any login-related operations.
 */
class NotesService {
    /**
     * Fetches notes based on provided identifiers.
     *
     * @param {number} page - The page number for pagination.
     * @param {number} pageSize - The number of notes per page.
     * @param {string} query - The search query for filtering notes.
     * @param {string} sort - The sorting criteria for the notes.
     * @return {PaginatedResponse} A promise that resolves to an array of note objects.
     */
    async getNotes(page, pageSize, query, sort = "asc") {
        const resp = await axios_instance.get(`/notes/list/paginated?page=${page}&page_size=${pageSize}&sort_order=${sort}&query=${query}`);
        return resp.data;
    }

    /**
     * Fetches public notes.
     *
     * @param {number} page - The page number for pagination.
     * @param {number} pageSize - The number of notes per page.
     * @param {string} query - The search query for filtering notes.
     * @param {string} sort - The sorting criteria for the notes.
     * @return {PaginatedResponse} A promise that resolves to an array of note objects.
     */
    async getPublicNotes(page, pageSize, query, sort = "asc") {
        const resp = await axios_instance.get(`/notes/list/explore?page=${page}&page_size=${pageSize}&sort_order=${sort}&query=${query}`);
        return resp.data;
    }

    /**
     * Add note
     * @param {Note} note - The object of note (title, content)
     * @return {Object} The updated note data from the server.
     * @throws {Error} If the note is invalid or the server returns an error.
     */
    async addNote(note) {
        const resp = await axios_instance.post('/notes/', {
            title: note.title,
            content: note.content
        });

        return resp.data;
    }

    /**
     * Updates an existing note by sending a PUT request to the server.
     *
     * @param {Object} note - The note object to be updated.
     * @return {Object} The updated note data from the server.
     * @throws {Error} If the note is invalid or the server returns an error.
     */
    async updateNote(note) {
        const resp = await axios_instance.put(`/notes/${note.id}`, {
            title: note.title,
            content: note.content
        });

        return resp.data;
    }

    /**
     * Removes a note with the specified ID by sending a delete request to the server.
     *
     * @param {string} id - The unique identifier of the note to be removed.
     * @return {Promise} A promise that resolves with the server response indicating the success or failure of the note removal.
     */
    async removeNote(id) {
        const resp = await axios_instance.delete(`/notes/${id}`);
        if (resp.data.success) {
            this.notes = this.notes.filter(note => note.id !== id);
        }
        return resp.data;
    }
}

export default NotesService;