import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    lang: string;
    children: string;
    props: any;
}

export default function CodeBlock({ lang, children, props }: CodeBlockProps) {
    return (
        <div className="my-4">
            <div className="text-gray-600 bg-gray-200 rounded-tl-lg rounded-tr-lg p-2 border border-gray-300">
                {lang}
            </div>

            <SyntaxHighlighter
                language={lang}
                style={oneDark}
                PreTag="div"
                customStyle={{
                    borderRadius: "0 0 0.5em 0.5em",
                    margin: 0,
                }}
                {...props}
            >
                {children.replace(/\n$/, "")}
            </SyntaxHighlighter>
        </div>
    );
}
