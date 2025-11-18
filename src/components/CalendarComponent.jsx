import { useState, useEffect } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarComponent() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [filter, setFilter] = useState("all");

    // Events state
    const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : [
        { date: "2025-08-31", title: "DS Lecture", color: "#3B82F6", category: "class" },
        { date: "2025-09-01", title: "Physics Midterm", color: "#EF4444", category: "exam" },
        { date: "2025-09-03", title: "Robotics Club", color: "#A855F7", category: "club" },
    ];
});


    
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        category: "class",
    });

    useEffect(() => {
        const openModal = () => setShowModal(true);
        window.addEventListener("openCalendarModal", openModal);

        return () => window.removeEventListener("openCalendarModal", openModal);
    }, []);

    useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
}, [events]);

    const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });

    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const prevLast = new Date(currentYear, currentMonth, 0).getDate();
    const prevDays = [...Array(startDay)].map((_, i) => ({
        day: prevLast - startDay + i + 1,
        other: true,
        date: new Date(currentYear, currentMonth - 1, prevLast - startDay + i + 1),
    }));

    const currDays = [...Array(daysInMonth)].map((_, i) => ({
        day: i + 1,
        other: false,
        date: new Date(currentYear, currentMonth, i + 1),
    }));

    const nextDaysCount = 42 - (prevDays.length + currDays.length);
    const nextDays = [...Array(nextDaysCount)].map((_, i) => ({
        day: i + 1,
        other: true,
        date: new Date(currentYear, currentMonth + 1, i + 1),
    }));

    const allDays = [...prevDays, ...currDays, ...nextDays];

    const filteredEvents = filter === "all" 
        ? events 
        : events.filter(e => e.category === filter);

    const getEventsForDate = (dateObj) => {
        const str = dateObj.toISOString().split("T")[0];
        return filteredEvents.filter(e => e.date === str);
    };

    const changeMonth = (offset) => {
        let newMonth = currentMonth + offset;
        let newYear = currentYear;

        if (newMonth < 0) { newMonth = 11; newYear--; }
        else if (newMonth > 11) { newMonth = 0; newYear++; }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const goToToday = () => {
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
    };

    // --- Add New Event ---
    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date) return alert("Fill all fields!");

        const eventColor = {
            class: "#3B82F6",
            exam: "#EF4444",
            club: "#A855F7",
            personal: "#10B981",
        }[newEvent.category];

        setEvents([...events, { ...newEvent, color: eventColor }]);
        setShowModal(false);
        setNewEvent({ title: "", date: "", category: "class" });
    };

    

    return (
        <>
            
            <div className="cal-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h2>Interactive Calendar</h2>

                    {/* Filter */}
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="class">Class</option>
                        <option value="exam">Exam</option>
                        <option value="club">Club</option>
                        <option value="personal">Personal</option>
                    </select>
                </div>

                <div className="cal-nav">
                    <button className="btn" onClick={() => changeMonth(-1)}>◀</button>
                    <div className="chip">{monthName} {currentYear}</div>
                    <button className="btn" onClick={() => changeMonth(1)}>▶</button>

                    <button className="btn" onClick={goToToday}>Today</button>

                    <button className="btn primary" onClick={() => setShowModal(true)}>
                        + Add Event
                    </button>
                </div>
            </div>

            <div className="cal-grid">
                {WEEKDAYS.map((d) => (
                    <div className="weekday" key={d}>{d}</div>
                ))}
            </div>

            <div className="cal-grid">
                {allDays.map((d, index) => (
                    <div className={`day ${d.other ? "other" : ""}`} key={index}>
                        <div className="dnum">{d.day}</div>

                        {getEventsForDate(d.date).map((ev, i) => (
                            <div className="event" key={i} style={{ background: ev.color }}>
                                {ev.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Event</h3>

                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        />

                        <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        />

                        <select
                            value={newEvent.category}
                            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                        >
                            <option value="class">Class</option>
                            <option value="exam">Exam</option>
                            <option value="club">Club</option>
                            <option value="personal">Personal</option>
                        </select>

                        <div className="modal-actions">
                            <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn primary" onClick={handleAddEvent}>Add</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CalendarComponent;
