// import { Routes, Route } from "react-router-dom";

// function App() {

//     const dummyUser = {
//         name: "Rohit Sharma",
//         email: "rohit@gmail.com",
//     };

//     return (
//         <>
//             <Navbar
//                 user={dummyUser}
//                 setUser={() => {}}
//                 onLogout={() => {}}
//             />

//             <Routes>
//                 <Route path="/" element={<h1>Home</h1>} />
//                 <Route path="/login" element={<h1>Login</h1>} />
//                 <Route path="/profile" element={<h1>Profile</h1>} />
//             </Routes>
//         </>
//     );
// }


// export default App;



import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login"
import { useState } from "react";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";






function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (profile, token) => {
    setUser(profile);
  };

  const handleSignup = (profile, token) => {
    setUser(profile);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element = {<Navbar user={user} setUser={setUser} onLogout={handleLogout} />} />
      <Route path="/signup" element={<Signup onSignup = {handleSignup} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
                element={
                    <Layout
                        user={user}
                        setUser={setUser}
                        onLogout={handleLogout}
                    />
                }
            >
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />
            </Route>
    </Routes>
  );
}

export default App;
