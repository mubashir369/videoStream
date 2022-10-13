import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import {useDispatch} from 'react-redux'
import { logoutAction } from "../../redux/slice/userSlice";
export default function NavBar() {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(false);
  const dispatch=useDispatch()
  const logOut = (e) => {
    e.preventDefault();
    const conf = window.confirm("Do you want to LogOut");
    if (conf) {
        dispatch(logoutAction())
      navigate("/login");
    }
  };
  useEffect(() => {
    const tok=localStorage.getItem("vsuToken")
    if(tok){
        const token =JSON.parse(tok) ;
        setUser(token.details);
    }
   
  }, []);

  return (
    <>
      <nav className="w-full bg-zinc-50 shadow-sm fixed top-0 z-40">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to={"/"}>
                <h2 className="text-2xl font-bold text-gray-900">V-Play</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className=" hover:text-indigo-200">
                  <Link to={"/"}>All Video</Link>
                </li>
                <li className=" hover:text-indigo-200">
                  <Link to={"/trend"}>Treading videos</Link>
                </li>
                {user ? (
                  <>
                  <li className=" hover:text-indigo-200">
                    <Link to={"/upload"}>Upload video</Link>
                  </li>
                  <li className=" hover:text-indigo-200">
                  <Link to={"/myVideos"}>My Videos</Link>
                </li>
                  </>
                  

                ) : (
                  ""
                )}
              </ul>
              {user ? (
                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                  <Link
                    to={"/login"}
                    className="inline-block w-full px-4 py-2 text-center  bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    {user.username}
                  </Link>
                  <Button
                    onClick={logOut}
                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                  <Link
                    to={"/login"}
                    className="inline-block w-full px-4 py-2 text-center  bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign in
                  </Link>
                  <Link
                    to={"/signUp"}
                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
          {user ? (
            <div className="hidden space-x-2 md:inline-block">
              <Link
                to={"/profile"}
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
               {user.username}
              </Link>
              <Button
                onClick={logOut}
                className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="hidden space-x-2 md:inline-block">
              <Link
                to={"/login"}
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </Link>
              <Link
                to={"/signUp"}
                className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
