"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !message || !rating) {
      alert("All fields required");
      return;
    }

    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message, rating }),
    });

    const data = await res.json();

    alert(data.message);

    setName("");
    setMessage("");
    setRating(5);
  }

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Your Review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="5"
          className="border p-2 w-full"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2">
          Submit
        </button>

      </form>

    </div>
  );
}