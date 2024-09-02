import React, { useState, useEffect } from 'react';

const Countdown = ({ startTime, targetTime }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(startTime, targetTime));

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = getTimeLeft(startTime, targetTime);
            setTimeLeft(newTimeLeft);

            // ส่งการแจ้งเตือนเมื่อเวลาที่เหลืออยู่เท่ากับ 1 นาที
            if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 1 && newTimeLeft.seconds === 0) {
                sendNotification();
            }
        }, 1000);

        // ทำความสะอาด interval เมื่อคอมโพเนนต์ถูกทำลาย
        return () => clearInterval(interval);
    }, [startTime, targetTime]);

    function getTimeLeft(startTime, targetTime) {
        const now = new Date();
        const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
        const [targetHour, targetMinute, targetSecond] = targetTime.split(':').map(Number);
        
        // สร้างวันที่และเวลาเริ่มต้น
        const startDate = new Date(now);
        startDate.setHours(startHour, startMinute, startSecond, 0);
        
        // สร้างวันที่และเวลาสิ้นสุด
        const targetDate = new Date(now);
        targetDate.setHours(targetHour, targetMinute, targetSecond, 0);

        // ถ้าปัจจุบันก่อนเวลาเริ่มต้น ให้ตั้งเวลาเริ่มต้นไปที่วันนี้
        if (now.getTime() < startDate.getTime()) {
            return { hours: 0, minutes: 0, seconds: 0, isComplete: false };
        }

        // ถ้าปัจจุบันเกินเวลาสิ้นสุดแล้ว ให้ตั้งเป้าไปที่วันถัดไป
        if (now.getTime() > targetDate.getTime()) {
            return { hours: 0, minutes: 0, seconds: 0, isComplete: true };
        }

        // คำนวณเวลาที่เหลือ
        const distance = targetDate.getTime() - now.getTime();
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return { hours, minutes, seconds, isComplete: false };
    }

    function sendNotification() {
        
        fetch('http://localhost:3000/laundromat/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'เวลาที่เหลืออีก 1 นาที!',
            }),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }

    if (timeLeft.isComplete) {
        return <div>เสร็จเรียบร้อย</div>;
    }

    return (
        <div>
            {timeLeft.hours} ชั่วโมง {timeLeft.minutes} นาที {timeLeft.seconds} วินาที
        </div>
    );
};

export default Countdown;
