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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef, forwardRef } from "react";

import { useSelector } from "react-redux";

export default forwardRef(function WorkspaceEditor(props, ref) {
  const { toolbars, initialMarkdown = "", ...rest } = props;
  const { appearance } = useSelector((state) => state.theme);

  return (
    <ScrollArea>
      <MDXEditor
        markdown={initialMarkdown}
        ref={ref}
        contentEditableClassName={`prose ${appearance == "dark" && "prose-invert"}`}
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
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
        {...rest}
      />
    </ScrollArea>
  );
});
