import React from "react";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function CreateEventCalendar({ selectedTimeSlots, handleSelectedSlotChange }) {
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
        {selectedTimeSlots.map((row, rowIndex) => (
          <tr>
            {row.map((slot, slotIndex) => (
              <td
                className={slot && slot.selected ? "selected" : ""}
                onClick={() => handleSelectedSlotChange(rowIndex, slotIndex)}
              >
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
