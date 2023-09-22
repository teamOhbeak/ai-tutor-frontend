import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";

import ModalLayout from "./layout/ModalLayout";
import DeleteModal from "./QnADetail/DeleteModal";
import Button from "./elements/Button";
import InterviewItem from "./elements/InterviewItem";
import { getInterview } from "../api/interviewApi";
import { InterviewDetailProps } from "../types/interviewTypes";
import { WINDOW_H, theme } from "../styles/theme";

const InterviewDetail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();

  // test
  useEffect(() => {
    if (params.id) refetch();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    setLoading(false);
  }, []);

  const { data, isLoading, isSuccess, refetch } = useQuery(
    ["interview"],
    () => getInterview(params.id as string),
    {
      onSuccess: (data) => console.log("DATA >> ", data),
      enabled: false,
    }
  );

  const handleNavigate = (target: string) => navigate(target);

  const handleDelete = () => {
    setOpenDeleteModal(false);
    // navigate("/interview-list");
  };

  return (
    <>
      {!isLoading && isSuccess ? (
        <StContainer>
          <StHeader>
            <h2>Interview</h2>
            <StInfo>
              <StTitle>{data.createdAt}</StTitle>
              <StSubInfo>
                <StUsername>{data.userName}</StUsername>
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
                  clickHandler={() => handleNavigate("/interview-list")}
                  disabled={false}
                >
                  <span>나가기</span>
                </Button>
              </StCancelBtn>
            </StHeaderBtnWrapper>
          </StHeader>
          <StBody>
            <StChatContainer ref={scrollRef}>
              {loading ? (
                <></>
              ) : (
                <StChatList>
                  {(data as InterviewDetailProps).questions.map((val) => {
                    const { answer, question, followUpQuestions, id } = val;
                    return (
                      <li key={id}>
                        <InterviewItem
                          isFollowUp={false}
                          question={question}
                          answer={answer}
                        />
                        {followUpQuestions && followUpQuestions.length ? (
                          <ul>
                            {followUpQuestions.map((el) => {
                              const { answer, question, id } = el;
                              return (
                                <li key={id}>
                                  <InterviewItem
                                    isFollowUp={true}
                                    question={question}
                                    answer={answer}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <></>
                        )}
                      </li>
                    );
                  })}
                </StChatList>
              )}
            </StChatContainer>
          </StBody>
          {openDeleteModal ? (
            <ModalLayout width="480px" height="auto">
              <DeleteModal
                clickHandler={handleDelete}
                target="Interview"
                url="/interview-list"
                id={params.id as string}
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

export default InterviewDetail;

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

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: calc(100% - 116px);
`;

const StTitle = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.black02};
  font-family: "NanumSquareNeo";
  font-size: 18px;
  font-weight: 500;
`;

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const StUsername = styled.span`
  color: ${({ theme }) => theme.colors.gray01};
  font-size: 14px;
  font-weight: 400;
`;

const StHeaderBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const StDeleteBtn = styled.div`
  width: 60px;
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

const StChatContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.beige01};
  height: 100%;
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
