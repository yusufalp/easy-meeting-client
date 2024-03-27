import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CreateEventCalendar from "./CreateEventCalendar";
import { convertLocalDateTimeToMilliseconds } from "../../utils";

function CreateEvent() {
  const user = useSelector((state) => state.auth.user);

  const [createEventFormData, setCreateEventFormData] = useState({
    title: "",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "17:00",
    includeWeekends: false,
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  useEffect(() => {
    setSelectedTimeSlots((prevSlots) =>
      prevSlots.map((slots) =>
        slots.map((slot) =>
          slot && slot.weekend
            ? { ...slot, selected: createEventFormData.includeWeekends }
            : slot
        )
      )
    );
  }, [createEventFormData.includeWeekends]);

  useEffect(() => {
    const generateDates = (start, end) => {
      const dates = [];

      const currentDate = new Date(start);
      const lastDate = new Date(end);

      while (currentDate <= lastDate) {
        const row = Array(7).fill(null);

        let index = currentDate.getDay();
        for (let i = index; i < row.length; i++) {
          row[currentDate.getDay()] = {
            date: currentDate.getTime(),
            weekend: currentDate.getDay() === 6 || currentDate.getDay() === 0,
            selected: currentDate.getDay() !== 6 && currentDate.getDay() !== 0,
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }

        dates.push(row);
      }

      return dates;
    };

    const updatedDates = generateDates(
      `${createEventFormData.startDate}T${createEventFormData.startTime}`,
      `${createEventFormData.endDate}T${createEventFormData.endTime}`
    );

    setSelectedTimeSlots(updatedDates);
  }, [
    createEventFormData.endDate,
    createEventFormData.endTime,
    createEventFormData.startDate,
    createEventFormData.startTime,
  ]);

  const handleSelectedTimeSlotChange = (rowIndex, slotIndex) => {
    const updatedSlots = selectedTimeSlots.slice();

    updatedSlots[rowIndex][slotIndex] = {
      ...updatedSlots[rowIndex][slotIndex],
      selected: !updatedSlots[rowIndex][slotIndex].selected,
    };

    setSelectedTimeSlots(updatedSlots);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setCreateEventFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateEventFormSubmit = async (event) => {
    event.preventDefault();

    const timeSlots = [];

    for (let selectedTimeSlot of selectedTimeSlots) {
      for (let slot of selectedTimeSlot) {
        if (slot && slot.selected) {
          timeSlots.push({
            date: slot.date,
            participantAvailability: [],
            commonSlots: [],
          });
        }
      }
    }

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
      timeSlots,
    };

    console.log(body);
  };

  return (
    <div>
      <form className="form-bg" onSubmit={handleCreateEventFormSubmit}>
        <p className="legend">Create an event</p>
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
          />
          <label htmlFor="includeWeekends"> Include Weekends</label>
        </div>
        <button type="submit">Create</button>
        <p>* All fields are required</p>
      </form>
      {
        <CreateEventCalendar
          selectedTimeSlots={selectedTimeSlots}
          handleSelectedTimeSlotChange={handleSelectedTimeSlotChange}
        />
      }
    </div>
  );
}

export default CreateEvent;
