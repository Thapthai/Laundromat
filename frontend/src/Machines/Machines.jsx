import { useEffect, useState } from "react";
import Countdown from "./components/CountDown";
import CurrentTime from "./components/CurrentTime";
import axios from "axios";

function Machines() {
  const [machineTypes, setMachineTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachineTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/laundromat/branches"
        );
        const data = await response.json();
        setMachineTypes(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMachineTypes();
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStart = async (machineId) => {
    const start = new Date();
    const end = new Date(start.getTime() + 45 * 60000);
    const status = "working";

    const formattedStart = formatTime(start);
    const formattedEnd = formatTime(end);

    try {
      const response = await axios.put(
        `http://localhost:3000/laundromat/machines/${machineId}`,
        {
          start: formattedStart,
          end: formattedEnd,
          status: status,
        }
      );

      if (response.status === 200) {
        const updatedData = await fetch(
          "http://localhost:3000/laundromat/branches"
        ).then((response) => response.json());
        setMachineTypes(updatedData);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error updating machine status:", err);
    }
  };

  const handleReset = async (machineId) => {
    const status = "available";
    try {
      const response = await axios.put(
        `http://localhost:3000/laundromat/machines/${machineId}`,
        {
          status: status,
        }
      );

      if (response.status === 200) {
        const updatedData = await fetch(
          "http://localhost:3000/laundromat/branches"
        ).then((response) => response.json());
        setMachineTypes(updatedData);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error updating machine status:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      Time <CurrentTime />
      {machineTypes.map((machineType) => (
        <div className="card mt-3" key={machineType.id}>
          <div className="card-header">
            <h5>{machineType.name}</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {machineType.machines.length > 0 ? (
                machineType.machines.map((machine) => (
                  <div className="col-md-4 mb-3" key={machine.id}>
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{machine.name}</h5>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Status</th>
                              <td>{machine.status}</td>
                            </tr>
                          </thead>

                          <tbody>
                            {machine.status !== "available" ? (
                              <>
                                <tr>
                                  <th>Start</th>
                                  <td>
                                    {new Date(machine.start).toLocaleTimeString(
                                      "en-GB",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false,
                                      }
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th>End</th>

                                  <Countdown
                                    targetTime={machine.end}
                                    startTime={machine.start}
                                    machineId={machine.id}
                                  />
                                </tr>
                              </>
                            ) : (
                              <>
                                <tr>
                                  <th>Start</th>
                                  <td>00:00:00</td>
                                </tr>
                                <tr>
                                  <th>End</th>
                                  <td>00:00:00</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>

                        {machine.status === "available" ? (
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => handleStart(machine.id)}
                          >
                            Start
                          </button>
                        ) : machine.status === "done" ? (
                          <button
                            className="btn btn-success w-100"
                            onClick={() => handleReset(machine.id)}
                          >
                            Finish
                          </button>
                        ) : (
                          <button className="btn btn-warning w-100" disabled>
                            Working
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No machines available.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Machines;
