import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Input from "../Common/Input";
import { useSearchParams, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const prefillEmail = params.get("email");

  const [email, setEmail] = useState(prefillEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);
    let hasError = false;

    if (!email.trim()) {
      setEmailError("Please enter a valid email or mobile number.");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Confirm password should match password.");
      hasError = true;
    } else {
      setConfirmPasswordError(null);
    }

    if (hasError) return;

    try {
      await signup(email.trim(), password.trim());
      navigate("/");
    } catch (error) {
      let message = "An unexpected error occurred.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message =
            "This email is already registered. Try logging in instead.";
          break;

        case "auth/invalid-email":
          message = "The email address is not valid.";
          break;

        case "auth/weak-password":
          message = "The password is too weak. Please use at least 6 characters.";
          break;

        case "auth/network-request-failed":
          message = "Network error. Please check your internet connection.";
          break;

        default:
          message = error.message || "Signup failed.";
      }

      setFormError(message);
    }
  };

  return (
    <div className="w-full max-w-md rounded bg-black/75 p-10 text-white">
      <h3 className="mb-8 text-3xl font-semibold">Sign Up</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={confirmPasswordError}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded bg-red-600 py-3 font-semibold hover:bg-red-700"
        >
          Sign Up
        </button>
      </form>

      {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}

      <div className="mt-6 flex items-center text-sm text-zinc-400">
        <input type="checkbox" className="mr-2 accent-zinc-400" />
        <label>Remember me</label>
      </div>

      <p className="mt-4 text-sm text-zinc-400">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/auth/login")}
          className="cursor-pointer text-white hover:underline"
        >
          Log in now
        </span>
      </p>

      <p className="mt-6 text-xs text-zinc-500">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
      </p>

      <p className="mt-1 cursor-pointer text-xs text-blue-500 hover:underline">
        Learn more
      </p>
    </div>
  );
};

export default Signup;