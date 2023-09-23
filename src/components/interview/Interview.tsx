import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import styled from "styled-components";
import {
  BsChatLeftDotsFill,
  BsFillMicFill,
  BsFillRecord2Fill,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

import ModalLayout from "../layout/ModalLayout";
import InterviewCancelModal from "./InterviewCancelModal";
import InterviewDoneModal from "./InterviewDoneModal";
import InterviewItem from "../elements/InterviewItem";
import Button from "../elements/Button";
import {
  getInterview,
  patchInterviewQuestions,
  postInterviewQuestions,
} from "../../api/interviewApi";
import {
  InterviewQType,
  InterviewQuestionType,
  InterviewRoomType,
} from "../../types/interviewTypes";
import { WINDOW_H, theme } from "../../styles/theme";

type InterviewStatusType = "pending" | "inProgress" | "done" | "cancel";
type TimerStatusType = "default" | "inProgress" | "timeout";
type RecordingStatusType =
  | "pending"
  | "inProgress"
  | "stop"
  | "saving"
  | "done"
  | "none";
type QuestionStatusType = "main" | "followUp1" | "followUp2" | "done";

const Interview = () => {
  const [param, setParam] = useState<string>("");
  const [interviewRoomData, setInterviewRoomData] = useState<InterviewRoomType>(
    {
      createdAt: "",
      id: 0,
      maxWait: 0,
      questionCount: 0,
      questions: [],
      record: false,
      stack: "",
      status: 0,
      userId: 0,
      userName: "",
    }
  );
  const [questions, setQuestions] = useState<InterviewQType[]>([]);
  const [interviewStatus, setInterviewStatus] =
    useState<InterviewStatusType>("pending");
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatusType>("pending");
  const [showScreen, setShowScreen] = useState(false);
  const [voiceInterview, setVoiceInterview] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatusType>("default");
  const [count, setCount] = useState<number>(0);
  const [valid, setValid] = useState<boolean>(false);
  const [openDoneModal, setOpenDoneModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [questionStatus, setQuestionStatus] =
    useState<QuestionStatusType>("main");

  const { transcript, resetTranscript } = useSpeechRecognition();

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const params = useParams();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (params.id) {
      refetch();
      setParam(params.id);
    }
  }, []);

  useEffect(() => {
    answer.trim().length > 0 ? setValid(true) : setValid(false);
  }, [answer]);

  useEffect(() => {
    if (voiceInterview) {
      // 음성 인식 시작
      console.log("음성 인식 시작");
      SpeechRecognition.startListening({
        continuous: true,
        language: "ko",
      });
    } else {
      // 음성 인식 중지
      console.log("음성 인식 중지");
      SpeechRecognition.stopListening();
    }
    return () => {
      // 컴포넌트가 언마운트되면 음성 인식 중지
      console.log("UNMOUNT");
      // SpeechRecognition.abortListening();
    };
  }, [voiceInterview]);

  // 음성 인식 결과 처리
  useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
      // setInterview((prev) => ({ ...prev, comment: transcript }));
      // resetTranscript(); // 음성인식 결과 처리 후 리셋
    }
  }, [transcript]);

  useEffect(() => {
    if (interviewStatus === "inProgress") {
      if (timer !== 0) {
        const time = setInterval(() => {
          if (timer > 0) {
            setTimer((prev) => prev - 1);
          }
        }, 1000);

        return () => clearInterval(time);
      } else {
        // TIMEOUT
        if (voiceInterview) {
          setVoiceInterview(false);
        }
        setTimerStatus("timeout");
        valid ? handleSubmit() : handlePass();
      }
    }
  }, [timer, interviewStatus]);

  useEffect(() => {
    console.log("CHANGE COUNT");
    setTimer(Number(interviewRoomData.maxWait) * 60);
    setTimerStatus("inProgress");
    resetTranscript(); // 음성인식 결과 처리 후 리셋
    // setInterview({ ...interview, comment: "" });
    setAnswer("");
    if (count !== 0) {
      if (count > Number(interviewRoomData.questionCount)) {
        setInterviewStatus("done");
        setOpenDoneModal(true);
        setQuestionStatus("done");
        if (showScreen) {
          console.log("===== STOP RECORDING ===== ");
          handleStopRecording();
          // handleSaveVideo();
        }
      } else {
        // setInterviewList([
        //   ...interviewList,
        //   { owner: "ai", comment: questions[count - 1].questionText },
        // ]);
      }
    }
  }, [count]);

  const { data, isLoading, isSuccess, refetch } = useQuery(
    ["interview"],
    () => getInterview(params.id as string),
    {
      onSuccess: (data: InterviewRoomType) => {
        setInterviewRoomData(data);
        data.record ? setShowScreen(true) : setShowScreen(false);
        setQuestions(data.questions);
        setTimer(data.maxWait * 60);
        console.log("DATA >> ", data);
      },
      enabled: false,
    }
  );

  const { mutate: handleAnswer } = useMutation(postInterviewQuestions, {
    onSuccess: (data) => {
      console.log("POST INTERVIEW QUESTIONS >> ", data);
      if (questionStatus === "main") setQuestionStatus("followUp1");
      if (questionStatus === "followUp1") setQuestionStatus("followUp2");
      if (questionStatus === "followUp2") setQuestionStatus("main");
      refetch();
    },
  });

  const { mutate: handlePassAnswer } = useMutation(patchInterviewQuestions, {
    onSuccess: (data) => {
      console.log("PATCH INTERVIEW QUESTIONS >> ", data);
      if (questionStatus === "followUp1") setQuestionStatus("followUp2");
      if (questionStatus === "followUp2") setQuestionStatus("main");
      refetch();
    },
  });

  const handleNavigate = (target: string) => {
    navigate(target);
  };

  const handleStart = () => {
    setInterviewStatus("inProgress");
    if (showScreen) handleStartRecording(); // 비디오 저장 동의 시 녹화 시작
    setCount(1);
  };

  const handleInterview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // setInterview({ ...interview, comment: e.target.value });
    setAnswer(e.target.value);
  };

  const handleVoice = () => {
    if (timerStatus !== "timeout") setVoiceInterview(!voiceInterview);
  };

  const handleStartRecording = () => {
    startRecording();
    setRecordingStatus("inProgress");
  };

  const handleStopRecording = () => {
    stopRecording();
    setRecordingStatus("stop");
  };

  const handleSaveVideo = () => {
    const url = mediaBlobUrl;
    if (url) {
      const newDate = new Date();
      const yy = newDate.getFullYear();
      const mm = (newDate.getMonth() + 1).toString().padStart(2, "0");
      const dd = newDate.getDate().toString().padStart(2, "0");
      const current = `${yy}${mm}${dd}`;
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai_interview_${current}`; // 파일 이름 설정
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setRecordingStatus("done");
    }
  };

  const videoConstraints = {
    width: 600,
    height: 400,
    facingMode: "user",
  };

  const handleSubmit = () => {
    handleAnswer({
      interviewId: interviewRoomData.id,
      questionId: questions[count - 1].questionId,
      answerText: answer,
    });

    if (questionStatus === "followUp2") {
      setCount((prev) => prev + 1);
    }
  };

  const handlePass = () => {
    handlePassAnswer({
      interviewId: interviewRoomData.id,
      questionId: questions[count - 1].questionId,
    });

    if (questionStatus === "main" || questionStatus === "followUp2") {
      setCount((prev) => prev + 1);
    }
  };

  const handleDoneModal = () => {
    navigate("/interview-list");
  };

  console.log("questionStatus >> ", questionStatus);

  return (
    <>
      {!isLoading && isSuccess ? (
        <StContainer>
          <StHeader>
            <h2>AI Interview</h2>
            <StHeaderBtnWrapper>
              <StCancelBtn>
                <Button
                  btnStatus="cancel"
                  clickHandler={() => setOpenCancelModal(true)}
                  // clickHandler={() => handleNavigate("/interview-list")}
                  disabled={false}
                >
                  <span>나가기</span>
                </Button>
              </StCancelBtn>
            </StHeaderBtnWrapper>
          </StHeader>
          <StBody>
            <StViewContainer>
              <StScreenContainer ref={scrollRef}>
                {showScreen ? (
                  <Webcam
                    audio={false}
                    mirrored={true}
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <StEmptyScreen />
                )}
                {showScreen && recordingStatus === "inProgress" ? (
                  <StRecord>
                    <span>녹화 중</span>
                    <BsFillRecord2Fill fill={theme.colors.red02} />
                  </StRecord>
                ) : (
                  <></>
                )}
              </StScreenContainer>
              <StPrompt>
                <StChatList>
                  {questions.map((val, i) => {
                    const {
                      answerText,
                      finishedAt,
                      followUpQuestions,
                      mainQuestionId,
                      questionId,
                      questionText,
                      startedAt,
                      status,
                    } = val;
                    return (
                      <React.Fragment key={questionId}>
                        {i < count ? (
                          <li key={questionId}>
                            <StCommentWrapper $isFollowUp={false}>
                              <StAvatar>
                                <BsChatLeftDotsFill />
                              </StAvatar>
                              <StComment>{questionText}</StComment>
                            </StCommentWrapper>
                            {answerText.length ? (
                              <StCommentWrapper $isFollowUp={false}>
                                <StAvatar>
                                  <FaUserAlt />
                                </StAvatar>
                                <StComment>{answerText}</StComment>
                              </StCommentWrapper>
                            ) : (
                              <></>
                            )}
                            {i < count - 1 ||
                            questionStatus === "followUp1" ||
                            questionStatus === "followUp2" ? (
                              <ul>
                                {followUpQuestions.map((val, i) => {
                                  const {
                                    answerText,
                                    finishedAt,
                                    mainQuestionId,
                                    questionId,
                                    questionText,
                                    startedAt,
                                    status,
                                  } = val;
                                  return (
                                    <React.Fragment key={`${questionId}-${i}`}>
                                      {questionText === "" ? (
                                        <></>
                                      ) : (
                                        <li>
                                          <StCommentWrapper $isFollowUp={true}>
                                            <StAvatar>
                                              <BsChatLeftDotsFill />
                                            </StAvatar>
                                            <StComment>
                                              {questionText}
                                            </StComment>
                                          </StCommentWrapper>
                                          {answerText.length ? (
                                            <StCommentWrapper
                                              $isFollowUp={true}
                                            >
                                              <StAvatar>
                                                <FaUserAlt />
                                              </StAvatar>
                                              <StComment>
                                                {answerText}
                                              </StComment>
                                            </StCommentWrapper>
                                          ) : (
                                            <></>
                                          )}
                                        </li>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </ul>
                            ) : (
                              <></>
                            )}
                          </li>
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {/* {interviewList.map((val, i) => {
                    const { owner, comment } = val;
                    return (
                      <li key={`${i}-${comment}`}>
                        <StCommentWrapper $isFollowUp={false}>
                          <StAvatar>
                            {owner === "user" ? (
                              <FaUserAlt />
                            ) : (
                              <BsChatLeftDotsFill />
                            )}
                          </StAvatar>
                          <StComment>{comment}</StComment>
                        </StCommentWrapper>
                      </li>
                    );
                  })} */}
                </StChatList>
              </StPrompt>
            </StViewContainer>
            <StInterviewContainer>
              {interviewStatus === "pending" ? (
                <StInterviewPending>
                  <StPendingText>
                    아래 버튼을 눌러 면접을 시작해 주세요
                  </StPendingText>
                  <StPendingBtn>
                    <Button
                      btnStatus="primary02"
                      clickHandler={() => handleStart()}
                      disabled={false}
                    >
                      <span>면접 시작</span>
                    </Button>
                  </StPendingBtn>
                </StInterviewPending>
              ) : (
                <StInterview>
                  <StTextContainer>
                    <textarea
                      ref={contentRef}
                      autoComplete="off"
                      value={answer}
                      onChange={(e) => handleInterview(e)}
                      rows={8}
                      placeholder="답변을 입력해 주세요."
                      disabled={voiceInterview || timerStatus === "timeout"}
                    />
                    <StInterviewOptions>
                      <StTimer $timerStatus={timerStatus}>
                        {Math.floor(timer / 60)
                          .toString()
                          .padStart(2, "0")}{" "}
                        : {(timer % 60).toString().padStart(2, "0")}
                      </StTimer>
                      <StVoice
                        $voiceInterview={voiceInterview}
                        onClick={() => handleVoice()}
                      >
                        <BsFillMicFill
                          fill={
                            voiceInterview
                              ? theme.colors.red02
                              : theme.colors.gray01
                          }
                        />
                        <span>음성인식</span>
                      </StVoice>
                    </StInterviewOptions>
                  </StTextContainer>
                  <StProgress>
                    <StBtnContainer>
                      <Button
                        btnStatus={valid ? "primary02" : "disabled"}
                        clickHandler={() => handleSubmit()}
                        disabled={!valid}
                      >
                        <span>답변 완료</span>
                      </Button>
                      <Button
                        btnStatus={
                          count > interviewRoomData.questionCount
                            ? "disabled"
                            : "cancel"
                        }
                        clickHandler={() => handlePass()}
                        disabled={count > interviewRoomData.questionCount}
                      >
                        <span>넘어가기</span>
                      </Button>
                    </StBtnContainer>
                    <StInterviewCount>
                      <StCurrentCount>{count}</StCurrentCount>
                      <StTotalCount>
                        {" "}
                        / {interviewRoomData.questionCount}
                      </StTotalCount>
                    </StInterviewCount>
                  </StProgress>
                </StInterview>
              )}
            </StInterviewContainer>
          </StBody>
          {openDoneModal ? (
            <ModalLayout width="480px" height="auto">
              <InterviewDoneModal
                showScreen={showScreen}
                clickHandler={() => handleDoneModal()}
                handleSaveVideo={handleSaveVideo}
              />
            </ModalLayout>
          ) : (
            <></>
          )}
          {openCancelModal ? (
            <ModalLayout width="480px" height="auto">
              <InterviewCancelModal
                clickHandler={() => setOpenCancelModal(false)}
                interviewId={interviewRoomData.id.toString()}
              />
            </ModalLayout>
          ) : (
            <></>
          )}
        </StContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Interview;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${WINDOW_H}px;
`;

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
`;

const StHeaderBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StCancelBtn = styled.div`
  width: 100px;
`;

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: ${WINDOW_H - 100}px;
  padding: 24px 48px;
`;

const StViewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const StScreenContainer = styled.div`
  width: 600px;
  height: 400px;
  position: relative;
`;

const StEmptyScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black01};
`;

const StRecord = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 8px;
  left: 10px;

  span {
    color: ${({ theme }) => theme.colors.red03};
    /* color: ${({ theme }) => theme.colors.black02}; */
    font-size: 12px;
    font-weight: 400;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StPrompt = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.beige01};
  width: calc(100% - 616px);
  height: 400px;
  padding: 16px;
  overflow: scroll;
  border-radius: 8px;
`;

const StChatList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  li {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const StCommentWrapper = styled.div<{ $isFollowUp: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-left: ${({ $isFollowUp }) => ($isFollowUp ? "16px" : "0px")};
`;

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
`;

const StComment = styled.p`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const StInterviewContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.blue03};
  border-radius: 8px;
`;

const StInterviewPending = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

const StPendingText = styled.span`
  color: ${({ theme }) => theme.colors.black02};
  font-size: 16px;
  font-weight: 500;
`;

const StPendingBtn = styled.div`
  width: 40%;
`;

const StInterview = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  label {
    color: ${({ theme }) => theme.colors.black02};
    font-family: "NanumSquareNeo";
    font-size: 16px;
    font-weight: 500;
  }
`;

const StTextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 100%;

  textarea {
    flex-grow: 1;
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 8px;
    height: auto;
    resize: none;
  }
`;

const StInterviewOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100px;
  height: 100%;
`;

const StTimer = styled.span<{ $timerStatus: TimerStatusType }>`
  color: ${({ $timerStatus, theme }) =>
    $timerStatus === "timeout" ? theme.colors.red02 : theme.colors.black02};
  font-size: 16px;
  font-weight: 500;
`;

const StVoice = styled.div<{ $voiceInterview: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    color: ${({ $voiceInterview, theme }) =>
      $voiceInterview ? theme.colors.red02 : theme.colors.gray01};
    font-size: 14px;
    font-weight: 500;
  }
`;

const StProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StInterviewCount = styled.div`
  span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const StCurrentCount = styled.span`
  color: ${({ theme }) => theme.colors.blue02};
`;

const StTotalCount = styled.span`
  color: ${({ theme }) => theme.colors.black02};
`;
