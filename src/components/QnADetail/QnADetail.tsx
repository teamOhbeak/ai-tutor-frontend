import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { CodeBlock } from "react-code-blocks"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  BsFillTrashFill,
  BsChatLeftDotsFill,
  BsCodeSlash,
} from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"

import ModalLayout from "../layout/ModalLayout"
import DeleteModal from "./DeleteModal"
import Button from "../elements/Button"
import LoadingSpinner from "../elements/LoadingSpinner"
import LoadingEllipsis from "../elements/LoadingEllipsis"
import { getQnA, getQnARoom, postQnA } from "../../api/qnaApi"
import { newQuestionType, qnaRoomType, qnaType } from "../../types/QnATypes"
import { WINDOW_H, theme } from "../../styles/theme"
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"

import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript"
import java from "react-syntax-highlighter/dist/esm/languages/prism/java"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"

import a11yDark from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark"

SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("jsx", jsx)

interface CodeTextProps {
  text: string
  lang: string
}

const CodeText = ({ text, lang }: CodeTextProps) => {
  console.log(text)
  const str = text
  const regex = /```(\w+)\s(.*?)```/s // 정규식 패턴

  const match = str.match(regex) // 문자열에서 패턴과 일치하는 부분을 찾음

  let language: string = ""
  let codeBlock: string = ""

  if (match) {
    language = match[1] // 언어 부분을 가져옴
    codeBlock = match[2] // 코드 블록 부분을 가져옴
    console.log(`언어: ${language}`)
    console.log(`코드 블록: ${codeBlock}`)
  } else {
    console.log("일치하는 부분을 찾을 수 없습니다.")
  }

  return (
    <CodeBlock
      text={codeBlock}
      language={language.toLowerCase()}
      showLineNumbers={true}
    />
  )
}

const QnADetail = () => {
  const [chatLoading, setChatLoading] = useState<boolean>(false)
  const [qnaRoomData, setQnARoomData] = useState<qnaRoomType>({
    id: 0,
    title: "string",
    username: "string",
    createdAt: "string",
    qnas: [],
  })
  const [qnaData, setQnAData] = useState<qnaType[]>([])
  const [question, setQuestion] = useState<newQuestionType>({
    roomId: 0,
    question: "",
  })
  const divRef = useRef(null)

  const [codeQuestion, setCodeQuestion] = useState<string>("")
  const [openCodeBlock, setOpenCodeBlock] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const contentRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const params = useParams()

  const queryClient = new QueryClient()

  // test
  useEffect(() => {
    setQuestion({ ...question, roomId: Number(params.id) })
    if (params.id) refetch()
  }, [])

  useEffect(() => {
    question.question.trim().length > 0 ? setValid(true) : setValid(false)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
    if (contentRef.current) {
      contentRef.current.style.height =
        contentRef.current.scrollHeight > 100
          ? "100px"
          : `${contentRef.current.scrollHeight}px`
    }
  }, [question])

  const { refetch, isLoading, isSuccess } = useQuery(
    ["qnaRoom"],
    () => getQnARoom(params.id as string),
    {
      onSuccess: (data: qnaRoomType) => {
        setQnARoomData(data)

        data.qnas.map((data) => {
          const regex = /```(\w+)\s(.*?)```/s // 정규식 패턴

          const match = data.answer.match(regex) // 문자열에서 패턴과 일치하는 부분을 찾음

          let language: string = ""

          if (match) {
            language = match[1] // 언어 부분을 가져옴
            data.language = language.toLocaleLowerCase()
            data.code = match[2] // 코드 블록 부분을 가져옴
            data.answer = data.answer.replace(regex, "")
          }
        })

        setQnAData(data.qnas)
        console.log("GET SUCCESS")
      },
      enabled: false,
    }
  )

  const { refetch: qnaRefetch } = useQuery(
    ["qna"],
    () => getQnA(params.id as string),
    {
      onSuccess: (data: qnaType[]) => {
        data.map((data) => {
          const regex = /```(\w+)\s(.*?)```/s // 정규식 패턴

          const match = data.answer.match(regex) // 문자열에서 패턴과 일치하는 부분을 찾음

          let language: string = ""

          if (match) {
            language = match[1] // 언어 부분을 가져옴
            data.language = language.toLocaleLowerCase()
            data.code = match[2] // 코드 블록 부분을 가져옴
            data.answer = data.answer.replace(regex, "")
          }
        })
        setQnAData(data)
        setChatLoading(false)
        console.log("GET QNA DATA SUCCESS")
      },
      enabled: false,
    }
  )

  const { mutate: handleNewQuestion } = useMutation(postQnA, {
    onSuccess: (data) => {
      setQuestion({ ...question, question: "" })
      qnaRefetch()
      handleScroll()
      console.log("POST SUCCESS")
    },
  })

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  const handleNavigate = (target: string) => {
    navigate(target)
  }

  const handleQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...question, question: e.target.value })
  }

  // const handleCodeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setCodeQuestion(e.target.value);
  // };

  // const handleCode = () => {
  //   setOpenCodeBlock((prev) => !prev);
  // };

  const handleSubmit = () => {
    setChatLoading(true)
    handleScroll()
    handleNewQuestion(question)
  }

  return (
    <StContainer>
      {!isLoading && isSuccess ? (
        <>
          <StHeader>
            <h2>QnA</h2>
            <StInfo>
              <StTitle>{qnaRoomData.title}</StTitle>
              <StSubInfo>
                <StUsername>{qnaRoomData.username}</StUsername>
                <StDate>{qnaRoomData.createdAt}</StDate>
              </StSubInfo>
            </StInfo>
            <StHeaderBtnWrapper>
              <StDeleteBtn>
                <Button
                  btnStatus="beige"
                  clickHandler={() => setOpenDeleteModal(true)}
                  disabled={false}
                >
                  <BsFillTrashFill fill={theme.colors.gray02} />
                </Button>
              </StDeleteBtn>
              <StCancelBtn>
                <Button
                  btnStatus="cancel"
                  clickHandler={() => handleNavigate("/qna-list")}
                  disabled={false}
                >
                  <span>나가기</span>
                </Button>
              </StCancelBtn>
            </StHeaderBtnWrapper>
          </StHeader>
          <StBody>
            <StChatContainer ref={scrollRef}>
              {qnaData.length === 0 ? (
                <StChatListGuide>
                  <span>💡 AI 멘토에게 궁금한 것을 물어보세요</span>
                </StChatListGuide>
              ) : (
                <StChatList>
                  <>
                    {qnaData.map((val, i) => {
                      const { id, question, answer, sequence, code, language } =
                        val
                      return (
                        <li key={`${i}-${id}`}>
                          <StChatWrapper>
                            <StAvatar>
                              <FaUserAlt />
                            </StAvatar>
                            <StChat>{question}</StChat>
                          </StChatWrapper>
                          <StChatWrapper>
                            <StAvatar>
                              <BsChatLeftDotsFill />
                            </StAvatar>
                            <StChat>
                              {answer}
                              {code && (
                                <SyntaxHighlighter
                                  language={language}
                                  style={dark}
                                  showLineNumbers={true}
                                >
                                  {code}
                                </SyntaxHighlighter>
                              )}
                            </StChat>
                          </StChatWrapper>
                        </li>
                      )
                    })}
                    {chatLoading ? <LoadingEllipsis /> : <></>}
                  </>
                </StChatList>
              )}
            </StChatContainer>
            <StNewChatContainer>
              <StNewChat>
                <label htmlFor="new-chat">Q.</label>
                <StTextContainer>
                  <textarea
                    ref={contentRef}
                    autoComplete="off"
                    value={question.question}
                    onChange={(e) => handleQuestion(e)}
                    rows={1}
                    placeholder="질문을 입력해 주세요."
                  />
                  <div className="markdown-preview">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      children={codeQuestion}
                    />
                  </div>
                  {openCodeBlock ? (
                    <CodeText text={codeQuestion} lang={"javascript"} />
                  ) : (
                    <></>
                  )}
                  <StCodeBtn onClick={() => {}}>
                    {/* <StCodeBtn onClick={() => handleCode()}> */}
                    <BsCodeSlash fill={theme.colors.black02} />
                  </StCodeBtn>
                </StTextContainer>
              </StNewChat>
              <div>
                <Button
                  btnStatus={valid ? "primary02" : "disabled"}
                  clickHandler={() => handleSubmit()}
                  disabled={!valid}
                >
                  <span>질문하기</span>
                </Button>
              </div>
            </StNewChatContainer>
          </StBody>
          {openDeleteModal ? (
            <ModalLayout width="480px" height="auto">
              <DeleteModal
                clickHandler={() => setOpenDeleteModal(false)}
                target="QnA"
                url="/qna-list"
                id={qnaRoomData.id.toString()}
              />
            </ModalLayout>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <LoadingSpinner></LoadingSpinner>
        </>
      )}
    </StContainer>
  )
}

export default QnADetail

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${WINDOW_H}px;
`

const StHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 100px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black02};

  h2 {
    color: ${({ theme }) => theme.colors.red02};
    font-size: 24px;
    font-weight: 500;
  }
`

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: calc(100% - 116px);
`

const StTitle = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.black02};
  font-family: "NanumSquareNeo";
  font-size: 18px;
  font-weight: 500;
`

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`

const StUsername = styled.span`
  color: ${({ theme }) => theme.colors.gray01};
  font-size: 14px;
  font-weight: 400;
`

const StDate = styled.span`
  color: ${({ theme }) => theme.colors.gray02};
  font-size: 14px;
  font-weight: 400;
`

const StHeaderBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

const StDeleteBtn = styled.div`
  width: 60px;
`

const StCancelBtn = styled.div`
  width: 100px;
`

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: ${WINDOW_H - 100}px;
  padding: 24px 48px;
`

const StChatContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.beige01};
  height: 100%;
  padding: 16px;
  overflow: scroll;
  border-radius: 8px;
`

const StChatListGuide = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.black02};
    font-size: 14px;
    font-weight: 500;
  }
`

const StChatList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  li {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

const StChatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`

const StAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue03};
  padding: 16px;
  border-radius: 50%;

  svg {
    width: 16px;
    height: 16px;
  }
`

const StChat = styled.p`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  white-space: pre-wrap;
  word-break: keep-all;
`

const StNewChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.blue03};
  border-radius: 8px;
`

const StNewChat = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.black02};
    font-family: "NanumSquareNeo";
    font-size: 16px;
    font-weight: 500;
  }
`

const StTextContainer = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 12px;

  textarea {
    width: 100%;
    padding-bottom: 8px;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 8px;
    height: auto;
    resize: none;
  }
`

const StCodeBtn = styled.div`
  background-color: ${({ theme }) => theme.colors.gray04};
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.1 ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray03};
  }
`
