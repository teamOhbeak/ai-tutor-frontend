import React from "react";
import styled from "styled-components";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { InterviewAnswerType } from "../../types/interviewTypes";

interface InterviewItemProps {
  isFollowUp: boolean;
  question: string;
  answer: InterviewAnswerType | null;
}

const InterviewItem = ({
  isFollowUp,
  question,
  answer,
}: InterviewItemProps) => {
  return (
    <React.Fragment>
      <StCommentWrapper $isFollowUp={isFollowUp}>
        <StAvatar>
          <BsChatLeftDotsFill />
        </StAvatar>
        <StComment>{question}</StComment>
      </StCommentWrapper>
      {answer ? (
        <StCommentWrapper $isFollowUp={isFollowUp}>
          <StAvatar>
            <FaUserAlt />
          </StAvatar>
          <StComment>
            {answer.answerText ? answer.answerText : "답변 없음"}
          </StComment>
        </StCommentWrapper>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default InterviewItem;

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
