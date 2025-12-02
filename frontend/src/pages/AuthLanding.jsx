import { useNavigate } from "react-router-dom";
import "./AuthLanding.css";
import bgVideo from "../assets/landing2.mp4";

export default function AuthLanding() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">

      {/* LEFT — VIDEO BACKGROUND */}
      <div className="auth-left">
        <video className="auth-video" autoPlay loop muted playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="auth-overlay">
          <div className="auth-logo fade-in">
            FI<span>NARY</span>
          </div>
        </div>
      </div>

      {/* RIGHT — CTA CONTENT */}
      <div className="auth-right">
        <div className="auth-content slide-up">
          <h2 className="tagline">Cause your money should be your finary priority.</h2>

          <button 
            className="btn primary"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn secondary"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
