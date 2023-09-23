// import { CodeBlock } from "react-code-blocks"
// import SyntaxHighlighter from "react-syntax-highlighter"
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";

import a11yDark from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark";

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('java', java);

const codeString = `
import React from "react"

const CodeBlock = () => {
  return (
    <div>
      <h1>CodeBlock</h1>
    </div>
  )
}
`

const CodeBlock = () => {
  return (
    <SyntaxHighlighter language="javascript" style={dark} showLineNumber={true}> 
      {codeString}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
