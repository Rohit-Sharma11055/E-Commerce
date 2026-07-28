// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

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
import Signup from "./components/Signup";
import Login from "./components/Login"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
