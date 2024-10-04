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
import {
  api,
  useDeleteNoteMutation,
  useNoteQuery,
  useSaveToDriveMutation,
  useUpdateNoteMutation,
} from "../services/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import WorkspaceEditor from "../components/utils/WorkspaceEditor";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Workspace() {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [updateNote] = useUpdateNoteMutation();

  const [deleteNote] = useDeleteNoteMutation();

  const { googleCredentials } = useSelector((state) => state.auth);

  const [saveToDrive, { isLoading: saveToDriveIsLoading }] =
    useSaveToDriveMutation();

  const { data: noteData, isLoading, refetch, isError } = useNoteQuery(id);
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
      toast.error("An error occurred. Please try again later.");
    }
  };

  if (isError) {
    return <Navigate to="/workspace" />;
  }

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
        <Container className="px-8">
          <Flex gap="4" className="">
            <Box className="hidden max-w-[300px] flex-1 md:block">
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
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                          color="red"
                          onClick={async () => {
                            try {
                              await deleteNote(id);
                              navigate("/workspace");
                            } catch (error) {
                              toast.error(
                                "An error occurred. Please try again later.",
                              );
                            }
                          }}
                        >
                          Delete
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
