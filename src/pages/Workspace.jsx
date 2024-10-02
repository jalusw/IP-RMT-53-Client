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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef, useState } from "react";

import WorkspaceNavbar from "../components/utils/WorkspaceNavbar";
import WorkspaceFileTree from "../components/utils/WorkspaceFileTree";
import { useNoteMutation } from "../services/api";

export default function Workspace() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("# Hello World !");

  const [createNote, { isLoading }] = useNoteMutation(markdown);
  const saveNote = async () => {
    try {
      const respone = await createNote({
        title,
        content: markdown,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editorRef = useRef();

  return (
    <>
      <WorkspaceNavbar />
      <main id="main">
        <Container className="px-4">
          <Flex gap="8" className="">
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
                          editorRef.current.setMarkdown("# Hello World!");
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
                  className="mt-4"
                  markdown={markdown}
                  onChange={(value) => setMarkdown(value)}
                  ref={editorRef}
                  contentEditableClassName="prose"
                  plugins={[
                    headingsPlugin(),
                    quotePlugin(),
                    listsPlugin(),
                    markdownShortcutPlugin(),
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
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
