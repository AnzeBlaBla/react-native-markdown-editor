import { replaceBetween } from './utils';

export default ({ getState, item, setText, setSelection }) => {
  let { text } = getState();
  const { selection } = getState();
  text = text || '';
  let newText;
  let newSelection;
  if (selection.start !== selection.end) {
    newText = replaceBetween(
      text,
      selection,
      `${item.prefix} ${text.substring(selection.start, selection.end)}\n`,
    );
    newSelection = { start: selection.end + item.prefix.length + 2, end: selection.end + item.prefix.length + 2 };
  } else if (
    selection.start === selection.end &&
    text.substring(selection.end - 1, selection.end) === '\n'
  ) {
    newText = replaceBetween(text, selection, `${item.prefix} `);
    newSelection = { start: selection.start + item.prefix.length + 1, end: selection.start + item.prefix.length + 1 };
  } else {
    newText = replaceBetween(text, selection, `\n${item.prefix} `);
    newSelection = { start: selection.start + item.prefix.length + 2, end: selection.start + item.prefix.length + 2 };
  }

  setText(newText);
  setSelection(newSelection.start, newSelection.end);
};
