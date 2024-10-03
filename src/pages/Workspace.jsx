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

import { api, useCreateNoteMutation, useNotesQuery } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Workspace() {
  const [title, setTitle] = useState("Untitled");
  const [createNote, { isLoading: createNoteIsLoading }] =
    useCreateNoteMutation();
  const editorRef = useRef();
  const navigate = useNavigate();

  const saveNote = async () => {
    try {
      const response = await createNote({
        title,
        content: editorRef.current.getMarkdown(),
      });
      navigate(`/workspace/${response.data?.data?.note?.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <WorkspaceNavbar />
      <main id="main">
        <Container className="px-8">
          <Flex gap="4">
            <Box className="max-w-[250px] flex-1">
              <WorkspaceFileTree />
            </Box>
            <Box className="flex-1">
              <Card className="min-h-[100vh]">
                <Box className="">
                  <Flex>
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
                        <DropdownMenu.Item shortcut="Ctrl + Shift + s">
                          <Text>Save As</Text>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                          color="red"
                          onClick={() => {
                            editorRef.current.setMarkdown("");
                          }}
                        >
                          Reset
                        </DropdownMenu.Item>
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
