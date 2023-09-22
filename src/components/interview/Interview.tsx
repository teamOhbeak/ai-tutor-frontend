import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import styled from "styled-components";
import { BsChatLeftDotsFill, BsFillMicFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

import ModalLayout from "../layout/ModalLayout";
import InterviewDoneModal from "./InterviewDoneModal";
import Button from "../elements/Button";
import { CommentType } from "../../types/QnATypes";
import { WINDOW_H, theme } from "../../styles/theme";

const TEST_DATA = {
  title: "React suspense 사용 방법",
  username: "username12345",
  createdAt: "2023-09-20",
  timer: "1",
  maxQuestion: "10",
  chat: [
    { owner: "user", comment: "react suspense 사용 방법을 얄려줘" },
    {
      owner: "ai",
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      owner: "user",
      comment:
        "국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을 받아 행정각부를 통할한다. 모든 국민은 종교의 자유를 가진다. 공공필요에 의한 재산권의 수용·사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다. 모든 국민은 헌법과 법률이 정한 법관에 의하여 법률에 의한 재판을 받을 권리를 가진다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 사법권은 법관으로 구성된 법원에 속한다.",
    },
    {
      owner: "ai",
      comment:
        "이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 국가는 평생교육을 진흥하여야 한다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에 참여하는데 필요한 조직을 가져야 한다. \n\n국무총리는 국회의 동의를 얻어 대통령이 임명한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다. 국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 대법원장의 임기는 6년으로 하며, 중임할 수 없다. 국무위원은 국무총리의 제청으로 대통령이 임명한다. 국가는 지역간의 균형있는 발전을 위하여 지역경제를 육성할 의무를 진다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국가는 여자의 복지와 권익의 향상을 위하여 노력하여야 한다. 법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이 정하는 바에 의하여 퇴직하게 할 수 있다.",
    },
    {
      owner: "user",
      comment:
        "국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.",
    },
    {
      owner: "ai",
      comment: `국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 제1항의 지시를 받은 당해 행정기관은 이에 응하여야 한다. 모든 국민은 신체의 자유를 가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는 심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는 처벌·보안처분 또는 강제노역을 받지 아니한다.

      국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다. 나는 헌법을 준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다.
      
      한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.`,
    },
  ],
};

type InterviewStatusType = "pending" | "progress" | "done" | "cancel";
type TimerStatusType = "default" | "progress" | "timeout";

const Interview = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [interviewStatus, setInterviewStatus] =
    useState<InterviewStatusType>("pending");
  const [interview, setInterview] = useState<CommentType>({
    owner: "user",
    comment: "",
  });
  const [interviewList, setInterviewList] = useState<CommentType[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceInterview, setVoiceInterview] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60 * Number(TEST_DATA.timer));
  const [timerStatus, setTimerStatus] = useState<TimerStatusType>("default");
  const [count, setCount] = useState<number>(1);
  const [valid, setValid] = useState<boolean>(false);
  const [openDoneModal, setOpenDoneModal] = useState<boolean>(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  // test
  useEffect(() => {
    setInterviewList(TEST_DATA.chat);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    interview.comment.trim().length > 0 ? setValid(true) : setValid(false);
  }, [interview.comment]);

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
      setInterview((prev) => ({ ...prev, comment: transcript }));
      // resetTranscript(); // 음성인식 결과 처리 후 리셋
    }
  }, [transcript]);

  useEffect(() => {
    if (interviewStatus === "progress") {
      if (timer !== 0) {
        const time = setInterval(() => {
          if (timer > 0) {
            setTimer((prev) => prev - 1);
          }
        }, 1000);

        return () => clearInterval(time);
      } else {
        if (voiceInterview) {
          setVoiceInterview(false);
        }
        setTimerStatus("timeout");
      }
    }
  }, [timer, interviewStatus]);

  useEffect(() => {
    setTimerStatus("progress");
    setTimer(60 * Number(TEST_DATA.timer));
    resetTranscript(); // 음성인식 결과 처리 후 리셋
    setInterview({ ...interview, comment: "" });
    if (count === Number(TEST_DATA.maxQuestion)) {
      setInterviewStatus("done");
      setOpenDoneModal(true);
    }
  }, [count]);

  const handleNavigate = (target: string) => {
    navigate(target);
  };

  const handleStart = () => {
    setInterviewStatus("progress");
  };

  const handleInterview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInterview({ ...interview, comment: e.target.value });
  };

  const handleVoice = () => {
    if (timerStatus !== "timeout") setVoiceInterview(!voiceInterview);
  };

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };

  const handleSaveVideo = () => {
    const url = mediaBlobUrl;
    console.log(url);
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
    }
  };

  const videoConstraints = {
    width: 600,
    height: 400,
    facingMode: "user",
  };

  const handleSubmit = () => {
    setCount((prev) => prev + 1);
  };

  const handlePass = () => {
    setCount((prev) => prev + 1);
  };

  const handleDoneModal = () => {
    navigate("/interview-list");
  };

  return (
    <StContainer>
      <StHeader>
        <h2>AI Interview</h2>
        <StHeaderBtnWrapper>
          <StCancelBtn>
            <Button
              btnStatus="cancel"
              clickHandler={() => handleNavigate("/interview-list")}
              disabled={false}
            >
              <span>나가기</span>
            </Button>
          </StCancelBtn>
          <StCancelBtn>
            <Button
              btnStatus="cancel"
              clickHandler={() =>
                isRecording ? handleStopRecording() : handleStartRecording()
              }
              disabled={false}
            >
              <span>녹화</span>
            </Button>
          </StCancelBtn>
          <StCancelBtn>
            <Button
              btnStatus="cancel"
              clickHandler={() => handleSaveVideo()}
              disabled={false}
            >
              <span>녹화 저장</span>
            </Button>
          </StCancelBtn>
        </StHeaderBtnWrapper>
      </StHeader>
      <StBody>
        <StViewContainer>
          <StScreenContainer ref={scrollRef}>
            {isRecording ? (
              <Webcam
                audio={false}
                mirrored={true}
                // height={400}
                // width={600}
                videoConstraints={videoConstraints}
              />
            ) : (
              <StEmptyScreen />
            )}
          </StScreenContainer>
          <StPrompt>
            {loading ? (
              <></>
            ) : (
              <StChatList>
                {interviewList.map((val, i) => {
                  const { owner, comment } = val;
                  return (
                    <li key={`${i}-${comment}`}>
                      <StAvatar>
                        {owner === "user" ? (
                          <FaUserAlt />
                        ) : (
                          <BsChatLeftDotsFill />
                        )}
                      </StAvatar>
                      <StComment>{comment}</StComment>
                    </li>
                  );
                })}
              </StChatList>
            )}
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
                  value={interview.comment}
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
                    btnStatus="cancel"
                    clickHandler={() => handlePass()}
                    disabled={false}
                  >
                    <span>넘어가기</span>
                  </Button>
                </StBtnContainer>
                <StInterviewCount>
                  <StCurrentCount>{count}</StCurrentCount>
                  <StTotalCount> / {TEST_DATA.maxQuestion}</StTotalCount>
                </StInterviewCount>
              </StProgress>
            </StInterview>
          )}
        </StInterviewContainer>
      </StBody>
      {openDoneModal ? (
        <ModalLayout width="480px" height="auto">
          <InterviewDoneModal clickHandler={() => handleDoneModal()} />
        </ModalLayout>
      ) : (
        <></>
      )}
    </StContainer>
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

  video {
    width: 100%;
    height: 100%;
  }
`;

const StEmptyScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black01};
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
    align-items: center;

    justify-content: flex-start;
    gap: 8px;
  }
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
