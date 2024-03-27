import React, { useState } from "react";
import { useSelector } from "react-redux";

import { convertLocalDateTimeToMilliseconds } from "../../utils";

function CreateEvent() {
  const user = useSelector((state) => state.auth.user);

  const [createEventFormData, setCreateEventFormData] = useState({
    title: "",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "17:00",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setCreateEventFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateEventFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      title: createEventFormData.title,
      start: convertLocalDateTimeToMilliseconds(
        createEventFormData.startDate,
        createEventFormData.startTime
      ),
      end: convertLocalDateTimeToMilliseconds(
        createEventFormData.endDate,
        createEventFormData.endTime
      ),
      ownerId: user._id,
    };

    console.log(body);
  };

  console.log(createEventFormData);

  return (
    <div>
      <h1>Create Event</h1>
      <form className="form-bg" onSubmit={handleCreateEventFormSubmit}>
        <label htmlFor="title">Event Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={createEventFormData.title}
          onChange={handleInputChange}
          required
        />
        <div className="group-row">
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              max="9999-12-31"
              value={createEventFormData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              step="300"
              value={createEventFormData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="group-row">
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              max="9999-12-31"
              min={createEventFormData.startDate}
              value={createEventFormData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              step="300"
              min={createEventFormData.startTime}
              value={createEventFormData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeWeekends"
            name="includeWeekends"
            checked={createEventFormData.includeWeekends}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="includeWeekends"> Include Weekends</label>
        </div>
        <button type="submit">Create</button>
        <p>* All fields are required</p>
      </form>
    </div>
  );
}

export default CreateEvent;
