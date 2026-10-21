import supportImage from "../assets/support-team.svg";
import "./Home.css";
function Home() {
  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Fix<span>Point</span></h2>

        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
          <a href="/register" className="register-btn">Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        {/* Left Side */}
        <div className="hero-content">
          <p className="tagline">SUPPORT MADE SIMPLE</p>

          <h1>
            Welcome to <span>FixPoint</span>
          </h1>

          <p className="description">
            Get support and resolve your issues quickly.
            Create tickets, track progress and stay updated at every step.
          </p>

          <button className="create-ticket-btn">
            Create Ticket
          </button>
        </div>

        {/* Right Side */}
        <div className="hero-image">
      <img src={supportImage} alt="Customer support team" />
     </div>
      
        

      </section>

    </div>
  );
}

export { Home };