import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../elements/Button";
import { cancelInterview } from "../../api/interviewApi";

interface InterviewCancelModalProps {
  clickHandler: () => void;
  interviewId: string;
}

const InterviewCancelModal = ({
  clickHandler,
  interviewId,
}: InterviewCancelModalProps) => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleNavigate = (target: string) => navigate(target);

  const { mutate: handleCancelInterview } = useMutation(cancelInterview, {
    onSuccess: () => {
      setConfirm(true);
    },
  });

  return (
    <StContainer>
      <StHeader>
        <h2>면접 중단</h2>
      </StHeader>
      <StBody>
        <StTitle>
          {confirm
            ? `면접이 중단되었습니다.`
            : `면접 중간에 나갈 경우 내용이 저장되지 않습니다.\n\n나가시겠습니까?`}
        </StTitle>
      </StBody>
      <StBtnWrapper>
        {confirm ? (
          <Button
            btnStatus={"primary02"}
            clickHandler={() => handleNavigate("/interview-list")}
            disabled={false}
          >
            <span>확인</span>
          </Button>
        ) : (
          <>
            <Button
              btnStatus="beige"
              clickHandler={() => {
                handleCancelInterview(interviewId);
              }}
              disabled={false}
            >
              <span>나가기</span>
            </Button>
            <Button
              btnStatus={"primary02"}
              clickHandler={clickHandler}
              disabled={false}
            >
              <span>취소하기</span>
            </Button>
          </>
        )}
      </StBtnWrapper>
    </StContainer>
  );
};

export default InterviewCancelModal;

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
