import React, { useEffect, useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Button from "../elements/Button";
import { postInterviews } from "../../api/interviewApi";
import { theme } from "../../styles/theme";

const TECH_STACK_LIST = [
  "Java",
  "JavaScript",
  "Kotlin",
  "React",
  "Next.js",
  "Node.js",
  "Nest.js",
  "Spring",
  "CS",
];
const MAX_QUESTION = 10;
const MAX_TIMER = 3;

type TargetType = "techStack" | "questionCount" | "maxWait" | "default";
type RecordStatusType = "agree" | "disagree" | "default";

interface InterviewSettingModalProps {
  clickHandler: () => void;
}

const InterviewSettingModal = ({
  clickHandler,
}: InterviewSettingModalProps) => {
  const [selectTarget, setSelectTarget] = useState<TargetType>("default");
  const [techStack, setTechStack] = useState<string>(TECH_STACK_LIST[0]);
  const [questionCount, setQuestionCount] = useState<string>("1");
  const [maxWait, setMaxWait] = useState<string>("1");
  const [recordStatus, setRecordStatus] = useState<RecordStatusType>("default");
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    recordStatus === "agree" || recordStatus === "disagree"
      ? setValid(true)
      : setValid(false);
  }, [techStack, questionCount, maxWait, recordStatus]);

  const { mutate: handlePostInterviews } = useMutation(postInterviews, {
    onSuccess: (data) => {
      window.location.href = `/interview/${data.interviewId}`;
    },
  });

  const handleOption = (target: TargetType, val: string) => {
    if (target === "techStack") setTechStack(val);
    if (target === "questionCount") setQuestionCount(val);
    if (target === "maxWait") setMaxWait(val);
    setSelectTarget("default");
  };

  const handleDownloadVideo = (val: RecordStatusType) => {
    setRecordStatus(val);
  };

  const handleSubmit = () => {
    handlePostInterviews({
      stack: techStack,
      questionCount: Number(questionCount),
      maxWait: Number(maxWait),
      record: recordStatus === "agree" ? true : false,
    });
  };

  return (
    <StContainer>
      <StHeader>
        <h2>Interview 설정</h2>
      </StHeader>
      <StBody>
        <StItem>
          <StSettingText>기술 스택</StSettingText>
          <StSelectContainer>
            <StSelect
              selected={selectTarget === "techStack"}
              onClick={() =>
                setSelectTarget((prev) =>
                  prev === "techStack" ? "default" : "techStack"
                )
              }
            >
              <span>{techStack}</span>
              <MdOutlineKeyboardArrowDown fill={theme.colors.black02} />
            </StSelect>
            {selectTarget === "techStack" ? (
              <StOptionContainer>
                {Array.from(
                  { length: TECH_STACK_LIST.length },
                  (_, i) => TECH_STACK_LIST[i]
                ).map((val, idx) => (
                  <StOption
                    $isLast={idx === TECH_STACK_LIST.length - 1}
                    key={val}
                    onClick={() => handleOption("techStack", val.toString())}
                  >
                    <span>{val.toString()}</span>
                  </StOption>
                ))}
              </StOptionContainer>
            ) : (
              <></>
            )}
          </StSelectContainer>
        </StItem>
        <StItem>
          <StSettingText>질문 수 (개)</StSettingText>
          <StSelectContainer>
            <StSelect
              selected={selectTarget === "questionCount"}
              onClick={() =>
                setSelectTarget((prev) =>
                  prev === "questionCount" ? "default" : "questionCount"
                )
              }
            >
              <span>{questionCount}</span>
              <MdOutlineKeyboardArrowDown fill={theme.colors.black02} />
            </StSelect>
            {selectTarget === "questionCount" ? (
              <StOptionContainer>
                {Array.from({ length: MAX_QUESTION }, (_, i) => i + 1).map(
                  (val, idx) => (
                    <StOption
                      $isLast={idx === MAX_QUESTION - 1}
                      key={val}
                      onClick={() =>
                        handleOption("questionCount", val.toString())
                      }
                    >
                      <span>{val.toString()}</span>
                    </StOption>
                  )
                )}
              </StOptionContainer>
            ) : (
              <></>
            )}
          </StSelectContainer>
        </StItem>
        <StItem>
          <StSettingText>답변 대기 시간 (분)</StSettingText>
          <StSelectContainer>
            <StSelect
              selected={selectTarget === "maxWait"}
              onClick={() =>
                setSelectTarget((prev) =>
                  prev === "maxWait" ? "default" : "maxWait"
                )
              }
            >
              <span>{maxWait}</span>
              <MdOutlineKeyboardArrowDown fill={theme.colors.black02} />
            </StSelect>
            {selectTarget === "maxWait" ? (
              <StOptionContainer>
                {Array.from({ length: MAX_TIMER }, (_, i) => i + 1).map(
                  (val, idx) => (
                    <StOption
                      $isLast={idx === MAX_TIMER - 1}
                      key={val}
                      onClick={() => handleOption("maxWait", val.toString())}
                    >
                      <span>{val.toString()}</span>
                    </StOption>
                  )
                )}
              </StOptionContainer>
            ) : (
              <></>
            )}
          </StSelectContainer>
        </StItem>
        <StItem>
          <StSettingText>면접 영상을 로컬에 저장하시겠습니까?</StSettingText>
          <StDownloadBtnWrapper>
            <Button
              btnStatus={recordStatus === "agree" ? "primary01" : "beige"}
              clickHandler={() => handleDownloadVideo("agree")}
              disabled={false}
            >
              <span>네</span>
            </Button>
            <Button
              btnStatus={recordStatus === "disagree" ? "primary01" : "beige"}
              clickHandler={() => handleDownloadVideo("disagree")}
              disabled={false}
            >
              <span>아니오</span>
            </Button>
          </StDownloadBtnWrapper>
        </StItem>
      </StBody>
      <StBtnWrapper>
        <Button
          btnStatus={"cancel"}
          clickHandler={clickHandler}
          disabled={false}
        >
          <span>취소하기</span>
        </Button>
        <Button
          btnStatus={valid ? "primary01" : "disabled"}
          clickHandler={() => handleSubmit()}
          disabled={!valid}
        >
          <span>질문하기</span>
        </Button>
      </StBtnWrapper>
    </StContainer>
  );
};

export default InterviewSettingModal;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  padding: 24px;
`;

const StHeader = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.black02};
    text-align: center;
    font-family: "NanumSquareNeo";
    font-size: 18px;
    font-weight: 500;
  }
`;

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const StItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  label {
    color: ${({ theme }) => theme.colors.black02};
    font-size: 14px;
    font-weight: 500;
  }

  input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid black;
    border-radius: 8px;
  }
`;

const StSettingText = styled.span`
  color: ${({ theme }) => theme.colors.black02};
  font-size: 14px;
  font-weight: 500;
`;

const StSelectContainer = styled.div`
  width: 140px;
  height: 40px;
  position: relative;
`;

const StSelect = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px 8px 8px 12px;
  background-color: ${({ theme }) => theme.colors.gray04};
  border-radius: 8px;

  span {
    color: ${({ theme }) => theme.colors.black02};
    font-size: 14px;
    font-weight: 500;
  }

  svg {
    width: 24px;
    height: 24px;
    transform: ${({ selected }) => (selected ? "rotate(180deg)" : "rotate(0)")};
    transition: all ease 0.4s;
  }
`;

const StOptionContainer = styled.ul`
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.blue03};
  border-radius: 8px;
  position: absolute;
  top: 44px;
  z-index: 11;
  overflow-y: scroll;
`;

const StOption = styled.li<{ $isLast: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 12px;
  background-color: ${({ theme }) => theme.colors.blue03};
  border-bottom: 1px solid
    ${({ $isLast, theme }) =>
      $isLast ? "transparent" : `${theme.colors.gray03}`};

  span {
    color: ${({ theme }) => theme.colors.black02};
    font-size: 14px;
    font-weight: 500;
  }
`;

const StDownloadBtnWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
