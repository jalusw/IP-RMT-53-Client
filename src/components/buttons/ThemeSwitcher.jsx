import { Button } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../slices/themeSlice";

export default function ThemeSwitcher(props) {
  const { variant = "soft" } = props;
  const dispatch = useDispatch();
  const { appearance } = useSelector((state) => state.theme);
  const toggleTheme = () => {
    dispatch(setTheme(appearance == "dark" ? "light" : "dark"));
  };
  return (
    <Button
      variant={variant}
      title="toggle theme"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      {appearance == "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  );
}
