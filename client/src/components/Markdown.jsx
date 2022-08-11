import DOMPurify from 'dompurify';
import { marked } from 'marked';

export default function Markdown({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(content)) }} />;
}
