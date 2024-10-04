import { ScrollArea } from "@radix-ui/themes";
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
  BlockTypeSelect,
  ListsToggle,
  Button,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef, forwardRef } from "react";

import { useSelector } from "react-redux";
import {
  useEnhanceNoteMutation,
  useSummarizeNoteMutation,
} from "../../services/api";
import { RocketIcon } from "@radix-ui/react-icons";

export default forwardRef(function WorkspaceEditor(props, ref) {
  const { toolbars, initialMarkdown = "", ...rest } = props;

  const { appearance } = useSelector((state) => state.theme);

  const [enhanceNote, isLoading] = useEnhanceNoteMutation();
  const [summarizeNote] = useSummarizeNoteMutation();

  return (
    <ScrollArea>
      <MDXEditor
        markdown={initialMarkdown}
        ref={ref}
        contentEditableClassName={`prose ${appearance == "dark" && "prose-invert"} manrope-regular`}
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          markdownShortcutPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          listsPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <ToolbarSeparator />
                <Button
                  onClick={async () => {
                    try {
                      const result = await enhanceNote({
                        content: ref.current.getMarkdown(),
                      });
                      ref.current.setMarkdown(result.data?.data?.result);
                    } catch (error) {}
                  }}
                >
                  <RocketIcon />
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      const result = await summarizeNote({
                        content: ref.current.getMarkdown(),
                      });
                      ref.current.setMarkdown(result.data?.data?.result);
                    } catch (error) {}
                  }}
                >
                  Summarize
                </Button>
              </>
            ),
          }),
        ]}
        {...rest}
      />
    </ScrollArea>
  );
});
