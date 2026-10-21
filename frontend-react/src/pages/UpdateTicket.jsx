import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UpdateTicket.css";

function UpdateTicket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("Loading ticket details...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTicketDetails() {
      try {
        const response = await fetch(
          `https://build-helpdesk-project.onrender.com/api/v1/users/ticket/${ticketId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to fetch ticket details");
          return;
        }

        setTitle(data.data.title || "");
        setDescription(data.data.description || "");
        setCategory(data.data.category || "");
        setPriority(data.data.priority || "");
        setMessage("");
      } catch (error) {
        console.error("Error fetching ticket:", error);
        setMessage("Unable to connect to the server.");
      }
    }

    getTicketDetails();
  }, [ticketId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://build-helpdesk-project.onrender.com/api/v1/users/ticket/${ticketId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            category,
            priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update ticket");
        return;
      }

      setMessage("Ticket updated successfully!");

      setTimeout(() => {
        navigate(`/ticket/${ticketId}`);
      }, 1000);
    } catch (error) {
      console.error("Error updating ticket:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header>
        <h2>HelpDesk</h2>

        <nav>
          <Link to="/myticket">My Tickets</Link>
          <Link to="/ticket">Create Ticket</Link>
        </nav>
      </header>

      <main className="update-ticket-container">
        <h1>Update Ticket</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
            <option value="account">Account</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </main>
    </>
  );
}

export { UpdateTicket };