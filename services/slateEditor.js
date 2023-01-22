import { Editor, Element, Node, Transforms } from "slate";

import { LIST_TYPES, TEXT_ALIGN_TYPES } from "./utils";

class SlateEditor {
  toggleMark(editor, format) {
    const marks = Editor.marks(editor);
    const isActive = marks ? marks[format] === true : false;

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }

  toggleBlock(editor, format) {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n.type === format || n.align === format),
      })
    );
    const isActive = !!match;
    const isList = LIST_TYPES.includes(format);
    const isAlign = TEXT_ALIGN_TYPES.includes(format);
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !isAlign,
      split: true,
    });
    if (isAlign) {
      Transforms.setNodes(editor, { align: isActive ? undefined : format });
    } else {
      Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      });
    }
    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  }

  serialize(value) {
    return value.map((n) => Node.string(n)).join("\n");
  }
  deserialize(string) {
    return string.split("\n").map((line) => {
      return {
        children: [{ text: line }],
      };
    });
  }
}

const CustomEditor = new SlateEditor();
export default CustomEditor;
