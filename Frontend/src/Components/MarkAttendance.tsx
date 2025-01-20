import React, { useState } from 'react';

function MarkAttendance() {
  const [attendance, setAttendance] = useState({
    subject: '',
    date: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your backend API call here
    console.log('Attendance Data:', attendance);

    alert('Attendance marked successfully!');
    setAttendance({
      subject: '',
      date: '',
      status: '',
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={attendance.subject}
            onChange={handleInputChange}
            required
            placeholder="Enter subject name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={attendance.date}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={attendance.status}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
}

export default MarkAttendance;
