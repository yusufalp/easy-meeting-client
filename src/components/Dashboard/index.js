import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const [userEvents, setUserEvents] = useState([]);
  const [userEventsDetails, setUserEventsDetails] = useState([]);

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
          setUserEvents(result.data.events);

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
      }
    };

    if (user) {
      getUserEventsAndDetails();
    }
  }, [user]);

  console.log(userEvents);
  console.log(userEventsDetails);

  return (
    <div>
      <h1>Dashboard for {user.firstName}</h1>
      <table>
        <thead>
          <tr>
            <td>Event Title</td>
            <td colSpan={2}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {userEventsDetails &&
            userEventsDetails.map((userEvent) => (
              <tr key={userEvent._id}>
                <td>{userEvent.title}</td>
                <td>
                  <button>Details</button>
                </td>
                <td>
                  <button>{userEvent.owner === user._id && "Archive"}</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
