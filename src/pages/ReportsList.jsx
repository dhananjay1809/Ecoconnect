import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reportsWithImages");
        setReports(res.data);
      } catch (error) {
        console.error("❌ Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 🔑 Admin login handler
  const handleLogin = () => {
    const entered = prompt("Enter Admin Password:");
    if (entered === "supersecret123") {
      setIsAdmin(true);
      setAdminKey(entered);
      alert("✅ Admin access granted!");
    } else {
      alert("❌ Incorrect password!");
    }
  };

  // 🗑️ Delete report (admin only)
  const handleDelete = async (category, filename) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/delete/${category}/${filename}?adminKey=${adminKey}`
      );
      alert("✅ Report deleted successfully!");
      setReports(reports.filter(r => !(r.category === category && r.name === filename)));
    } catch (error) {
      console.error("❌ Error deleting report:", error);
      alert("❌ Failed to delete report.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        {/* 🔐 Admin Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📁 Reports List</h1>

          {!isAdmin ? (
            <button
              onClick={handleLogin}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Login as Admin
            </button>
          ) : (
            <span className="text-green-700 font-semibold">Admin Mode ✅</span>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500">No reports found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2">#</th>
                <th className="border p-2 text-center">Image</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">File Name</th>
                <th className="border p-2">Date</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>

                  {/* 🖼️ Image Column */}
                  <td className="border p-2 text-center">
                    {report.image ? (
                      <img
                        src={report.image}
                        alt="Report"
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>

                  <td className="border p-2 capitalize">{report.category}</td>
                  <td className="border p-2 text-blue-600 break-all">{report.name}</td>
                  <td className="border p-2">
                    {new Date(report.date).toLocaleString()}
                  </td>

                  {/* ⚙️ Action Buttons */}
                  <td className="border p-2 text-center space-x-2">
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View
                    </a>
                    <a
                      href={`http://localhost:5000/api/download/${report.category}/${report.name}`}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Download
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(report.category, report.name)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
