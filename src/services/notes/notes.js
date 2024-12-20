import axios_instance from "@/interceptor/axios.js";
import {toast} from "sonner";
/**
 * @constant {NotesService}
 * @type {{PAGE_SIZE: number, INITIAL_PAGE: number}}
 */
const PAGINATION_DEFAULTS = {
    PAGE_SIZE: 8,
    INITIAL_PAGE: 1,
    DESC_ORDER: 'desc'
}

/**
 * @typedef {Object} Note
 * @property {string} id - Unique identifier for the note
 * @property {string} title - Title of the note
 * @property {string} content - Content of the note
 * @property {boolean} is_public - is Public content
 * @property {string} image_url - Image URL
 * @property {JSON} tags - List of tags
 *
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
 * It uses an authentication instance passed during construction to handle any auth-related operations.
 */
class NotesService {
    /**
     * Get notes for routes
     * @param request
     * @param funcName
     * @returns {Promise<*>}
     */
      async getNotesForRoutes(request, funcName) {
        const url = new URL(request.url);
        const page = url.searchParams.get("page") || PAGINATION_DEFAULTS.INITIAL_PAGE;
        const pageSize = PAGINATION_DEFAULTS.PAGE_SIZE;
        const sort = PAGINATION_DEFAULTS.DESC_ORDER;
        const query = url.searchParams.get("query") || "";

        const noteService = new NotesService();
        let noteResp = await noteService[funcName](page, pageSize, query, sort);
        if (noteResp) {
            return noteResp;
        }
    }
    /**
     * Fetches notes based on provided identifiers.
     *
     * @param {number} page - The page number for pagination.
     * @param {number} pageSize - The number of notes per page.
     * @param {string} query - The search query for filtering notes.
     * @param {string} sort - The sorting criteria for the notes.
     * @param sort_by
     * @return {PaginatedResponse} A promise that resolves to an array of note objects.
     */
    async getNotes(page, pageSize, query, sort = "asc", sort_by = "created_at") {
        const resp = await axios_instance.get(`/notes/list/private?page=${page}&page_size=${pageSize}&sort_order=${sort}&sort_by=${sort_by}&query=${query}`);
        return resp.data;
    }

    /**
     * Fetches public notes.
     *
     * @param {number} page - The page number for pagination.
     * @param {number} pageSize - The number of notes per page.
     * @param {string} query - The search query for filtering notes.
     * @param {string} sort - The sorting criteria for the notes.
     * @param sort_by
     * @return {PaginatedResponse} A promise that resolves to an array of note objects.
     */
    async getPublicNotes(page, pageSize, query, sort = "asc", sort_by = "created_at") {
        const resp =  await axios_instance.get(`/notes/list/public?page=${page}&page_size=${pageSize}&sort_order=${sort}&sort_by=${sort_by}&query=${query}`);
        return resp.data;
    }

    /**
     * Get Note by id
     * @param noteId
     * @returns {Note}
     */
    async getNoteById(noteId) {
        try {
            const response = await axios_instance.get(`/notes/${noteId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching note with ID ${noteId}: ${error.message}`);
        }
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
            content: note.content,
            is_public: note.is_public,
            image_url: note.image_url,
            tags: note.tags
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
            content: note.content,
            is_public: note.is_public,
            image_url: note.image_url,
            tags: note.tags
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
        debugger;
        const resp = await axios_instance.delete(`/notes/${id}`);
        if (resp.data.success) {
            this.notes = this.notes.filter(note => note.id !== id);
        }
        return resp.data;
    }

    /**
     * Handles the click event on a note by navigating to the note's detailed view.
     *
     * @function
     * @param {Object} note - The note object containing information about the note.
     * @param {string} note.id - The unique identifier of the note.
     * @param {string} source - The origin or context from where the note was clicked.
     * @param {any} navigate - The navigation function used to change the current view or page.
     */
    handleNoteClick = (note, source, navigate) => {
        navigate(`/note/${note.id}?from=${source}`);
    };
}

export default NotesService;