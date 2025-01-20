import React, { useState } from 'react';

function CreateSchedule() {
  const [schedule, setSchedule] = useState({
    subject: '',
    day: '',
    time: '',
  });

  const handleInputChange = (e:any) => {

    setSchedule((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your backend API call here
    console.log('Schedule Data:', schedule);

    alert('Schedule created successfully!');
    setSchedule({
      subject: '',
      day: '',
      time: '',
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={schedule.subject}
            onChange={handleInputChange}
            required
            placeholder="Enter subject name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Day</label>
          <select
            name="day"
            value={schedule.day}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="" disabled>
              Select Day
            </option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={schedule.time}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Create Schedule
        </button>
      </form>
    </div>
  );
}

export default CreateSchedule;
