import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CalendarComponent from "./CalendarComponent";

const quickAccessCards = [
    {
        id: "vault",
        title: "📂 Document Vault",
        desc: "Store and organize your academic documents securely",
        link: "/student/myvault",
    },
    {
        id: "complaints",
        title: "📢 Complaints",
        desc: "Submit and track your campus complaints",
        link: "/student/complaints",
    },
    {
        id: "lost",
        title: "🔎 Lost & Found",
        desc: "Report lost items or find what you're looking for",
        link: "/student/lost-found",
    },
    {
        id: "attendance",
        title: "📅 Attendance",
        desc: "Track your class attendance and statistics",
        link: "/student/attendance",
    },
    {
        id: "todo",
        title: "📝 To-Do List Manager",
        desc: "Manage your tasks",
        link: "/student/todo",
    },
    {
        id: "calendar",
        title: "🗓️ Calendar",
        desc: "Never miss your academic deadlines",
        link: "#calendarSection", 
    },
];

function Dashboard({ userName, role }) {
    const { searchQuery } = useOutletContext();

    const [greeting, setGreeting] = useState("");

    
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting(`Good morning, ${userName}`);
        } else if (hour < 18) {
            setGreeting(`Good afternoon, ${userName}`);
        } else {
            setGreeting(`Good evening, ${userName}`);
        }
    }, [userName]);
    
    const filteredCards = quickAccessCards.filter(
        (card) =>
            !searchQuery || 
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <section className="welcome">
  {userName && <h2>{greeting}</h2>}

  <p className="muted">
    Ready to make the most of your campus experience today?
  </p>

  <div className="stats">
    {role === "STUDENT" ? (
      <>
        <div className="stat">
          <h3>3</h3>
          <p>Classes Today</p>
        </div>
        <div className="stat">
          <h3>5</h3>
          <p>Tasks Pending</p>
        </div>
        <div className="stat">
          <h3>94%</h3>
          <p>Attendance</p>
        </div>
      </>
    ) : (
      <>
        <div className="stat">
          <h3>2</h3>
          <p>Lectures to Conduct</p>
        </div>
        <div className="stat">
          <h3>41</h3>
          <p>Students Absent Today</p>
        </div>
        <div className="stat">
          <h3>7</h3>
          <p>Pending Evaluations</p>
        </div>
      </>
    )}
  </div>
</section>


            <section className="quick-access" id="qa">
                
                {filteredCards.map((card) => (
                    <div className="card" data-id={card.id} key={card.id}>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                        
                        {card.link.startsWith("#") ? (
                            <a href={card.link}>Open →</a>
                        ) : (
                            <Link to={card.link}>Open →</Link>
                        )}
                    </div>
                ))}
            </section>

            <section className="panel" id="recent">
                <h2>Recent Activity</h2>
                <ul className="list">
                    <li>
                        <span> Uploaded assignment for CS301</span>
                        <span className="tag green">2h ago</span>
                    </li>
                    <li>
                        <span> Checked attendance for Math201</span>
                        <span className="tag blue">1d ago</span>
                    </li>
                    <li>
                        <span> Submitted complaint about cafeteria</span>
                        <span className="tag orange">2d ago</span>
                    </li>
                </ul>
            </section>

            <section className="panel" id="upcoming">
                <h2>Upcoming Events</h2>
                <ul className="list">
                    <li>
                        <span> Physics Midterm</span>
                        <span className="tag blue">Tomorrow, 10:00 AM</span>
                    </li>
                    <li>
                        <span> Study Group Meeting</span>
                        <span className="tag green">Friday, 2:00 PM</span>
                    </li>
                </ul>
            </section>

            <section className="calendar panel" id="calendarSection">
                <CalendarComponent />
            </section>

            <button className="fabbbb" id="fabbbb" onClick={() => window.dispatchEvent(new Event("openCalendarModal"))}>
                +
            </button>

        </div>
    );
}

export default Dashboard;
