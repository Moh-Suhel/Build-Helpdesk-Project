
const form = document.querySelector("#registerForm")

if (form){
    addEventListener("submit", async (event) => {
    event.preventDefault()

    const username = form.querySelector('[name="username"]').value
    const email = form.querySelector('[name="email"]').value
    const fullName = form.querySelector('[name="fullName"]').value
    const password = form.querySelector('[name="password"]').value

    const response = await fetch("http://127.0.0.1:8000/api/v1/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            fullName,
            password
        })
    })

    const data = await response.json()

    
    console.log("SERVER RESPONSE:", data)

    if (response.ok) {
    window.location.href = "login.html";
}
})
}

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = loginForm.querySelector('[name="username"]').value;
        const email = loginForm.querySelector('[name="email"]').value;
        const password = loginForm.querySelector('[name="password"]').value;

        const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        console.log(data);

        if (response.ok) {
   window.location.href = "HTML/dashboard.html";
}
    });
}



// for ticket saving in database 

const ticketForm = document.querySelector("#ticketForm");

if (ticketForm) {
    ticketForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = ticketForm.querySelector('[name="title"]').value;
        const description = ticketForm.querySelector('[name="description"]').value;
        const category = ticketForm.querySelector('[name="category"]').value;
        const priority = ticketForm.querySelector('[name="priority"]').value;

        const response = await fetch(
            "http://127.0.0.1:8000/api/v1/users/ticket",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    priority
                })
            }
        );

        const data = await response.json();

        console.log("TICKET RESPONSE:", data);

        if (response.ok) {
            window.location.href = "dashboard.html";
        }
    });
}



// jis position pe ticket mongo db  se aaker seen hote hai 
const ticketsContainer = document.querySelector("#ticketsContainer");

if (ticketsContainer) {
    getMyTickets();
}

async function getMyTickets() {

    const response = await fetch(
         "http://127.0.0.1:8000/api/v1/users/myticket",
        {
            method: "GET",
            credentials: "include"
        }
    );

    const data = await response.json();

    console.log(data);

    ticketsContainer.innerHTML = "";

    if (data.data.length === 0) {
        ticketsContainer.innerHTML = "<p>No tickets found.</p>";
        return;
    }

    data.data.forEach((ticket) => {

    const ticketCard = document.createElement("div");

    ticketCard.classList.add("ticket-card");

    ticketCard.innerHTML = `
        <h2>${ticket.title}</h2>
        <p>${ticket.description}</p>

        <div>
            <span>${ticket.category}</span>
            <span>${ticket.priority}</span>
            <span>${ticket.status}</span>
        </div>
    `;

    ticketCard.addEventListener("click", () => {

        window.location.href =
            `ticket-details.html?id=${ticket._id}`;

    });

    ticketsContainer.appendChild(ticketCard);
});
}
const updateTicketBtn = document.querySelector("#updateTicketBtn");

if (updateTicketBtn) {

    const params = new URLSearchParams(window.location.search);

    const ticketId = params.get("id");

    updateTicketBtn.href = `update-ticket.html?id=${ticketId}`;
}






// ===============================
// TICKET DETAILS
// ===============================

const ticketTitle = document.querySelector("#ticketTitle");

if (ticketTitle) {
    getTicketDetails();
}

async function getTicketDetails() {

    const params = new URLSearchParams(window.location.search);

    const ticketId = params.get("id");

    const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/ticket/${ticketId}`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    const data = await response.json();

    console.log("TICKET DETAILS:", data);

    const ticket = data.data;

    document.querySelector("#ticketTitle").textContent = ticket.title;

    document.querySelector("#ticketStatus").textContent = ticket.status;

    document.querySelector("#ticketDescription").textContent = ticket.description;

    document.querySelector("#ticketCategory").textContent = ticket.category;

    document.querySelector("#ticketPriority").textContent = ticket.priority;

    document.querySelector("#ticketStatusDetails").textContent = ticket.status;

    document.querySelector("#ticketCreatedAt").textContent = ticket.createdAt;

    document.querySelector("#ticketCreator").textContent = ticket.creator;
}



/* Update Ticket */

const updateTicketForm = document.querySelector("#updateTicketForm");

if (updateTicketForm) {
    getTicketForUpdate();

    updateTicketForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const params = new URLSearchParams(window.location.search);

        const ticketId = params.get("id");

        const title = document.querySelector("#updateTitle").value;

        const description =
            document.querySelector("#updateDescription").value;

        const category =
            document.querySelector("#updateCategory").value;

        const priority =
            document.querySelector("#updatePriority").value;


        const response = await fetch(
            `http://127.0.0.1:8000/api/v1/users/ticket/${ticketId}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    title,
                    description,
                    category,
                    priority
                })
            }
        );


        const data = await response.json();

        console.log("UPDATE TICKET RESPONSE:", data);


        if (response.ok) {

            alert("Ticket updated successfully!");

            window.location.href =
                `ticket-details.html?id=${ticketId}`;
        }
    });
}


async function getTicketForUpdate() {

    const params = new URLSearchParams(window.location.search);

    const ticketId = params.get("id");


    const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/ticket/${ticketId}`,
        {
            method: "GET",

            credentials: "include"
        }
    );


    const data = await response.json();

    console.log("TICKET FOR UPDATE:", data);


    const ticket = data.data;


    document.querySelector("#updateTitle").value =
        ticket.title;

    document.querySelector("#updateDescription").value =
        ticket.description;

    document.querySelector("#updateCategory").value =
        ticket.category;

    document.querySelector("#updatePriority").value =
        ticket.priority;
}



// for delete button


const deleteTicketBtn = document.querySelector("#deleteTicketBtn");

if (deleteTicketBtn) {

    const params = new URLSearchParams(window.location.search);

    const ticketId = params.get("id");

    deleteTicketBtn.addEventListener("click", async () => {

        const confirmDelete = confirm(
            "Are you sure you want to delete this ticket?"
        );

        if (!confirmDelete) {
            return;
        }

        const response = await fetch(
            `http://127.0.0.1:8000/api/v1/users/ticket/${ticketId}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        const data = await response.json();

        console.log("DELETE TICKET RESPONSE:", data);

        if (response.ok) {

            alert("Ticket deleted successfully");

            window.location.href = "dashboard.html";
        }
    });
}


// for comment  add in database
const commentForm = document.querySelector("#commentForm");

if (commentForm) {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");

    commentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const message = document.querySelector("#commentMessage").value;

        const response = await fetch(
            `http://127.0.0.1:8000/api/v1/users/ticket/${ticketId}/comment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    message
                })
            }
        );

        const data = await response.json();

        console.log("COMMENT RESPONSE:", data);

        if (response.ok) {

    alert("Comment added successfully");
    commentForm.reset();

    const userResponse = await fetch(
        "http://127.0.0.1:8000/api/v1/users/current-user",
        {
            method: "GET",
            credentials: "include"
        }
    );

    const userData = await userResponse.json();

    console.log("CURRENT USER:", userData);

    if (userResponse.ok && userData.data.role === "ADMIN") {
        window.location.href = "admin-dashboard.html";
    }
}
    });
}



// get comment on UI
const commentsContainer = document.querySelector("#commentsContainer");

if (commentsContainer) {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");

    getComments(ticketId);
}

async function getComments(ticketId) {
    const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/ticket/${ticketId}/comment`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    const data = await response.json();

    console.log("GET COMMENTS RESPONSE:", data);

    if (!response.ok) {
        commentsContainer.innerHTML =
            "<p>Unable to load comments.</p>";
        return;
    }

    commentsContainer.innerHTML = "";

    if (data.data.length === 0) {
        commentsContainer.innerHTML =
            "<p>No comments yet.</p>";
        return;
    }

    data.data.forEach((comment) => {
        const commentBox = document.createElement("div");
        commentBox.classList.add("comment-box");

        const authorName =
            comment.author?.fullName ||
            comment.author?.username ||
            "Unknown User";

        const message = document.createElement("p");
        message.textContent = comment.message;

        const author = document.createElement("strong");
        author.textContent = authorName;

        const date = document.createElement("small");
        date.textContent = new Date(
            comment.createdAt
        ).toLocaleString();

        commentBox.appendChild(message);
        commentBox.appendChild(author);
        commentBox.appendChild(date);

        commentsContainer.appendChild(commentBox);
    });
}





// ADMIN DASHBOARD


const adminTicketsContainer = document.querySelector("#adminTicketsContainer");

if (adminTicketsContainer) {

    async function getAllAdminTickets() {

        try {

            const search =
    document.querySelector("#adminSearch")?.value.trim() || "";

const status =
    document.querySelector("#adminStatusFilter")?.value || "";

const priority =
    document.querySelector("#adminPriorityFilter")?.value || "";

const category =
    document.querySelector("#adminCategoryFilter")?.value || "";

const queryParams = new URLSearchParams();

if (search) queryParams.set("search", search);
if (status) queryParams.set("status", status);
if (priority) queryParams.set("priority", priority);
if (category) queryParams.set("category", category);

const response = await fetch(
    `http://127.0.0.1:8000/api/v1/users/admin/tickets/filter?${queryParams.toString()}`,
    {
        method: "GET",
        credentials: "include"
    }
);

            const data = await response.json();

            console.log("ADMIN TICKETS RESPONSE:", data);

            if (!response.ok) {
                adminTicketsContainer.innerHTML =
                    "<p>Unable to load tickets.</p>";
                return;
            }

            const tickets = data.data;

            
            // Statistics
            

            document.querySelector("#totalTickets").textContent =
                tickets.length;

            document.querySelector("#openTickets").textContent =
                tickets.filter(ticket => ticket.status === "open").length;

            document.querySelector("#inProgressTickets").textContent =
                tickets.filter(ticket => ticket.status === "in progress").length;

            document.querySelector("#resolvedTickets").textContent =
                tickets.filter(ticket => ticket.status === "resolved").length;

            document.querySelector("#closedTickets").textContent =
                tickets.filter(ticket => ticket.status === "closed").length;


            
            // Tickets Display
            

            adminTicketsContainer.innerHTML = "";

            if (tickets.length === 0) {
                adminTicketsContainer.innerHTML =
                    "<p>No tickets found.</p>";
                return;
            }

            tickets.forEach((ticket) => {

                const ticketCard = document.createElement("div");

                ticketCard.classList.add("admin-ticket-card");

                ticketCard.innerHTML = `
                    <h3>${ticket.title}</h3>

                    <p>${ticket.description}</p>

                    <div class="admin-ticket-meta">

                        <span>
                            Category: ${ticket.category}
                        </span>

                        <span>
                            Priority: ${ticket.priority}
                        </span>

                        <span>
                            Status: ${ticket.status}
                        </span>

                        <span>
                            Created By: ${ticket.creator?.username || "Unknown"}
                        </span>

                    </div>
                `;
                ticketCard.addEventListener("click", () => {
    window.location.href = `admin-ticket-details.html?id=${ticket._id}`;
});

                adminTicketsContainer.appendChild(ticketCard);

            });

        } catch (error) {

            console.error("ADMIN DASHBOARD ERROR:", error);

            adminTicketsContainer.innerHTML =
                "<p>Something went wrong while loading tickets.</p>";
        }
    }

    getAllAdminTickets();

const applyFiltersBtn = document.querySelector("#applyFiltersBtn");
const clearFiltersBtn = document.querySelector("#clearFiltersBtn");

if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
        getAllAdminTickets();
    });
}

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {

        document.querySelector("#adminSearch").value = "";
        document.querySelector("#adminStatusFilter").value = "";
        document.querySelector("#adminPriorityFilter").value = "";
        document.querySelector("#adminCategoryFilter").value = "";

        getAllAdminTickets();
    });
}
}

// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.querySelector("#logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        const response = await fetch(
            "http://127.0.0.1:8000/api/v1/users/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        const data = await response.json();

        console.log("LOGOUT RESPONSE:", data);

        if (response.ok) {
            alert("Logout successful");
            window.location.href = "index.html";
        }
    });
}





// ADMIN TICKET DETAILS


const adminTicketDetails = document.querySelector("#adminTicketDetails");

if (adminTicketDetails) {

    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");

    if (!ticketId) {

        adminTicketDetails.innerHTML =
            "<p>Ticket ID not found.</p>";

    } else {

        async function getAdminTicket() {

            try {

                const response = await fetch(
                    `http://127.0.0.1:8000/api/v1/users/admin/tickets/${ticketId}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                console.log("ADMIN TICKET RESPONSE:", data);

                if (!response.ok) {

                    adminTicketDetails.innerHTML =
                        "<p>Unable to load ticket.</p>";

                    return;
                }

                const ticket = data.data;

                adminTicketDetails.innerHTML = `
                    <h2>${ticket.title}</h2>

                    <p>
                        <strong>Description:</strong>
                        ${ticket.description}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${ticket.category}
                    </p>

                    <p>
                        <strong>Priority:</strong>
                        ${ticket.priority}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${ticket.status}
                    </p>

                    <p>
                        <strong>Created By:</strong>
                        ${ticket.creator?.username || "Unknown"}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${ticket.creator?.email || "Unknown"}
                    </p>
                `;

                // Current status ko dropdown me select karo
                document.querySelector("#adminStatus").value =
                    ticket.status;

            } catch (error) {

                console.error(
                    "ADMIN TICKET ERROR:",
                    error
                );

                adminTicketDetails.innerHTML =
                    "<p>Something went wrong.</p>";
            }
        }

        getAdminTicket();
    }
}


// ===============================
// ADMIN STATUS UPDATE
// ===============================

const adminStatusForm =
    document.querySelector("#adminStatusForm");

if (adminStatusForm) {

    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");

    adminStatusForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const status =
                document.querySelector("#adminStatus").value;

            try {

                const response = await fetch(
                    `http://127.0.0.1:8000/api/v1/users/admin/tickets/${ticketId}/status`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        credentials: "include",

                        body: JSON.stringify({
                            status: status
                        })
                    }
                );

                const data = await response.json();

                console.log(
                    "STATUS UPDATE RESPONSE:",
                    data
                );

                if (response.ok) {

                    alert(
                        "Ticket status updated successfully"
                    );

                    getAdminTicket();
                } else {

                    alert(
                        data.message ||
                        "Unable to update ticket status"
                    );
                }

            } catch (error) {

                console.error(
                    "STATUS UPDATE ERROR:",
                    error
                );

                alert(
                    "Something went wrong"
                );
            }
        }
    );
}



//   for priority change

const adminPriorityForm = document.querySelector("#adminPriorityForm");

if (adminPriorityForm) {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");

    adminPriorityForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const priority = document.querySelector("#adminPriority").value;

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/users/admin/tickets/${ticketId}/priority`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        priority: priority
                    })
                }
            );

            const data = await response.json();

            console.log("PRIORITY UPDATE RESPONSE:", data);

            if (response.ok) {
                alert("Ticket priority updated successfully");
            } else {
                alert(data.message || "Unable to update ticket priority");
            }

        } catch (error) {
            console.error("PRIORITY UPDATE ERROR:", error);
            alert("Something went wrong");
        }
    });
}




// FOR adminAssignmentForm

const adminAssignmentForm = document.querySelector("#adminAssignmentForm");

if (adminAssignmentForm) {

    const assignmentSelect =
        document.querySelector("#adminAssignment");

    // Get all users
    async function getAllUsers() {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/users/admin/users",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const data = await response.json();

            console.log("ALL USERS RESPONSE:", data);

            if (!response.ok) {
                assignmentSelect.innerHTML =
                    `<option value="">Unable to load users</option>`;
                return;
            }

            const users = data.data;

            assignmentSelect.innerHTML =
                `<option value="">Select User</option>`;

            users.forEach((user) => {

                const option = document.createElement("option");

                option.value = user._id;

                option.textContent =
                    `${user.fullName || user.username} (${user.email})`;

                assignmentSelect.appendChild(option);

            });

        } catch (error) {

            console.error("GET USERS ERROR:", error);

            assignmentSelect.innerHTML =
                `<option value="">Something went wrong</option>`;
        }
    }

    getAllUsers();


    // Assign ticket
    const params =
        new URLSearchParams(window.location.search);

    const ticketId = params.get("id");

    adminAssignmentForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const assignment =
                assignmentSelect.value;

            if (!assignment) {
                alert("Please select a user");
                return;
            }

            try {

                const response = await fetch(
                    `http://127.0.0.1:8000/api/v1/users/admin/tickets/${ticketId}/assign`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        credentials: "include",

                        body: JSON.stringify({
                            assignment: assignment
                        })
                    }
                );

                const data = await response.json();

                console.log(
                    "ASSIGN TICKET RESPONSE:",
                    data
                );

                if (response.ok) {

                    alert(
                        "Ticket assigned successfully"
                    );

                } else {

                    alert(
                        data.message ||
                        "Unable to assign ticket"
                    );
                }

            } catch (error) {

                console.error(
                    "ASSIGN TICKET ERROR:",
                    error
                );

                alert("Something went wrong");
            }
        }
    );
}
