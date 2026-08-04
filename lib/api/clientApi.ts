import type { Note, CreateNote } from "@/types/note";
import { nextServer } from "./api";
import type { User } from "@/types/user";

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

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: GetNotesParams): Promise<GetNotesResponse> => {
  const { data } = await nextServer.get<GetNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return data;
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

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const { data } = await nextServer.put<User>("/auth/me", payload);
  return data;
};
