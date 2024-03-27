import React from "react";

import { DAYS_OF_WEEK } from "../../constants";

function CreateEventCalendar({ selectedTimeSlots, handleSelectedTimeSlotChange }) {
  return (
    <table className="table-bg">
      <caption>Confirm the selected days below</caption>
      <thead>
        <tr>
          {DAYS_OF_WEEK.map((day, index) => (
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
                onClick={() => handleSelectedTimeSlotChange(rowIndex, slotIndex)}
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
