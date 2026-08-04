"use client";

import css from "./notes.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () =>
      fetchNotes({
        perPage: 12,
        search,
        page,
        tag,
      }),
    placeholderData: keepPreviousData,

    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={updateSearchQuery} />

        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
