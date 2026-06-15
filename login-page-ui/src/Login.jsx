import React, { useMemo, useState } from "react";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return emailOk && password.length >= 1;
  }, [email, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    try {
      // Replace with your API call.
      await new Promise((r) => setTimeout(r, 700));
      alert(`Logged in as: ${email}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="loginPage">
      <section className="loginShell" aria-label="Login page">
        <div className="loginHero" aria-hidden="true">
          <div className="loginHeroInner">
            <div className="loginBadge">
              <span className="loginDot" />
              Secure access
            </div>
            <h1 className="loginTitle">Welcome back</h1>
            <p className="loginSubtitle">Sign in with your email and password to continue.</p>
          </div>
        </div>

        <div className="loginCard">
          <div className="loginCardHeader">
            <h2>Login</h2>
            <p>Enter your credentials to access your account.</p>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="Your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="actions">
              <button
                type="button"
                className="forgot"
                onClick={() => alert("Forgot password clicked")}
              >
                Forgot Password
              </button>
            </div>

            <button type="submit" className="button" disabled={!isFormValid || isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="smallHint">Tip: Use a strong password and keep your account secure.</p>
        </div>
      </section>
    </main>
  );
}

