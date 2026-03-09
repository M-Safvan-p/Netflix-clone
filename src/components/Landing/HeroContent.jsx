import { useState } from "react";
import Input from "../Common/Input";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate()  

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleGetStarted(e) {
    e.preventDefault();
    let hasError = false;
    setError("");
    if (
      !email ||
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setError("Please enter a valid email address.");
      hasError = true;
    }
    if (!hasError) {
      navigate(`/auth/signup?email=${email}`);
    }
  }

  return (
    <div>
      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
            Unlimited movies, <br /> shows, and more
          </h1>

          <p className="mt-4 text-xl">Starts at ₹149. Cancel at any time.</p>

          <p className="mt-6 text-base text-zinc-300">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          {/* Email Form */}
          <form onSubmit={handleGetStarted}>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
              <Input
                label="Email address"
                value={email}
                onChange={setEmail}
                type="email"
                error={error}
              />

              <button
                type="submit"
                className={`bg-red-600 font-bold hover:bg-red-700 py-3 ${
                  error ? "mb-10" : "mb-4"
                } px-6 rounded`}
              >
                <span>Get Started</span>
                <span className="text-xl ml-1">›</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
