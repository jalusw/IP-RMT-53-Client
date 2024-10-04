import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Section,
  Separator,
} from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GitHubLogoIcon as GithubIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import ThemeSwitcher from "../buttons/ThemeSwitcher";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Section asChild size="1">
        <nav>
          <Container px="4">
            <Flex justify="between" align="center">
              <Heading className="manrope-bold" color="jade">
                <RouterLink to="/">FlowMD</RouterLink>
              </Heading>

              <Box />
              <Flex asChild gap="4">
                <ul>
                  <li>
                    <ThemeSwitcher />
                  </li>
                  <li>
                    <Button asChild variant="soft">
                      <Link
                        href="https://github.com/jalusw/IP-RMT-53-Client"
                        target="_blank"
                        rel="nofollow noopener"
                      >
                        <GithubIcon size={16} />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    {(user && (
                      <RouterLink to="/workspace">
                        <Avatar
                          size="2"
                          src={user.avatar}
                          fallback={user.username[0]}
                        />
                      </RouterLink>
                    )) || (
                      <Button>
                        <RouterLink to="/login">Sign In</RouterLink>
                      </Button>
                    )}
                  </li>
                </ul>
              </Flex>
            </Flex>
          </Container>
        </nav>
      </Section>
      <Separator orientation="horizontal" style={{ width: "100%" }} />
    </>
  );
}
