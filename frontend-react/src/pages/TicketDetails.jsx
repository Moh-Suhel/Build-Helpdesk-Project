import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./TicketDetails.css";

function TicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("Loading ticket details...");
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [commentError, setCommentError] = useState("");

  // Get Ticket Details
  useEffect(() => {
    async function getTicketDetails() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/users/ticket/${ticketId}`,
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

        setTicket(data.data);
        setMessage("");
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        setMessage("Unable to connect to the server.");
      }
    }

    getTicketDetails();
  }, [ticketId]);

  // Get Comments
  async function getComments() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/ticket/${ticketId}/comment`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setCommentError(data.message || "Failed to fetch comments");
        return;
      }

      setComments(data.data);
      setCommentError("");
    } catch (error) {
      console.error("Error fetching comments:", error);
      setCommentError("Unable to load comments.");
    }
  }

  // Load Comments when Ticket ID changes
  useEffect(() => {
    getComments();
  }, [ticketId]);

  // Create Comment
  async function handleCommentSubmit(event) {
    event.preventDefault();

    if (!commentMessage.trim()) {
      setCommentError("Please enter a comment.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/ticket/${ticketId}/comment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: commentMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setCommentError(data.message || "Failed to add comment");
        return;
      }

      setCommentMessage("");
      setCommentError("");

      // Refresh comments after successful submission
      await getComments();
    } catch (error) {
      console.error("Error creating comment:", error);
      setCommentError("Unable to connect to the server.");
    }
  }

  // Delete Ticket
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/ticket/${ticketId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to delete ticket");
        return;
      }

      navigate("/myticket");
    } catch (error) {
      console.error("Error deleting ticket:", error);
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
        </nav>
      </header>

      <main className="ticket-details-container">
        <h1>Ticket Details</h1>

        {message && <p>{message}</p>}

        {ticket && (
          <article className="ticket-details-card">
            <h2>{ticket.title}</h2>

            <p>
              <strong>Description:</strong> {ticket.description}
            </p>

            <p>
              <strong>Category:</strong> {ticket.category}
            </p>

            <p>
              <strong>Priority:</strong> {ticket.priority}
            </p>

            <p>
              <strong>Status:</strong> {ticket.status}
            </p>

            <p>
              <strong>Created Date:</strong>{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : "Unknown"}
            </p>

            <p>
              <strong>Creator:</strong>{" "}
              {typeof ticket.creator === "object"
                ? ticket.creator?._id
                : ticket.creator}
            </p>

            <div className="ticket-actions">
              <Link
                to={`/update-ticket/${ticketId}`}
                className="update-ticket-btn"
              >
                Update Ticket
              </Link>

              <button
                type="button"
                className="delete-ticket-btn"
                onClick={handleDelete}
              >
                Delete Ticket
              </button>
            </div>
          </article>
        )}

        {/* Comments Section */}
        <section className="comments-section">
          <h2>Comments</h2>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentMessage}
              onChange={(event) => setCommentMessage(event.target.value)}
              placeholder="Write your comment..."
              required
            />

            <button type="submit">Add Comment</button>
          </form>

          {commentError && <p>{commentError}</p>}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <article key={comment._id} className="comment-card">
                  <p>{comment.message}</p>

                  <p>
                    <strong>Author:</strong>{" "}
                    {comment.author?.fullName ||
                      comment.author?.username ||
                      "Unknown"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : "Unknown"}
                  </p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export { TicketDetails };