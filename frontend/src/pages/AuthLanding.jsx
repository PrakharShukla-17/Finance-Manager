import { useNavigate } from "react-router-dom";
import "./AuthLanding.css";
import bgVideo from "../assets/landing.mp4"; // rename based on actual file name

export default function AuthLanding() {
  const nav = useNavigate();

  return (
    <div className="auth-wrapper">

      {/* LEFT VIDEO SECTION */}
      <div className="auth-left">
        <video className="auth-video" autoPlay loop muted playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="auth-overlay">
          <div className="auth-logo fade-in">FINARY</div>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="auth-right">
        <div className="auth-content slide-up">
          <h2>Your finances, simplified.</h2>

          <button className="btn primary" onClick={() => nav("/login")}>
            Login
          </button>

          <button className="btn secondary" onClick={() => nav("/signup")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
