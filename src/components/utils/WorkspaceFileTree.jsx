import { Box, Flex, Text, Card, ContextMenu, Tabs } from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";
import { useNotesQuery, useDeleteNoteMutation } from "../../services/api";
import { FileIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function WorkspaceFileTree(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { className } = props;

  const {
    data: notesData,
    refetch,
    isLoading: notesIsLoading,
  } = useNotesQuery();

  const [deleteNote] = useDeleteNoteMutation();

  if (notesIsLoading) {
    return <p>loading..</p>;
  }

  return (
    <Card className={`sticky top-0 h-[100vh] ${className}`}>
      <Tabs.Root defaultValue="files">
        <Tabs.List>
          <Tabs.Trigger value="files">
            <FileIcon />
          </Tabs.Trigger>
        </Tabs.List>
        <Box pt="3">
          <Tabs.Content value="files">
            <Flex direction="column" className="space-y-2" asChild>
              <ul>
                {notesData.data?.notes?.map((note) => (
                  <li
                    className="w-full cursor-pointer rounded p-1 px-2"
                    key={note.id}
                  >
                    <ContextMenu.Root>
                      <ContextMenu.Trigger asChild>
                        <Text
                          className="block w-full"
                          color={id == note.id ? "jade" : "black"}
                          size="2"
                          onClick={() => {
                            navigate("/workspace/" + note.id);
                          }}
                        >
                          {note.title}
                        </Text>
                      </ContextMenu.Trigger>
                      <ContextMenu.Content>
                        <ContextMenu.Item shortcut="⌘ E">
                          Archive
                        </ContextMenu.Item>
                        <ContextMenu.Item shortcut="⌘ D">
                          Duplicate
                        </ContextMenu.Item>
                        <ContextMenu.Separator />
                        <ContextMenu.Item
                          color="red"
                          onClick={async () => {
                            try {
                              await deleteNote(note.id);
                              navigate("/workspace");
                            } catch (error) {
                              toast.error(
                                "An error occurred. Please try again later.",
                              );
                            }
                          }}
                        >
                          Delete
                        </ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
                  </li>
                ))}
              </ul>
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  );
}
