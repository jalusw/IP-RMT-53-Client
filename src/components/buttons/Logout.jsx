import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/authSlice";
import { Button } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <Button variant="soft" className="cursor-pointer" onClick={logout}>
      <ExitIcon size={16} />
    </Button>
  );
}
