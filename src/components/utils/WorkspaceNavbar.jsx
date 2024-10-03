import { Box, Flex, Section, Container } from "@radix-ui/themes";
import ThemeSwitcher from "../buttons/ThemeSwitcher";
import ProfileSetting from "../utils/ProfileSetting";
import Logout from "../buttons/Logout";

export default function WorkspaceNavbar() {
  return (
    <Section asChild size="2">
      <nav>
        <Container className="px-8">
          <Flex justify="between" align="center">
            <ProfileSetting />
            <Box></Box>
            <Flex asChild className="space-x-2">
              <ul>
                <li>
                  <ThemeSwitcher />
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </Flex>
          </Flex>
        </Container>
      </nav>
    </Section>
  );
}
