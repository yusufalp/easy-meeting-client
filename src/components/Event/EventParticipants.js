import React, { useEffect, useState } from "react";

function EventParticipants({ participants }) {
  const [participantsDetails, setParticipantsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getParticipantsDetails = async () => {
      try {
        const participantsDetailsPromises = participants.map(
          async (participant) => {
            const response = await fetch(
              `http://localhost:8080/api/users/${participant}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const result = await response.json();

            if (result.success) {
              return result.data;
            } else {
              throw new Error(`Failed to fetch participants details!`);
            }
          }
        );

        const details = await Promise.all(participantsDetailsPromises);

        setParticipantsDetails(details);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getParticipantsDetails();
  }, [participants]);

  return (
    <>
      <h3>Participants</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {participantsDetails.map((participant) => (
            <li key={participant._id}>{participant.firstName}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default EventParticipants;
