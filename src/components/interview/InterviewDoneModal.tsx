import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../elements/Button";

interface InterviewDoneModalProps {
  showScreen: boolean;
  clickHandler: () => void;
  handleSaveVideo: () => void;
}

type InterviewDoneStepType = "saveVideo" | "confirm" | "default";

const InterviewDoneModal = ({
  showScreen,
  clickHandler,
  handleSaveVideo,
}: InterviewDoneModalProps) => {
  const [step, setStep] = useState<InterviewDoneStepType>("default");

  useEffect(() => {
    showScreen ? setStep("saveVideo") : setStep("confirm");
  }, []);

  const handleSave = () => {
    handleSaveVideo();
    setStep("confirm");
  };

  return (
    <StContainer>
      <StHeader>
        <h2>면접 종료</h2>
      </StHeader>
      {step !== "default" ? (
        <>
          <StBody>
            <StTitle>
              {step === "confirm"
                ? `수고하셨습니다.\n\n면접이 종료되었습니다.`
                : `면접 영상을 저장하시겠습니까?`}
            </StTitle>
          </StBody>
          {step === "confirm" ? (
            <StBtnWrapper>
              <Button
                btnStatus={"primary01"}
                clickHandler={() => clickHandler()}
                disabled={false}
              >
                <span>나가기</span>
              </Button>
            </StBtnWrapper>
          ) : (
            <StBtnWrapper>
              <Button
                btnStatus={"beige"}
                clickHandler={() => clickHandler()}
                disabled={false}
              >
                <span>저장하지 않음</span>
              </Button>
              <Button
                btnStatus={"primary01"}
                clickHandler={() => handleSave()}
                disabled={step === "saveVideo" ? false : true}
              >
                <span>저장</span>
              </Button>
            </StBtnWrapper>
          )}
        </>
      ) : (
        <></>
      )}
    </StContainer>
  );
};

export default InterviewDoneModal;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;
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
  padding: 16px;
`;

const StTitle = styled.p`
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.black02};
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const StBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
