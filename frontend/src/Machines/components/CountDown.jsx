import React, { useState, useEffect } from "react";
import axios from "axios";
 

function Countdown({ startTime, targetTime, machineId }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(startTime, targetTime));
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft(startTime, targetTime);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 1 &&
        newTimeLeft.seconds === 0 &&
        !notificationSent
      ) {
        sendLineNotification();
        setNotificationSent(true); // Ensure notification is sent only once
      }

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        updateMachine();
        clearInterval(interval); // Stop the interval when the countdown is complete
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, targetTime, notificationSent]);

  function getTimeLeft(startTime, targetTime) {
    const now = new Date();
    const [startHour, startMinute, startSecond] = startTime
      .split(":")
      .map(Number);
    const [targetHour, targetMinute, targetSecond] = targetTime
      .split(":")
      .map(Number);

    const startDate = new Date(now);
    startDate.setHours(startHour, startMinute, startSecond, 0);

    const targetDate = new Date(now);
    targetDate.setHours(targetHour, targetMinute, targetSecond, 0);

    if (now.getTime() < startDate.getTime()) {
      return { hours: 0, minutes: 0, seconds: 0, isComplete: false };
    }

    if (now.getTime() > targetDate.getTime()) {
      return { hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    const distance = targetDate.getTime() - now.getTime();
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isComplete: false };
  }

  function sendLineNotification() {
    fetch(`http://localhost:3000/laundromat/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "1 minute remaining!",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Send Line Notify:", data))
      .catch((error) => console.error("Error updating Line Notify:", error));
  }

  function updateMachine() {
    fetch(`http://localhost:3000/laundromat/machines/${machineId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "done",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Machine updated:", data))
      .catch((error) => console.error("Error updating machine:", error));
  }

  if (timeLeft.isComplete) {
    return <th>เสร็จเรียบร้อย</th>;
  }

  return (
    <>
      <th>
        {timeLeft.hours} hr {timeLeft.minutes} min {timeLeft.seconds} sec
      </th>
    </>
  );
}

export default Countdown;
