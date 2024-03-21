import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Event() {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

  useEffect(() => {
    const getCurrentEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/events/${eventId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setCurrentEvent(result.data);
        } else {
          throw new Error(result.error.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentEvent();
  }, [eventId]);

  console.log("ce", currentEvent);
  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{currentEvent.title}</h2>
          <p>Participants</p>
          <ul>
            {currentEvent.participants.map((participant) => (
              <li key={participant}>{participant}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default Event;
