import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  debugger;
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);

  return children;
}
