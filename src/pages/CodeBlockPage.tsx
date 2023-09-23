import React from "react"
import AppLayout from "../components/layout/AppLayout"
import InterviewDetail from "../components/InterviewDetail"
import CodeBlock from "../components/CodeBlock"

const CodeBlockPage = () => {
  return (
    <AppLayout showHeader={false}>
      <CodeBlock />
    </AppLayout>
  )
}

export default CodeBlockPage
