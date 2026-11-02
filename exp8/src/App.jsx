
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "./App.css";

function Home() {
  return (
    <div className="home-card">
      <div className="home-content">
        <p className="tagline">ELITE ARCHITECTURAL FIRM</p>
        <h2>Designing Spaces,<br />Creating Futures</h2>
        <p>
          We create innovative, comfortable and sustainable
          architectural spaces for modern living.
        </p>
        <Link to="/register" className="button">
          Register Now
        </Link>
      </div>

      <div className="home-icon">🏛️</div>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    gender: "",
    state: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setSubmitted(false);
  };

  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name.trim()),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),
    age: !/^\d+$/.test(form.age) ||
      Number(form.age) < 18 || Number(form.age) > 30,
    mobile: !/^\d{10}$/.test(form.mobile),
    gender: !form.gender,
    state: !form.state
  };

  const valid =
    form.name.trim() !== "" && !errors.name &&
    form.email !== "" && !errors.email &&
    form.password !== "" && !errors.password &&
    form.age !== "" && !errors.age &&
    !errors.mobile && !errors.gender && !errors.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);

    if (valid) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="register-card">
      <div className="form-heading">
        <p className="tagline">JOIN OUR COMMUNITY</p>
        <h2>User Registration</h2>
        <p>Create your account to get started.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label>Full Name</label>
        <input name="name" value={form.name}
          onChange={updateField} placeholder="Enter your name" />
        {(attempted || form.name) && errors.name &&
          <small>Name must contain letters only.</small>}

        <label>Email Address</label>
        <input name="email" type="email" value={form.email}
          onChange={updateField} placeholder="Enter your email" />
        {(attempted || form.email) && errors.email &&
          <small>Enter a valid email address.</small>}

        <label>Password</label>
        <input name="password" type="password" value={form.password}
          onChange={updateField} placeholder="Minimum 8 characters" />
        {(attempted || form.password) && errors.password &&
          <small>Use uppercase, lowercase, a number and at least 8 characters.</small>}

        <label>Age</label>
        <input name="age" type="number" value={form.age}
          onChange={updateField} placeholder="Enter age (18–30)" />
        {(attempted || form.age) && errors.age &&
          <small>Age must be between 18 and 30.</small>}

        <label>Mobile Number</label>
        <input name="mobile" type="tel" value={form.mobile}
          onChange={updateField} placeholder="10-digit mobile number" />
        {(attempted || form.mobile) && errors.mobile &&
          <small>Enter exactly 10 digits.</small>}

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={updateField}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {attempted && errors.gender &&
          <small>Please select your gender.</small>}

        <label>State</label>
        <select name="state" value={form.state} onChange={updateField}>
          <option value="">Select state</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>
        {attempted && errors.state &&
          <small>Please select your state.</small>}

        <button type="submit">Submit Registration</button>

        {submitted && (
          <p className="success">
            Registration completed successfully!
          </p>
        )}
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>ELITE ARCHITECTURAL FIRM</h1>
        <p>Designing Spaces, Creating Futures</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Registration</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer>
        <p>© 2026 Elite Architectural Firm | Web Technology Lab</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
