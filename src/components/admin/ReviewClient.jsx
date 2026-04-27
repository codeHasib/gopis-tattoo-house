"use client";

import { useEffect, useState } from "react";

export default function ReviewClient() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/review/admin");
    const data = await res.json();
    setReviews(data.data);
  }

  async function approve(id) {
    await fetch(`/api/review/${id}`, {
      method: "PUT",
    });
    load();
  }

  async function remove(id) {
    await fetch(`/api/review/${id}`, {
      method: "DELETE",
    });
    load();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Review Moderation</h1>

      {reviews.map((r) => (
        <div key={r._id} className="border p-3 mb-3">
          <h2 className="font-bold">{r.name}</h2>
          <p>{r.message}</p>
          <p>⭐ {r.rating}</p>
          <p>Status: {r.status}</p>

          <div className="flex gap-2 mt-2">
            {r.status !== "approved" && (
              <button
                onClick={() => approve(r._id)}
                className="bg-green-500 text-white px-2"
              >
                Approve
              </button>
            )}

            <button
              onClick={() => remove(r._id)}
              className="bg-red-500 text-white px-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
