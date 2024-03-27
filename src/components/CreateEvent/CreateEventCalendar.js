import React from "react";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function CreateEventCalendar({ timeSlots }) {
  return (
    <table className="table-bg">
      <caption>Confirm the selected days below</caption>
      <thead>
        <tr>
          {daysOfWeek.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((row) => (
          <tr>
            {row.map((slot) => (
              <td className={slot && slot.selected ? "selected" : ""}>
                {slot && new Date(slot.date).getDate()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CreateEventCalendar;
