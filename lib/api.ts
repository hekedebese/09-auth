import axios from "axios";
import type { Note, CreateNote } from "@/types/note";
import type { User, RegisterRequest } from "@/types/user";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface GetNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export const getNotes = async ({
  page,
  perPage,
  search,
  tag,
}: GetNotesParams): Promise<GetNotesResponse> => {
  const res = await nextServer.get<GetNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return res.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
