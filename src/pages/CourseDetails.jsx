import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  // 📡 Fetch course by ID
  const { data, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await API.get(`/courses/${id}`);
      return res.data;
    },
  });

  // Pre-fill form when data loads
  useEffect(() => {
    if (data) {
      setName(data.name);
      setCode(data.code);
    }
  }, [data]);

  // ✏️ Update mutation
  const updateMutation = useMutation({
    mutationFn: async () => {
      return API.put(`/courses/${id}`, { name, code });
    },
    onSuccess: () => {
      alert("Course updated ✅");
      setIsEditing(false);
      queryClient.invalidateQueries(["course", id]);
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => {
      alert("Update failed ❌");
    },
  });

  // 🗑️ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return API.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      alert("Course deleted 🗑️");
      navigate("/dashboard");
    },
    onError: () => {
      alert("Delete failed ❌");
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-lg mx-auto">
        {!isEditing ? (
          <div className="border p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
            <p className="mb-4">Code: {data.code}</p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateMutation.mutate();
            }}
            className="border p-6 rounded shadow"
          >
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 mb-3 w-full"
            />

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-2 mb-3 w-full"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;