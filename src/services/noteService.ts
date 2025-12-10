import axios from 'axios'
import type {Note} from '../types/note'

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface MutateNote {
    title: string;
    content: string;
    tag: string;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(query: string, page: number) {
    const res = await axios.get<FetchNotesResponse>('/notes', {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
        params: {
            search: query,
            page: page, 
            perPage: 12
        }
    });

    return res.data;

}

export async function createNote(note: MutateNote) {
    const res = await axios.post<Note>('/notes', note, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    return res.data;
}

export async function deleteNote(id: string) { 
    const res = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    return res.data;
}