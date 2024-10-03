import {
  Box,
  Flex,
  Text,
  Separator,
  Card,
  Container,
  DropdownMenu,
  TextField,
} from "@radix-ui/themes";

import { useEffect, useRef, useState } from "react";

import WorkspaceNavbar from "../components/utils/WorkspaceNavbar";
import WorkspaceFileTree from "../components/utils/WorkspaceFileTree";
import { api, useNoteQuery, useUpdateNoteMutation } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import WorkspaceEditor from "../components/utils/WorkspaceEditor";
import { useDispatch } from "react-redux";

export default function Workspace() {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [updateNote] = useUpdateNoteMutation();

  const { data: noteData, isLoading, refetch } = useNoteQuery(id);
  const editorRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveNote = async () => {
    try {
      await updateNote({
        id,
        title,
        content: editorRef.current.getMarkdown(),
      });
      refetch();
      dispatch(api.util.resetApiState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.data.note.title);
      editorRef.current?.setMarkdown(noteData.data.note.content);
    }
  }, [noteData]);

  return (
    <>
      <WorkspaceNavbar />
      <main id="main">
        <Container className="px-4">
          <Flex gap="4" className="">
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
                            navigate("/workspace");
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
