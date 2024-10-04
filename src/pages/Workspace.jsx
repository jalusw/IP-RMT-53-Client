import {
  Box,
  Flex,
  Card,
  Container,
  TextField,
  DropdownMenu,
  Button,
  Text,
  Separator,
} from "@radix-ui/themes";
import WorkspaceNavbar from "../components/utils/WorkspaceNavbar";
import WorkspaceFileTree from "../components/utils/WorkspaceFileTree";
import WorkspaceEditor from "../components/utils/WorkspaceEditor";

import { useRef, useState } from "react";

import { useCreateNoteMutation, useSaveToDriveMutation } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FileIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Workspace() {
  const [title, setTitle] = useState("Untitled");
  const [createNote, { isLoading: createNoteIsLoading }] =
    useCreateNoteMutation();
  const editorRef = useRef();
  const navigate = useNavigate();
  const { googleCredentials } = useSelector((state) => state.auth);

  const [saveToDrive, { isLoading: saveToDriveIsLoading }] =
    useSaveToDriveMutation();

  const saveNote = async () => {
    try {
      const response = await createNote({
        title,
        content: editorRef.current.getMarkdown(),
      });
      navigate(`/workspace/${response.data?.data?.note?.id}`);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <WorkspaceNavbar />
      <main id="main">
        <Container className="px-8">
          <Flex gap="4">
            <Box className="hidden max-w-[300px] flex-1 md:block">
              <WorkspaceFileTree />
            </Box>
            <Box className="flex-1">
              <Card className="min-h-[100vh] max-w-full">
                <Box className="">
                  <Flex gap="4">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Text className="cursor-pointer" size="2">
                          File
                        </Text>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Item
                          shortcut="Ctrl + n"
                          onClick={() => {
                            setTitle("Untitled");
                            editorRef.current.setMarkdown("");
                          }}
                        >
                          New Page
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                          shortcut="Ctrl + s"
                          onClick={() => saveNote()}
                        >
                          Save
                        </DropdownMenu.Item>
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger>
                            Save To
                          </DropdownMenu.SubTrigger>
                          <DropdownMenu.SubContent>
                            <DropdownMenu.Item
                              onClick={async () => {
                                saveToDrive({
                                  access_token: googleCredentials.access_token,
                                  title,
                                  content: editorRef.current.getMarkdown(),
                                });
                              }}
                            >
                              Google Drive
                            </DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>
                  <Separator className="my-2 w-full" orientation="horizontal" />
                  <TextField.Root
                    className="my-4"
                    placeholder="Insert Your Title Here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="3"
                  ></TextField.Root>
                </Box>
                <WorkspaceEditor ref={editorRef} />
              </Card>
            </Box>
          </Flex>
        </Container>
      </main>
    </>
  );
}
