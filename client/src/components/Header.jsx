import { useNavigate } from "react-router-dom";
import { removeDataFromLocalStorage } from "../utils/storage";
import { googleLogout } from "@react-oauth/google";

export const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>
        Welcome,{" "}
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          {user.name}
        </span>
      </h2>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => {
            navigate("/requests", { state: user });
          }}
        >
          Add Requests
        </button>
        <button
          onClick={() => {
            googleLogout();
            removeDataFromLocalStorage("token");
            navigate("/");
          }}
        >
          Logout
        </button>
        <img
          src={user.picture}
          alt="user"
          style={{ width: "64px", height: "64px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};
