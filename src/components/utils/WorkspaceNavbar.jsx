import { Box, Flex, Section, Container, Button } from "@radix-ui/themes";
import ThemeSwitcher from "../buttons/ThemeSwitcher";
import ProfileSetting from "../utils/ProfileSetting";
import Logout from "../buttons/Logout";
import { FileIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import WorkspaceFileTree from "./WorkspaceFileTree";
import { useState } from "react";

export default function WorkspaceNavbar() {
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(false);
  return (
    <Section asChild size="2">
      <nav>
        <Container className="px-8">
          <Flex justify="between" align="center">
            <Box>
              <Box className="fixed left-0 top-0 z-[100] w-[50%]">
                <WorkspaceFileTree
                  className={isFileTreeOpen ? "block" : "hidden"}
                />
              </Box>
            </Box>
            <Flex asChild className="space-x-4">
              <ul>
                <li className="md:hidden">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => {
                      setIsFileTreeOpen(!isFileTreeOpen);
                    }}
                  >
                    <FileIcon />
                  </Button>
                </li>
                <li>
                  <ThemeSwitcher variant="outline" />
                </li>
                <li>
                  <Logout />
                </li>
                <ProfileSetting />
              </ul>
            </Flex>
          </Flex>
        </Container>
      </nav>
    </Section>
  );
}
