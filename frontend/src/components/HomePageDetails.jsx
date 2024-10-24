import { Link } from "react-router-dom";
import "../styles/HomePageDetails.css";

// for the links, need to figure out if logged in or out
// if logged in, have buttons go to the events tab
// if logged out, have have buttons go to sign up 

export default function HomePageDetails() {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Reconnect. Rebuild. Run.</h1>
        <p>
          Join a community of runners breaking down barriers to physical and
          mental well-being. Whether you're overcoming social anxiety,
          reintegrating after COVID, or simply looking for a fresh start,
          PaceMates is here to support you.
        </p>
        <Link to="/login">
          <button className="cta-button">Sign Up Now</button>
        </Link>
      </section>

      <section className="problem">
        <h2>The Struggle to Reconnect After COVID-19</h2>
        <p>
          Health equity means everyone should have the opportunity to live
          their healthiest life. But for many, the COVID-19 pandemic created new
          obstacles—especially for those dealing with social anxiety and
          isolation. The world reopened, but the mental health challenges and
          barriers to physical fitness linger.
        </p>
        <p><strong>PaceMates is designed to help bridge this gap.</strong></p>
      </section>

      <section className="solution">
        <h2>What We Offer: More Than Just Running</h2>
        <ul>
          <li>
            <strong>Guided Running Events:</strong> Join virtual or in-person runs
            designed to support beginners, new-pandemic runners, or anyone
            hesitant to engage in traditional fitness.
          </li>
          <li>
            <strong>Mental Health Support:</strong> Access resources to help
            overcome social anxiety and boost your confidence while staying
            active.
          </li>
          <li>
            <strong>Community Building:</strong> Be part of a positive, judgment-free
            community where members support each other on their fitness journeys.
          </li>
        </ul>
      </section>

      <section className="statistics">
        <h2>The Power of Community and Fitness</h2>
        <p>Did you know?</p>
        <ul>
          <li>Group fitness activities can reduce feelings of isolation by over 30%.</li>
          <li>Outdoor activities like running became the top fitness trend during and after the pandemic.</li>
          <li>New-pandemic runners are 19.82% less likely to participate in in-person races but 115.37% more likely to prefer virtual races!</li>
        </ul>
        <Link to="/login">
          <button className="cta-button">Join the Movement Today</button>
        </Link>
      </section>

      <section className="how-it-works">
        <h2>How PaceMates Works</h2>
        <ol>
          <li><strong>Sign Up for Free:</strong> Create your account and set your fitness goals.</li>
          <li><strong>Choose Your Pace:</strong> Whether you prefer running alone or with a group, PaceMates offers both virtual and in-person events.</li>
          <li><strong>Connect & Run:</strong> Join a supportive community of runners and mental health advocates.</li>
        </ol>
        <Link to="/login">
          <button className="cta-button">Get Started Now</button>
        </Link>
      </section>

      <section className="testimonials">
        <h2>What Our Community Says</h2>
        <blockquote>
          "Before PaceMates, I struggled with anxiety and never thought I'd find
          a fitness community that felt safe. Now, I look forward to weekly
          runs!" — Andii, PaceMates Member
        </blockquote>
        <blockquote>
          "Joining PaceMates helped me break out of my shell after months of
          isolation. It's not just about fitness; it's about reconnecting with
          people in a way that feels right." — Angela, PaceMates Member
        </blockquote>
      </section>

      <section className="final-cta">
        <h2>Ready to Take the First Step?</h2>
        <p>
          Join <strong>PaceMates</strong> today and become part of a community
          that cares about your mental and physical well-being. Running can
          change lives—start your journey with us!
        </p>
        <Link to="/login">
          <button className="cta-button">Sign Up for Free</button>
        </Link>
      </section>
    </div>
  );
};
