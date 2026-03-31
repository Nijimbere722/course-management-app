import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await API.get("/courses");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading courses</p>;

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl mb-4 font-bold">All Courses</h2>

        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Course
        </Link>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {data.map((course) => (
            <div
              key={course.id}
              className="border p-4 rounded shadow"
            >
              <h3 className="font-bold">{course.name}</h3>
              <p>{course.code}</p>

              <Link
                to={`/course/${course.id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;