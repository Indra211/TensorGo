import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  retriveDataFromLocalStorage,
  storeDataInLocalStorage,
} from "../utils/storage";
import { urls } from "../Apis/urls";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const Home = () => {
  const navigate = useNavigate();
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState({});
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  const token = retriveDataFromLocalStorage("token");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setUser(null);
          return;
        }
        setUserLoading(true);
        const response = await axios.get(urls.getUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
          setUser(null);
          return;
        }
        setUser(response.data.user);
        const requestResponse = await axios.get(urls.getRequests, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(
          requestResponse.data?.reduce((acc, req) => {
            if (acc[req.category]) {
              acc[req.category].push(req);
            } else {
              acc[req.category] = [req];
            }
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleLoginSuccess = async (credentialResponse) => {
    storeDataInLocalStorage("token", credentialResponse.credential);
    try {
      const { credential } = credentialResponse;
      const response = await axios.post(urls.googleAuth, {
        token: credential,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      {!user ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vh",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <GoogleOAuthProvider clientId={clientId}>
            <h1>Welcome to TensorGo Support</h1>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("Login failed")}
            />
          </GoogleOAuthProvider>
        </div>
      ) : (
        <div>
          <Header user={user} />
          {userLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.keys(requests).map((category) => (
                <div
                  key={category}
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  <h2>{category}</h2>
                  {requests[category].map((request) => (
                    <ul key={request._id}>
                      <li>{request.comment}</li>
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
