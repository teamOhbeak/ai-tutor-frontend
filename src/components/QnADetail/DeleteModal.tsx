import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../elements/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInterview } from "../../api/interviewApi";
import { deleteQnARoom } from "../../api/qnaApi";

interface QnADeleteModalProps {
  clickHandler: () => void;
  target: "QnA" | "Interview";
  url: string;
  id: string;
}

const DeleteModal = ({
  clickHandler,
  target,
  url,
  id,
}: QnADeleteModalProps) => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleNavigate = (target: string) => navigate(target);

  const queryClient = useQueryClient();

  const { mutate: handleDeleteQnA } = useMutation(deleteQnARoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(["qnaRooms"]);
      setConfirm(true);
    },
  });

  const { mutate: handleDeleteInterview } = useMutation(deleteInterview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["interviews"]);
      setConfirm(true);
    },
  });

  return (
    <StContainer>
      <StHeader>
        <h2>{target} 삭제하기</h2>
      </StHeader>
      <StBody>
        {confirm ? (
          <StTitle>삭제되었습니다.</StTitle>
        ) : (
          <StTitle>삭제하시겠습니까?</StTitle>
        )}
      </StBody>
      <StBtnWrapper>
        {confirm ? (
          <Button
            btnStatus={"primary02"}
            clickHandler={() => handleNavigate(url)}
            disabled={false}
          >
            <span>확인</span>
          </Button>
        ) : (
          <>
            <Button
              btnStatus="beige"
              clickHandler={() =>
                target === "QnA"
                  ? handleDeleteQnA(id)
                  : handleDeleteInterview(id)
              }
              disabled={false}
            >
              <span>삭제하기</span>
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

export default DeleteModal;

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

const StTitle = styled.div`
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
