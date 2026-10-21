import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyTickets.css";

function MyTickets() {
  const navigate = useNavigate();

async function handleLogout() {
  console.log("Logout button clicked!");
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/users/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {
      navigate("/login");
    } else {
      setMessage(data.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    setMessage("Unable to connect to the server.");
  }
}
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("Loading tickets...");

  useEffect(() => {
    async function getMyTickets() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/myticket",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          setMessage(data.message || "Failed to fetch tickets");
          return;
        }

        // Backend response se tickets nikaalna
        const ticketList = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.data?.tickets)
            ? data.data.tickets
            : [];

        setTickets(ticketList);
        setMessage(
          ticketList.length === 0
            ? "You have not created any tickets yet."
            : ""
        );
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setMessage("Unable to connect to the server.");
      }
    }

    getMyTickets();
  }, []);

  return (
    <>
      <header>
        <h2>HelpDesk</h2>

        <nav>
          
  <Link to="/myticket">My Tickets</Link>

  <Link to="/ticket">Create Ticket</Link>

  <button type="button" onClick={handleLogout}>
  Logout
</button>

        </nav>
      </header>

      <main className="my-tickets-container">
        <h1>My Tickets</h1>
        <p>View the support tickets you have created.</p>

        {message && <p>{message}</p>}

        <div className="ticket-list">
          {tickets.map((ticket) => (
            <article className="ticket-card" key={ticket._id}>
             <h2>
       <Link to={`/ticket/${ticket._id}`}>
        {ticket.title}
        </Link>
        </h2>

              <p>{ticket.description}</p>

              <p>
                <strong>Category:</strong> {ticket.category}
              </p>

              <p>
                <strong>Priority:</strong> {ticket.priority}
              </p>

              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export { MyTickets };