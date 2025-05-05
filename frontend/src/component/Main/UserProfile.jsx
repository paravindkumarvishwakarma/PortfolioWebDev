import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          updateProfile(user, { displayName: "Guest User" })
            .then(() => setUser({ ...user, displayName: "Guest User" }))
            .catch((error) => console.error("Error updating profile", error));
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleProfileVisibility = (e) => {
    e.stopPropagation();
    setIsProfileVisible((prev) => !prev);
  };

  const closeProfileDiv = () => {
    setIsProfileVisible(false);
  };


  return (
    <div className="relative" onClick={closeProfileDiv}>
      <div onClick={toggleProfileVisibility}>
        <CgProfile
          size={32}
          className="cursor-pointer"
        />
      </div>

      {isProfileVisible && (
        <div
          className="absolute top-10 left-[-180px] bg-white p-4 rounded-lg shadow-lg border w-[250px] z-20"
          onClick={(e) => e.stopPropagation()} // To prevent closing when clicking inside
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">User Profile</h2>
          <p className="text-sm text-gray-800 mb-1">
            <strong>Name:</strong> {user.displayName || "Guest User"}
          </p>
          <p className="text-sm text-gray-800 mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <div className="text-sm text-gray-800 mb-3">
            <strong>Password:</strong>{" "}
            <input
              type="password"
              className="border mt-1 px-2 py-1 rounded w-full text-sm"
              placeholder="******"
              disabled
            />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition duration-200"
          >
            <IoMdLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
