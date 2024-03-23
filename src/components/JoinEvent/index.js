import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function JoinEvent() {
  const user = useSelector((state) => state.auth.user);

  const [eventId, setEventId] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setEventId(event.target.value);
  };

  const handleJoinEventFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/events/${eventId}/participants`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate(`/dashboard/${user._id}/events/${eventId}`);
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {}
  };
  return (
    <div>
      <h1>Join Event</h1>
      <form className="form-bg" onSubmit={handleJoinEventFormSubmit}>
        <label htmlFor="eventId">Event Id</label>
        <input
          type="text"
          name="eventId"
          id="eventId"
          value={eventId}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={!eventId}>
          Join
        </button>
      </form>
    </div>
  );
}

export default JoinEvent;
