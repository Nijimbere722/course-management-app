import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-1">{course.name}</h3>
      <p className="text-gray-600 mb-3">{course.code}</p>

      <Link
        to={`/course/${course.id}`}
        className="text-blue-500 font-medium hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
};

export default CourseCard;