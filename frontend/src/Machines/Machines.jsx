import { useEffect, useState } from "react";
import Countdown from "./components/CountDown";
import CurrentTime from "./components/CurrentTime";

function Machines() {
  const [machineTypes, setMachineTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/laundromat/branches")
      .then((response) => response.json())
      .then((data) => {
        setMachineTypes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h4>Laundromat</h4>
      <CurrentTime />
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

                          {machine.status !== "available" ? (
                            <tbody>
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
                                />
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              <tr>
                                <th>Start</th>
                                <td>00:00:00</td>
                              </tr>
                              <tr>
                                <th>End</th>
                                <td>00:00:00</td>
                              </tr>
                            </tbody>
                          )}
                        </table>

                        {machine.status === "available" ? (
                          <button className="btn btn-success w-100">
                            เริ่ม
                          </button>
                        ) : (
                          <button className="btn btn-warning w-100" disabled>
                            กำลังใช้งาน
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
