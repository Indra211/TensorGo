import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { urls } from "../Apis/urls";
import { retriveDataFromLocalStorage } from "../utils/storage";

export const Requests = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const token = retriveDataFromLocalStorage("token");
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const Categories = [
    "General Queries",
    "Product Features Queries",
    "Product Pricing Queries",
    "Product Feature Implementation Requests",
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        urls.submitRequest,
        {
          category,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Request submitted!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header user={state} />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <select
          style={{ width: "400px", height: "40px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {Categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          style={{ width: "400px", height: "200px" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
        />
        <button disabled={loading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
