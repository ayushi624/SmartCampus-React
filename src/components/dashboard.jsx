import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

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
        link: "#calendarSection", // This is an anchor link
    },
];

function Dashboard({ userName }) {
    const { searchQuery } = useOutletContext();

    const [greeting, setGreeting] = useState("");

    // Set greeting on load
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting(`Good morning, ${userName}`);
        } else if (hour < 18) {
            setGreeting(`Good afternoon, ${userName}`);
        } else {
            setGreeting(`Good evening, ${userName}`);
        }
    }, [userName]);// The empty [] means it runs once on load

    // Filter the cards based on the searchQuery from the layout
    const filteredCards = quickAccessCards.filter(
        (card) =>
            !searchQuery || // If search is empty, show all cards
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <section className="welcome">
                {userName ? <h2>{greeting}</h2> : null}  {/* Use the state variable */}
                <p className="muted">
                    Ready to make the most of your campus experience today?
                </p>
                <div className="stats">
                    <div className="stat">
                        <h3 data-count="3">3</h3>
                        <p>Classes Today</p>
                    </div>
                    <div className="stat">
                        <h3 data-count="5">5</h3>
                        <p>Tasks Pending</p>
                    </div>
                    <div className="stat">
                        <h3 data-count="94">94</h3>
                        <p>Attendance %</p>
                    </div>
                </div>
            </section>

            <section className="quick-access" id="qa">
                {/* Render the filtered cards by mapping over the array */}
                {filteredCards.map((card) => (
                    <div className="card" data-id={card.id} key={card.id}>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                        {/* Use <Link> for React Router links, <a> for anchors */}
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

            <section
                className="calendar panel"
                id="calendarSection"
                style={{ display: "block", visibility: "visible" }}
            >

                <div className="cal-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <h2>Interactive Calendar</h2>
                        <select id="categoryFilter">
                            <option value="all">All</option>
                            <option value="class">Class</option>
                            <option value="exam">Exam</option>
                            <option value="club">Club</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>
                    <div className="cal-nav">
                        <button className="btn" id="prevMonth">
                            ◀
                        </button>
                        <div id="monthLabel" className="chip">
                            August 2025
                        </div>
                        <button className="btn" id="nextMonth">
                            ▶
                        </button>
                        <button className="btn" id="todayBtn">
                            Today
                        </button>
                        <button className="btn primary" id="addEventBtn">
                            + Add Event
                        </button>
                    </div>
                </div>
                <div className="cal-grid" id="weekdayRow">
                    <div className="weekday">Sun</div>
                    <div className="weekday">Mon</div>
                    <div className="weekday">Tue</div>
                    <div className="weekday">Wed</div>
                    <div className="weekday">Thu</div>
                    <div className="weekday">Fri</div>
                    <div className="weekday">Sat</div>
                </div>
                <div className="cal-grid" id="calGrid">
                    <div className="day other">
                        <div className="dnum">27</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">28</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">29</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">30</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">3F1</div>
                    </div>
                    <div className="day">
                        <div className="dnum">1</div>
                    </div>
                    <div className="day">
                        <div className="dnum">2</div>
                    </div>
                    <div className="day">
                        <div className="dnum">3</div>
                    </div>
                    <div className="day">
                        <div className="dnum">4</div>
                    </div>
                    <div className="day">
                        <div className="dnum">5</div>
                    </div>
                    <div className="day">
                        <div className="dnum">6</div>
                    </div>
                    <div className="day">
                        <div className="dnum">7</div>
                    </div>
                    <div className="day">
                        <div className="dnum">8</div>
                    </div>
                    <div className="day">
                        <div className="dnum">9</div>
                    </div>
                    <div className="day">
                        <div className="dnum">10</div>
                    </div>
                    <div className="day">
                        <div className="dnum">11</div>
                    </div>
                    <div className="day">
                        <div className="dnum">12</div>
                    </div>
                    <div className="day">
                        <div className="dnum">13</div>
                    </div>
                    <div className="day">
                        <div className="dnum">14</div>
                    </div>
                    <div className="day">
                        <div className="dnum">15</div>
                    </div>
                    <div className="day">
                        <div className="dnum">16</div>
                    </div>
                    <div className="day">
                        <div className="dnum">17</div>
                    </div>
                    <div className="day">
                        <div className="dnum">18</div>
                    </div>
                    <div className="day">
                        <div className="dnum">19</div>
                    </div>
                    <div className="day">
                        <div className="dnum">20</div>
                    </div>
                    <div className="day">
                        <div className="dnum">21</div>
                    </div>
                    <div className="day">
                        <div className="dnum">22</div>
                    </div>
                    <div className="day">
                        <div className="dnum">23</div>
                    </div>
                    <div className="day">
                        <div className="dnum">24</div>
                    </div>
                    <div className="day">
                        <div className="dnum">25</div>
                    </div>
                    <div className="day">
                        <div className="dnum">26</div>
                    </div>
                    <div className="day">
                        <div className="dnum">27</div>
                    </div>
                    <div className="day">
                        <div className="dnum">28</div>
                    </div>
                    <div className="day">
                        <div className="dnum">29</div>
                    </div>
                    <div className="day">
                        <div className="dnum">30</div>
                    </div>
                    <div className="day">
                        <div className="dnum">31</div>
                        <div className="event" style={{ background: "rgb(59, 130, 246)" }}>
                            DS Lecture
                        </div>
                    </div>
                    <div className="day other">
                        <div className="dnum">1</div>
                        <div className="event" style={{ background: "rgb(239, 68, 68)" }}>
                            Physics Midterm
                        </div>
                    </div>
                    <div className="day other">
                        <div className="dnum">2</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">3</div>
                        <div className="event" style={{ background: "rgb(168, 85, 247)" }}>
                            Robotics Club
                        </div>
                    </div>
                    <div className="day other">
                        <div className="dnum">4</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">5</div>
                    </div>
                    <div className="day other">
                        <div className="dnum">6</div>
                    </div>
                </div>
            </section>

            <button className="fab" id="fab">
                +
            </button>
        </div>
    );
}

export default Dashboard;
