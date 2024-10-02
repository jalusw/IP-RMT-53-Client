import {
  Box,
  Flex,
  Text,
  Separator,
  Card,
  Container,
  Button,
  DropdownMenu,
  TextField,
} from "@radix-ui/themes";

import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  Separator as ToolbarSeparator,
  imagePlugin,
  InsertImage,
  tablePlugin,
  InsertTable,
  thematicBreakPlugin,
  InsertThematicBreak,
  CreateLink,
  linkDialogPlugin,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef, useState } from "react";

import WorkspaceNavbar from "../components/utils/WorkspaceNavbar";
import WorkspaceFileTree from "../components/utils/WorkspaceFileTree";
import { useNoteQuery, useUpdateNoteMutation } from "../services/api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Workspace() {
  const { appearance } = useSelector((state) => state.theme);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const { id } = useParams();
  const [updateNote] = useUpdateNoteMutation();
  const { data: noteData, isLoading, refetch } = useNoteQuery(id);

  const saveNote = async () => {
    try {
      const response = await updateNote({
        id,
        title,
        content: markdown,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.data.note.title);
      setMarkdown(noteData.data.note.content);
      editorRef.current.setMarkdown(noteData.data.note.content);
    }
  }, [noteData]);

  const editorRef = useRef();

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
              <Card className="min-h-[450px]">
                <div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="ghost">
                        File
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item
                        shortcut="Ctrl + n"
                        onClick={() => {
                          setTitle("Untitled");
                          editorRef.current.setMarkdown("");
                        }}
                      >
                        New File
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
                </div>
                <Separator orientation="horizontal" className="w-full" />
                <Box className="my-4">
                  <Text size="2" asChild>
                    <label>Title</label>
                  </Text>
                  <TextField.Root
                    placeholder="Insert title here"
                    className="w-full"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Box>
                <MDXEditor
                  markdown={markdown}
                  onChange={(value) => setMarkdown(value)}
                  ref={editorRef}
                  contentEditableClassName={`prose ${appearance == "dark" && "prose-invert"}`}
                  plugins={[
                    headingsPlugin(),
                    quotePlugin(),
                    listsPlugin(),
                    markdownShortcutPlugin(),
                    imagePlugin(),
                    tablePlugin(),
                    thematicBreakPlugin(),
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <ToolbarSeparator />
                          <BlockTypeSelect />
                          <BoldItalicUnderlineToggles />
                          <InsertImage />
                          <InsertTable />
                          <InsertThematicBreak />
                        </>
                      ),
                    }),
                  ]}
                />
              </Card>
            </Box>
          </Flex>
        </Container>
      </main>
    </>
  );
}
