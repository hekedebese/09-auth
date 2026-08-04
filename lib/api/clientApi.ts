import { api } from "./api";
import type { Note, CreateNote } from "@/types/note";
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

interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UpdateMeRequest {
  username: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: GetNotesParams): Promise<GetNotesResponse> => {
  const { data } = await api.get<GetNotesResponse>("/notes", {
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
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: UpdateMeRequest): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);

  return data;
};
