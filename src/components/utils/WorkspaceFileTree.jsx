import {
  Box,
  Flex,
  Text,
  Section,
  Separator,
  Card,
  Container,
  Button,
  ContextMenu,
  DropdownMenu,
  Dialog,
  TextField,
  Tabs,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useNotesQuery } from "../../services/api";
import { FileIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function WorkspaceFileTree() {
  const navigate = useNavigate();

  const { data: notesData, isLoading: notesIsLoading } = useNotesQuery();

  if (notesIsLoading) {
    return <p>loading..</p>;
  }

  if (notesData.data.notes.length == 0) {
    return <p>it appears that you don't have any single note o_O</p>;
  }

  return (
    <Card>
      <Box>
        <TextField.Root placeholder="Search files...">
          <TextField.Slot></TextField.Slot>
          <TextField.Slot>
            <Button variant="ghost">
              <MagnifyingGlassIcon />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Box>

      <Separator className="my-2 w-full" />
      <Flex direction="column" className="space-y-2" asChild>
        <ul>
          {notesData.data?.notes?.map((note) => (
            <li
              className="w-full cursor-pointer rounded p-1 px-2 hover:bg-slate-200"
              key={note.id}
            >
              <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                  <Text
                    className="block w-full"
                    size="2"
                    onClick={() => {
                      navigate("/workspace/" + note.id);
                    }}
                  >
                    {note.title}
                  </Text>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
                  <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item>Share</ContextMenu.Item>
                  <ContextMenu.Item>Add to favorites</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item shortcut="⌘ ⌫" color="red">
                    Delete
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            </li>
          ))}
        </ul>
      </Flex>
    </Card>
  );
}
