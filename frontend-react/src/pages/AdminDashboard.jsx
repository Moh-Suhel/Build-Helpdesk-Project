import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  // Fetch tickets with search and filters
  async function getTickets(filters = {}) {
    try {
      setLoading(true);
      setMessage("");

      const queryParams = new URLSearchParams();

      if (filters.search) {
        queryParams.set("search", filters.search);
      }

      if (filters.status) {
        queryParams.set("status", filters.status);
      }

      if (filters.priority) {
        queryParams.set("priority", filters.priority);
      }

      if (filters.category) {
        queryParams.set("category", filters.category);
      }

      const queryString = queryParams.toString();

      const endpoint = queryString
        ? `https://build-helpdesk-project.onrender.com/api/v1/users/admin/tickets/filter?${queryString}`
        : "https://build-helpdesk-project.onrender.com/api/v1/users/admin/tickets";

      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tickets");
      }

      setTickets(data.data);
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Fetch all tickets when the page opens
  useEffect(() => {
    getTickets();
  }, []);

  // Apply search and filters
  function handleSearchAndFilter(event) {
    event.preventDefault();

    getTickets({
      search: search.trim(),
      status,
      priority,
      category,
    });
  }

  // Reset search and filters
  function handleReset() {
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");

    getTickets();
  }

  // Logout
  async function handleLogout() {
    try {
      const response = await fetch(
        "https://build-helpdesk-project.onrender.com/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setMessage(data.message || "Logout failed");
      }
    } catch (error) {
      setMessage("Unable to logout. Please try again.");
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor all support tickets.</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="admin-main">
        {/* Dashboard statistics */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>{tickets.length}</p>
          </div>

          <div className="stat-card">
            <h3>Open Tickets</h3>
            <p>
              {tickets.filter((ticket) => ticket.status === "open").length}
            </p>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <p>
              {
                tickets.filter(
                  (ticket) => ticket.status === "in progress"
                ).length
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>Resolved</h3>
            <p>
              {
                tickets.filter(
                  (ticket) => ticket.status === "resolved"
                ).length
              }
            </p>
          </div>
        </section>

        <section className="tickets-section">
          <h2>All Support Tickets</h2>

          {/* Search and filter form */}
          <form
            className="ticket-filter-form"
            onSubmit={handleSearchAndFilter}
          >
            <input
              type="text"
              placeholder="Search title or description..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All Categories</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
              <option value="account">Account</option>
              <option value="other">Other</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search / Filter"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </form>

          {message && <p className="error-message">{message}</p>}

          {loading && <p>Loading tickets...</p>}

          {!loading && !message && tickets.length === 0 && (
            <p>No tickets found.</p>
          )}

          {!loading && !message && tickets.length > 0 && (
            <>
              <p>Tickets found: {tickets.length}</p>

              <div className="table-container">
                <table className="tickets-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Created By</th>
                      <th>Assigned To</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id}>
                        <td>{ticket.title}</td>

                        <td>{ticket.category}</td>

                        <td>
                          <span
                            className={`priority-badge ${ticket.priority}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${ticket.status.replace(
                              /\s+/g,
                              "-"
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </td>

                        <td>
                          {ticket.creator?.fullName ||
                            ticket.creator?.username ||
                            "Unknown"}
                        </td>

                        <td>
                          {ticket.assignment?.fullName ||
                            ticket.assignment?.username ||
                            "Unassigned"}
                        </td>

                        <td>
                          {ticket.createdAt
                            ? new Date(
                                ticket.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td>
                          <Link
                            to={`/admin/ticket/${ticket._id}`}
                            className="view-ticket-btn"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export { AdminDashboard };