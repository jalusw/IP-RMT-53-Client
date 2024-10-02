import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function SkipNavigation() {
  return (
    <Button className="absolute top-[-100%] focus:top-0" asChild size="3">
      <a href="#main">Skip to main content</a>
    </Button>
  );
}
