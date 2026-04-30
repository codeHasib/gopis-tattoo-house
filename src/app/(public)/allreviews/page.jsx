"use client";

import { useEffect, useState } from "react";

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();

        setReviews(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // empty state
  if (reviews.length === 0) {
    return <div>Nothing to show</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {reviews.map((rev) => (
        <div key={rev._id} className="border p-4 rounded">
          <h2 className="font-bold">{rev.name}</h2>

          <p className="text-sm text-gray-600">{rev.message}</p>

          <p>⭐ {rev.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default AllReviewsPage;
