"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import css from "./EditProfilePage.module.css";
import { useMutation } from "@tanstack/react-query";

export default function EditProfilePage() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  console.log(user);

  const [username, setUsername] = useState(user?.username ?? "");

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.push("/profile");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      username,
    });
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar ?? ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={mutation.isPending}
            >
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
