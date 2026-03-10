import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Input from "../Common/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Please enter a valid email or mobile number.");
      hasError = true;
    } else if (
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (password.length < 4 || password.length > 60) {
      setPasswordError(
        "Your password must contain between 4 and 60 characters.",
      );
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) return;

    try {
      await login(email.trim(), password);
      navigate("/home");
    } catch {
      setFormError(
        "Sorry, we can't find an account with this email address. Please try again or create a new account.",
      );
    }
  };

  return (
    <div className="w-full max-w-md rounded bg-black/75 p-10 text-white">
      <h3 className="mb-8 text-3xl font-semibold">Sign In</h3>

      {formError && (
        <div className="mb-5 mt-2 p-5 bg-yellow-400 rounded text-md text-black">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email or mobile number"
          value={email}
          onChange={setEmail}
          error={emailError}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={passwordError}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded bg-red-600 py-3 font-semibold hover:bg-red-700"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 flex items-center text-sm text-zinc-400">
        <input type="checkbox" className="mr-2 accent-zinc-400" />
        <label>Remember me</label>
      </div>

      <p className="mt-4 text-sm text-zinc-400">
        New to Netflix?{" "}
        <span
          onClick={() => navigate("/auth/signup")}
          className="cursor-pointer text-white hover:underline"
        >
          Sign up now
        </span>
      </p>

      <p className="text-xs text-zinc-500 mt-6">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
      </p>

      <p className="text-xs text-blue-500 hover:underline cursor-pointer mt-1">
        Learn more
      </p>
    </div>
  );
};

export default Login;
