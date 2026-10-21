   import { useState, useEffect } from "react";
import "./CreateTicket.css";
import { Link, useNavigate } from "react-router-dom";

function CreateTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");

  // Check current user's role
  const [role, setRole] = useState("");

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/current-user",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setRole(data.data.role);
      } catch (error) {
        console.error("Failed to get current user:", error);
      }
    }

    getCurrentUser();
  }, []);

  // Logout
  async function handleLogout() {
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

  // Create Ticket
  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || !description || !category || !priority) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/ticket",
        {
          method: "POST",
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

      if (response.ok) {
        setMessage("Ticket created successfully!");

        setTitle("");
        setDescription("");
        setCategory("");
        setPriority("");
      } else {
        setMessage(data.message || "Ticket creation failed!");
      }
    } catch (error) {
      console.error("Create ticket error:", error);
      setMessage("Unable to connect to the server.");
    }
  }

  return (
    <>
      <header>
        <h2>HelpDesk</h2>

        <nav>
          <Link to="/myticket">My Tickets</Link>

          <Link to="/ticket">Create Ticket</Link>

          {/* Show only for admin */}
          {role === "ADMIN" && (
            <Link to="/admin" className="admin-dashboard-link">
              Admin Dashboard
            </Link>
          )}

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main>
        <section className="ticket-form">
          <h1>Create Ticket</h1>

          <p>Submit a new support ticket.</p>

          <form id="ticketForm" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter ticket title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe your problem"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <label htmlFor="category">Category</label>

            <select
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select category</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
              <option value="account">Account</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="priority">Priority</label>

            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button type="submit">Create Ticket</button>
          </form>

          <p id="message">{message}</p>
        </section>
      </main>
    </>
  );
}

export { CreateTicket };