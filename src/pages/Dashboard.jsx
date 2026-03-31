import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Fetch all courses
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await API.get("/courses");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-700">Loading courses...</div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load courses
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Courses</h2>
          <Link
            to="/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Course
          </Link>
        </div>

        {data.length === 0 ? (
          <p className="text-gray-600">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;