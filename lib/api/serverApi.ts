import { cookies } from "next/headers";
import { api } from "./api";

import type { Note } from "@/types/note";
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

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: GetNotesParams): Promise<GetNotesResponse> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get<GetNotesResponse>("/notes", {
    headers: {
      Cookie: cookie,
    },
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

export const checkSession = async () => {
  const cookie = await getCookieHeader();

  return api.get("/auth/session", {
    headers: {
      Cookie: cookie,
    },
  });
};

export const getMe = async (): Promise<User> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};
