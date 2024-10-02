import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import SkipNavigation from "../buttons/SkipNavigation";

export default function General({ children }) {
  return (
    <>
      <SkipNavigation />
      <Navbar />
      {children}
    </>
  );
}
