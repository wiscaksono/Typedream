import isHotkey from "is-hotkey";
import { useCallback, useMemo, useState } from "react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaQuoteRight,
  FaSearch,
  FaUnderline,
} from "react-icons/fa";
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from "react-icons/md";
import { Text, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import BlockButton from "./BlockButton";
import MarkButton from "./MarkButton";
import Element from "./Slate/Element";
import Leaf from "./Slate/Leaf";
import Toolbar from "./Toolbar";

import CustomEditor from "@/services/slateEditor";
import { HOTKEYS_BLOCK, HOTKEYS_MARK } from "@/services/utils";

export default function SlateEditor({ data }) {
  const [search, setSearch] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];

      if (search && Text.isText(node)) {
        const { text } = node;
        const parts = text.split(search);
        let offset = 0;

        parts.forEach((part, i) => {
          if (i !== 0) {
            ranges.push({
              anchor: { path, offset: offset - search.length },
              focus: { path, offset },
              highlight: true,
            });
          }

          offset = offset + part.length + search.length;
        });
      }

      return ranges;
    },
    [search]
  );

  return (
    <div className="h-full">
      <Slate editor={editor} value={data}>
        <Toolbar>
          <MarkButton format="bold" icon={<FaBold />} />
          <MarkButton format="italic" icon={<FaItalic />} />
          <MarkButton format="underline" icon={<FaUnderline />} />
          <MarkButton format="code" icon={<FaCode />} />
          <BlockButton
            format="heading-one"
            icon={<span className="font-semibold">H1</span>}
          />
          <BlockButton
            format="heading-two"
            icon={<span className="font-semibold">H2</span>}
          />
          <BlockButton format="block-quote" icon={<FaQuoteRight />} />
          <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
          <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
          <BlockButton format="left" icon={<MdFormatAlignLeft />} />
          <BlockButton format="center" icon={<MdFormatAlignCenter />} />
          <BlockButton format="right" icon={<MdFormatAlignRight />} />
          <BlockButton format="justify" icon={<MdFormatAlignJustify />} />
          <div className="w-full relative">
            <button
              onClick={() => setIsSearch(!isSearch)}
              className={`absolute top-1/2 -translate-y-1/2 transition-all z-20 ${
                isSearch ? "left-3" : "left-0"
              }`}
            >
              <FaSearch className="text-white/40  text-sm" />
            </button>
            <input
              className={`${
                isSearch ? "opacity-100 w-[20%]" : "opacity-0 w-0"
              } bg-[#333333] rounded-3 pl-9 text-white/80 py-px focus:ring-1 !ring-white border-0 transition-all placeholder:text-sm`}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search something"
            />
          </div>
        </Toolbar>
        <div className="h-full">
          <Editable
            decorate={decorate}
            id="slate-editor"
            className="text-white"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS_MARK) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS_MARK[hotkey];
                  CustomEditor.toggleMark(editor, mark);
                }
              }

              for (const hotkey in HOTKEYS_BLOCK) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS_BLOCK[hotkey];
                  CustomEditor.toggleBlock(editor, mark);
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
}
