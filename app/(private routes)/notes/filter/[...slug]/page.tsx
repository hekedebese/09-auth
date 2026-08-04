import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0];

  const pageTitle =
    tag === "all" ? "All notes | NoteHub" : `${tag} notes | NoteHub`;

  const pageDescription =
    tag === "all" ? "Browse all notes." : `Browse all ${tag} notes.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://08-zustand-one-bay.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
