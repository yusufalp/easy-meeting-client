import React from "react";

import { DAYS_OF_WEEK, MONTHS_OF_YEAR } from "../../constants";

function CreateEventCalendar({
  selectedTimeSlots,
  handleSelectedTimeSlotChange,
}) {
  return (
    <table>
      <caption>Confirm the selected days below</caption>
      <caption>Update single date by clicking on it</caption>
      <thead>
        <tr>
          <th>Month</th>
          {DAYS_OF_WEEK.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {selectedTimeSlots.map((row, rowIndex) => (
          <tr>
            <td>
              {
                MONTHS_OF_YEAR[
                  new Date(row.find((el) => el !== null).date).getMonth()
                ]
              }
            </td>
            {row.map((slot, slotIndex) => (
              <td
                className={slot && slot.selected ? "selected" : ""}
                onClick={() =>
                  handleSelectedTimeSlotChange(rowIndex, slotIndex)
                }
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
