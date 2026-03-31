import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/courses", { name, code });
      alert("Course created 🎉");
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating course");
    }
  };

  return (
    <div>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto"
      >
        <h2 className="text-xl mb-4 font-bold">Create Course</h2>

        <input
          placeholder="Course Name"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Course Code"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="bg-green-500 text-white px-4 py-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;