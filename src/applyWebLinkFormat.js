import { isStringWebLink, replaceBetween } from './utils';
import { writeTextHereString, writeUrlTextHere } from './placeholderStrings';

export default ({ getState, item, setText, setSelection }) => {
  const { selection, text } = getState();
  let newText;
  let newSelection;
  const selectedText = text.substring(selection.start, selection.end);
  if (selection.start !== selection.end) {
    if (isStringWebLink(selectedText)) {
      newText = replaceBetween(text, selection, `[${writeTextHereString}](${selectedText})`);
      newSelection = {
        start: selection.start + 1,
        end: selection.start + 1 + writeTextHereString.length,
      };
    } else {
      newText = replaceBetween(text, selection, `[${selectedText}](${writeUrlTextHere})`);
      newSelection = {
        start: selection.end + 3,
        end: selection.end + 3 + writeUrlTextHere.length,
      };
    }
  } else {
    newText = replaceBetween(text, selection, `[${writeTextHereString}](${writeUrlTextHere})`);
    newSelection = {
      start: selection.start + 1,
      end: selection.start + 1 + writeTextHereString.length,
    };
  }
  setText(newText);
  setSelection(newSelection.start, newSelection.end);
};
