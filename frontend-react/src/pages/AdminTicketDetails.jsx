import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdminTicketDetails.css";

function AdminTicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);

  // Status states
  const [status, setStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Priority states
  const [priority, setPriority] = useState("");
  const [updatingPriority, setUpdatingPriority] = useState(false);

  // Assignment states
  const [users, setUsers] = useState([]);
  const [assignment, setAssignment] = useState("");
  const [updatingAssignment, setUpdatingAssignment] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Display message
  function showMessage(text, type = "success") {
    setMessage(text);
    setMessageType(type);
  }

  // Fetch ticket details
  useEffect(() => {
    async function getTicketDetails() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://build-helpdesk-project.onrender.com/api/v1/users/admin/tickets/${ticketId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch ticket");
        }

        setTicket(data.data);
        setStatus(data.data.status);
        setPriority(data.data.priority);
        setAssignment(data.data.assignment?._id || "");
      } catch (error) {
        showMessage(
          error.message || "Something went wrong",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }

    getTicketDetails();
  }, [ticketId]);

  // Fetch users for assignment
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetch(
          "https://build-helpdesk-project.onrender.com/api/v1/users/admin/users",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.data);
      } catch (error) {
        showMessage(
          error.message || "Failed to load users",
          "error"
        );
      } finally {
        setLoadingUsers(false);
      }
    }

    getAllUsers();
  }, []);

  // Update ticket status
  async function handleStatusUpdate(event) {
    event.preventDefault();

    try {
      setUpdatingStatus(true);
      setMessage("");

      const response = await fetch(
        `https://build-helpdesk-project.onrender.com/api/v1/users/admin/tickets/${ticketId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setTicket((previousTicket) => ({
        ...previousTicket,
        status: data.data.status,
      }));

      setStatus(data.data.status);

      showMessage("Ticket status updated successfully!");
    } catch (error) {
      showMessage(
        error.message || "Failed to update status",
        "error"
      );
    } finally {
      setUpdatingStatus(false);
    }
  }

  // Update ticket priority
  async function handlePriorityUpdate(event) {
    event.preventDefault();

    try {
      setUpdatingPriority(true);
      setMessage("");

      const response = await fetch(
        `https://build-helpdesk-project.onrender.com/api/v1/users/admin/tickets/${ticketId}/priority`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priority }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update priority");
      }

      setTicket((previousTicket) => ({
        ...previousTicket,
        priority: data.data.priority,
      }));

      setPriority(data.data.priority);

      showMessage("Ticket priority updated successfully!");
    } catch (error) {
      showMessage(
        error.message || "Failed to update priority",
        "error"
      );
    } finally {
      setUpdatingPriority(false);
    }
  }

  // Assign ticket to a user
  async function handleAssignment(event) {
    event.preventDefault();

    if (!assignment) {
      showMessage("Please select a user first.", "error");
      return;
    }

    try {
      setUpdatingAssignment(true);
      setMessage("");

      const response = await fetch(
        `https://build-helpdesk-project.onrender.com/api/v1/users/admin/tickets/${ticketId}/assign`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assignment }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to assign ticket");
      }

      setTicket(data.data);
      setAssignment(data.data.assignment?._id || "");

      showMessage("Ticket assigned successfully!");
    } catch (error) {
      showMessage(
        error.message || "Failed to assign ticket",
        "error"
      );
    } finally {
      setUpdatingAssignment(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="admin-ticket-page">
        <div className="ticket-loading">
          <div className="ticket-spinner"></div>
          <p>Loading ticket details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!ticket) {
    return (
      <div className="admin-ticket-page">
        <div className="admin-ticket-details">
          <h1>Admin — Ticket Details</h1>

          {message && (
            <p className={`ticket-message ${messageType}`}>
              {message}
            </p>
          )}

          <Link to="/admin" className="back-to-admin">
            ← Back to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-ticket-page">
      <main className="admin-ticket-details">
        {/* Header */}
        <header className="ticket-page-header">
          <div>
            <span className="ticket-page-label">ADMIN PANEL</span>
            <h1>Ticket Details</h1>
            <p>View and manage this support ticket.</p>
          </div>

          <Link to="/admin" className="back-to-admin">
            ← Dashboard
          </Link>
        </header>

        {/* Ticket Information */}
        <section className="ticket-information">
          <h2 className="ticket-title">{ticket.title}</h2>

          <div className="ticket-description">
            <span>Description</span>
            <p>{ticket.description}</p>
          </div>

          <div className="ticket-info-grid">
            <div className="ticket-info-item">
              <span>Category</span>
              <strong>{ticket.category}</strong>
            </div>

            <div className="ticket-info-item">
              <span>Priority</span>
              <strong className={`detail-badge priority-${ticket.priority}`}>
                {ticket.priority}
              </strong>
            </div>

            <div className="ticket-info-item">
              <span>Status</span>
              <strong
                className={`detail-badge status-${ticket.status.replace(
                  /\s+/g,
                  "-"
                )}`}
              >
                {ticket.status}
              </strong>
            </div>

            <div className="ticket-info-item">
              <span>Created By</span>
              <strong>
                {ticket.creator?.fullName ||
                  ticket.creator?.username ||
                  "Unknown"}
              </strong>
            </div>

            <div className="ticket-info-item">
              <span>Assigned To</span>
              <strong>
                {ticket.assignment?.fullName ||
                  ticket.assignment?.username ||
                  "Unassigned"}
              </strong>
            </div>

            <div className="ticket-info-item">
              <span>Created At</span>
              <strong>
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleString()
                  : "N/A"}
              </strong>
            </div>
          </div>
        </section>

        {/* Management Section */}
        <section className="ticket-management-section">
          <div className="management-heading">
            <span className="management-number">01</span>
            <div>
              <h2>Update Ticket Status</h2>
              <p>Change the current progress of this ticket.</p>
            </div>
          </div>

          <form
            className="ticket-management-form"
            onSubmit={handleStatusUpdate}
          >
            <div className="form-field">
              <label htmlFor="ticket-status">Select Status</label>

              <select
                id="ticket-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                disabled={updatingStatus}
              >
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <button
              type="submit"
              className="management-button"
              disabled={updatingStatus}
            >
              {updatingStatus ? "Updating..." : "Update Status"}
            </button>
          </form>
        </section>

        <section className="ticket-management-section">
          <div className="management-heading">
            <span className="management-number">02</span>
            <div>
              <h2>Update Ticket Priority</h2>
              <p>Set the urgency level of this ticket.</p>
            </div>
          </div>

          <form
            className="ticket-management-form"
            onSubmit={handlePriorityUpdate}
          >
            <div className="form-field">
              <label htmlFor="ticket-priority">Select Priority</label>

              <select
                id="ticket-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                disabled={updatingPriority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="management-button"
              disabled={updatingPriority}
            >
              {updatingPriority ? "Updating..." : "Update Priority"}
            </button>
          </form>
        </section>

        <section className="ticket-management-section">
          <div className="management-heading">
            <span className="management-number">03</span>
            <div>
              <h2>Assign Ticket</h2>
              <p>Choose a user responsible for this ticket.</p>
            </div>
          </div>

          <form
            className="ticket-management-form"
            onSubmit={handleAssignment}
          >
            <div className="form-field">
              <label htmlFor="ticket-assignment">Select User</label>

              <select
                id="ticket-assignment"
                value={assignment}
                onChange={(event) => setAssignment(event.target.value)}
                disabled={updatingAssignment || loadingUsers}
                required
              >
                <option value="">
                  {loadingUsers ? "Loading users..." : "Select a user"}
                </option>

                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName || user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="management-button"
              disabled={updatingAssignment || loadingUsers}
            >
              {updatingAssignment ? "Assigning..." : "Assign Ticket"}
            </button>
          </form>

          {!loadingUsers && users.length === 0 && (
            <p className="no-users-message">
              No users are available for assignment.
            </p>
          )}
        </section>

        {/* Feedback Message */}
        {message && (
          <p
            className={`ticket-message ${messageType}`}
            role="status"
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <footer className="ticket-page-footer">
          <Link to="/admin" className="back-to-admin">
            ← Back to Admin Dashboard
          </Link>
        </footer>
      </main>
    </div>
  );
}

export { AdminTicketDetails };