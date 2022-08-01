import applyWrapFormat from './src/applyWrapFormat';
import applyWrapFormatNewLines from './src/applyWrapFormatNewLines';
import applyListFormat from './src/applyListFormat';
import applyWebLinkFormat from './src/applyWebLinkFormat';
import MarkdownEditor from './src/MarkdownEditor';

const migrateWarning = () => {
  console.warn(`Use the default import of MarkdownEditor ('import MarkdownEditor ...') instead of the old import ('import { MarkdownEditor } ...')!`);
  return null;
}

export {
  applyWrapFormat,
  applyWrapFormatNewLines,
  applyListFormat,
  applyWebLinkFormat,
  migrateWarning as MarkdownEditor,
}


export default MarkdownEditor;