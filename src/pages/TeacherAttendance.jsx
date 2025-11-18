import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import "../assets/teacher-attendance.css";

/* COMPLETE FEE STUDENT LIST */
const STUDENTS = [
  { roll: "2410990243", name: "Aastha" },
  { roll: "2410990244", name: "Aayushman Semwal" },
  { roll: "2410990245", name: "Abhinav Gupta" },
  { roll: "2410990246", name: "Abhishek Yadav" },
  { roll: "2410990247", name: "Aditya Vikram" },
  { roll: "2410990248", name: "Aditya Kumar Maurya" },
  { roll: "2410990249", name: "Aditya Patil" },
  { roll: "2410990250", name: "Aditya Sharma" },
  { roll: "2410990251", name: "Aditya Singh" },
  { roll: "2410990253", name: "Akshit Bhardwaj" },
  { roll: "2410990254", name: "Aliza" },
  { roll: "2410990255", name: "Aman Pundir" },
  { roll: "2410990256", name: "Aman Sharma" },
  { roll: "2410990257", name: "Amritpal Singh" },
  { roll: "2410990259", name: "Ananya Bansal" },
  { roll: "2410990260", name: "Aniket Singla" },
  { roll: "2410990261", name: "Anirudh Sharma" },
  { roll: "2410990262", name: "Ankita Sharma" },
  { roll: "2410990263", name: "Anmol Mittal" },
  { roll: "2410990264", name: "Ansh Gour" },
  { roll: "2410990265", name: "Anshika Bansal" },
  { roll: "2410990266", name: "Armaan Gill" },
  { roll: "2410990267", name: "Arpita" },
  { roll: "2410990269", name: "Aryan Goel" },
  { roll: "2410990270", name: "Avneet Lamba" },
  { roll: "2410990272", name: "Ayushi" },
  { roll: "2410990273", name: "Ekamjot Singh" },
  { roll: "2410990274", name: "Gagan Walia" },
  { roll: "2410990276", name: "Garima" },
  { roll: "2410990277", name: "Garima Gupta" },
  { roll: "2410990278", name: "Garv Bansal" },
  { roll: "2410990280", name: "Garv Sapra" },
  { roll: "2410990281", name: "Garvita Kalra" },
  { roll: "2410990282", name: "Gaurav" },
  { roll: "2410990283", name: "Gaurav Kundu" },
  { roll: "2410991602", name: "Pururaj Kaur Brar" },
  { roll: "2410991628", name: "Aastha Sharma" },
  { roll: "2410991648", name: "Sagar Chhikara" },
  { roll: "2410991795", name: "Laksh Kalra" },
  { roll: "2410990285", name: "Gaurav Kumar Sharma" },
  { roll: "2410990286", name: "Gautam Bhatia" },
  { roll: "2410990287", name: "Gayatri" },
  { roll: "2410990288", name: "Ghantejvir Singh" },
  { roll: "2410990289", name: "Gia Goyal" },
  { roll: "2410990290", name: "Gouravpreet Singh" },
  { roll: "2410990291", name: "Gouri" },
  { roll: "2410990292", name: "Gourish Anand" },
  { roll: "2410990293", name: "Gurasees Kaur" },
  { roll: "2410990294", name: "Gurdev Singh" },
  { roll: "2410990295", name: "Gurinder Singh Chahal" },
  { roll: "2410990296", name: "Gurjoban Singh" },
  { roll: "2410990297", name: "Gurkaran Singh" },
  { roll: "2410990298", name: "Gurkirat Singh" },
  { roll: "2410990299", name: "Gurleen Kaur" },
  { roll: "2410990300", name: "Gurleen Singh" },
  { roll: "2410990301", name: "Gurmannat Singh" },
  { roll: "2410990303", name: "Gurnoor Kaur" },
  { roll: "2410990304", name: "Gurnoor Kaur" },
  { roll: "2410990305", name: "Gurnoor Singh" },
  { roll: "2410990306", name: "Karmanya Singh" },
  { roll: "2410990307", name: "Kartik Sapra" },
  { roll: "2410990309", name: "Krishna Raheja" },
  { roll: "2410990310", name: "Krishna Yadav" },
  { roll: "2410990311", name: "Krishnav Mangla" },
  { roll: "2410990312", name: "Kunal Dhiman" },
  { roll: "2410990313", name: "Kushal Ahuja" },
  { roll: "2410990314", name: "Kushal Sharma" },
  { roll: "2410990315", name: "Vaibhav Pandey" },
  { roll: "2410990316", name: "Vansh Aneja" },
  { roll: "2410990317", name: "Vansh Arora" },
  { roll: "2410990319", name: "Vignesh Bhargava" },
  { roll: "2410990320", name: "Vihaan Kashyap" },
  { roll: "2410990321", name: "Vrinda Kapoor" },
  { roll: "2410990322", name: "Yashika" },
  { roll: "2410990865", name: "Aryan Malik" },
  { roll: "2410990965", name: "Hunar Mehndiratta" },
  { roll: "2410991175", name: "Ishvika" },
  { roll: "2410991880", name: "Pawanpreet Kaur" },
];

export default function TeacherAttendance() {
  const { searchQuery } = useOutletContext();   // ⬅ Topbar search working here
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState({});

  // Filter using Topbar Search
  const filteredStudents = useMemo(() => {
    const q = searchQuery?.toLowerCase() || "";
    if (!q.trim()) return STUDENTS;

    return STUDENTS.filter(
      (s) =>
        s.roll.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleAttendance = (roll) => {
    setAttendance((prev) => ({
      ...prev,
      [roll]: prev[roll] === "PRESENT" ? "ABSENT" : "PRESENT",
    }));
  };

  const saveAttendance = () => {
    alert("Attendance saved! (local only)");
    console.log("Selected Date:", selectedDate);
    console.log("Attendance Data:", attendance);
  };

  return (
    <div className="content">
      <h1>Attendance Dashboard</h1>

      {/* Date Selector */}
      <div className="panel" style={{ padding: "20px", marginBottom: "20px" }}>
        <label style={{ fontWeight: 600 }}>Select Date</label>
        <input
          type="date"
          style={{ padding: "10px", width: "100%", marginTop: "10px" }}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* ATTENDANCE LIST */}
      <div className="panel" style={{ padding: "20px" }}>
        <h3 style={{ marginBottom: "15px" }}>
          Students ({filteredStudents.length}/{STUDENTS.length})
        </h3>

        <div style={{ display: "grid", gap: "10px" }}>
          {filteredStudents.map((s) => (
            <div
              key={s.roll}
              className="student-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                background:
                  attendance[s.roll] === "PRESENT"
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(239,68,68,0.15)",
              }}
              onClick={() => toggleAttendance(s.roll)}
            >
              <span>
                <strong>{s.roll}</strong> — {s.name}
              </span>

              <strong>{attendance[s.roll] || "ABSENT"}</strong>
            </div>
          ))}
        </div>

        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "200px" }}
          onClick={saveAttendance}
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}
