import React from "react";
import styled from "styled-components";

import Button from "../elements/Button";

interface InterviewDoneModalProps {
  clickHandler: () => void;
}

const InterviewDoneModal = ({ clickHandler }: InterviewDoneModalProps) => {
  return (
    <StContainer>
      <StHeader>
        <h2>면접 종료</h2>
      </StHeader>
      <StBody>
        <StTitle>{`수고하셨습니다.\n\n면접이 종료되었습니다.`}</StTitle>
      </StBody>
      <StBtnWrapper>
        <Button
          btnStatus={"primary01"}
          clickHandler={() => clickHandler()}
          disabled={false}
        >
          <span>나가기</span>
        </Button>
      </StBtnWrapper>
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
