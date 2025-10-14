import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFlow } from "../contexts/FlowContext";

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [selectedDate, setSelectedDate] = useState(
    userData.appointmentDate || ""
  );

  const handleNext = () => {
    if (selectedDate) {
      updateUserData({ appointmentDate: selectedDate });
      navigate("/thank-you");
    }
  };

  const handleBack = () => {
    navigate("/payment");
  };

  // Generate next 30 days for selection
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const availableDates = generateAvailableDates();

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1>Mark Your Calendar</h1>
        </div>

        <div className="content">
          <div className="calendar-info">
            <div className="icon">📅</div>
            <h2>Choose Your Delivery Date</h2>
            <p>
              Select when you'd like to receive your custom MBTI patch shirt.
            </p>
          </div>

          <div className="calendar-section">
            <h3>Available Dates</h3>
            <div className="date-grid">
              {availableDates.map((date, index) => {
                const dateString = date.toISOString().split("T")[0];
                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const dayNumber = date.getDate();
                const monthName = date.toLocaleDateString("en-US", {
                  month: "short",
                });

                return (
                  <button
                    key={index}
                    className={`date-option ${
                      selectedDate === dateString ? "selected" : ""
                    }`}
                    onClick={() => setSelectedDate(dateString)}
                  >
                    <div className="date-day">{dayName}</div>
                    <div className="date-number">{dayNumber}</div>
                    <div className="date-month">{monthName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="selected-date-info">
              <h3>Selected Date</h3>
              <p>
                Your order will be delivered on:{" "}
                <strong>
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </p>
            </div>
          )}
        </div>

        <div className="footer">
          <button
            className="primary-button"
            onClick={handleNext}
            disabled={!selectedDate}
          >
            Complete Order
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
