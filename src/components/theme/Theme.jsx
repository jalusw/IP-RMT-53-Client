import { Theme as RadixTheme } from "@radix-ui/themes";
import { useSelector } from "react-redux";
export default function Theme({ children }) {
  const { appearance } = useSelector((state) => state.theme);

  return (
    <RadixTheme accentColor="jade" appearance={appearance}>
      {children}
    </RadixTheme>
  );
}
