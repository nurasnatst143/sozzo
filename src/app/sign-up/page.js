"use client";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error,setError] = useState({
    name: "",
    email: "",
    password: '',
  })

  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
const router = useRouter()
  const handleSubmit = async e => {
    e.preventDefault();
    if(error.name || error.password || error.email){
      return;
    }
    const res = await axios.post('/api/sign-up', credentials)
    if(res.status === 200){
      router.push('/sign-up/email-confirmation')
    }
  }
  return (
    <div>
      <div className="bg-blue-600 dark:bg-black">
        <div className="max-w-[1400px] mx-auto">
          <Nav />
        </div>
      </div>
      <div className="relative h-screen w-full bg-[url('/assets/bg.jpg')] bg-no-repeat bg-center bg-cover flex items-center">
        <div className="bg-black/20 backdrop-blur-md  shadow-md border border-white/20 mx-auto p-8 max-w-[500px] rounded-md ">
          <h1 className="text-center text-white text-2xl font-bold py-3">
            Sign Up For Account
          </h1>
          <form
            className="w-full max-w-md m-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-full  border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 text-white placeholder:text-white mb-8"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-full  border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 text-white placeholder:text-white mb-8"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-full  border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 text-white placeholder:text-white mb-8"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="capitalize w-full bg-white px-4 py-2 rounded-full text-lg text-black font-semibold  hover:bg-gray-200 hover:text-gray-800 transition duration-300 focus:outline-none"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
