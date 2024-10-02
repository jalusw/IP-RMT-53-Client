import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/authSlice";
import { Button } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";

export default function Logout() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
  };

  return (
    <Button variant="soft" className="cursor-pointer" onClick={logout}>
      <ExitIcon size={16} />
    </Button>
  );
}
