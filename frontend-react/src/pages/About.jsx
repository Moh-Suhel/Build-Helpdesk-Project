import "./About.css";

function About() {
   
  return (
    <div className="about-page">
         <div  className="about-navbar-container" >
     <nav className="navbar">
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
          <a href="/register" className="register-btn">Register</a>
        </div>
      </nav>
      </div>
      <section className="about-hero">
        <p className="about-subtitle">ABOUT FIXPOINT</p>

        <h1>
          We Make Support
          <br />
          <span>Simple & Faster.</span>
        </h1>

        <p className="about-description">
          FixPoint is a helpdesk ticketing system designed to make issue
          reporting and resolution easier. Create tickets, track their
          progress, and stay updated throughout the process.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            Our mission is to make support simple, organized, and accessible
            so users can report problems and get them resolved efficiently.
          </p>
        </div>

        <div className="about-card">
          <h2>💡 What We Do</h2>
          <p>
            FixPoint allows users to create support tickets, track ticket
            status, and communicate through comments. Admins can manage
            tickets, update priorities, and assign tickets to users.
          </p>
        </div>

        <div className="about-card">
          <h2>🚀 Our Goal</h2>
          <p>
            We aim to provide a smooth and user-friendly support experience
            where every issue can be tracked and managed in one place.
          </p>
        </div>
      </section>

      <section className="about-footer">
        <h2>Need Help? We're Here for You.</h2>
        <p>Report an issue and track its progress with FixPoint.</p>
      </section>
    </div>
  );
}

export { About };