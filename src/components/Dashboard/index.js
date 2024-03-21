import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const [userEventsDetails, setUserEventsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getUserEventsAndDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/userAvailability/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          const eventsDetailsPromises = result.data.events.map(
            async (eventId) => {
              const eventResponse = await fetch(
                `http://localhost:8080/api/events/${eventId}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const eventResult = await eventResponse.json();

              if (eventResult.success) {
                return eventResult.data;
              } else {
                throw new Error(eventResult.error.message);
              }
            }
          );

          const eventsDetails = await Promise.all(eventsDetailsPromises);

          setUserEventsDetails(eventsDetails);
        } else {
          throw new Error(result.error.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getUserEventsAndDetails();
    }
  }, [user]);

  return (
    <main>
      <h1>Welcome to your dashboard, {user.firstName}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : userEventsDetails.length > 0 ? (
        <>
          <h2>Registered Events</h2>
          <ul>
            {userEventsDetails.map((userEvent) => (
              <li key={userEvent._id}>
                <span>{userEvent.title}</span>
                <Link to={`${user._id}/events/${userEvent._id}`}>Details</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>There are no registered events</p>
      )}
    </main>
  );
}

export default Dashboard;
