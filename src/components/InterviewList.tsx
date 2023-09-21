import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ModalLayout from "./layout/ModalLayout";
import ListHeader from "./ListComponents/ListHeader";
import InterviewSettingModal from "./ListComponents/InterviewSettingModal";
import Button from "./elements/Button";
import { WINDOW_H } from "../styles/theme";

const TEST_QNA = [
  {
    title:
      "title title title title title title title title title titletitle title title title title title title title title titletitle title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title ",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title ",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19 00:00",
  },
];

const InterviewList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleNavigate = (target: string) => navigate(target);

  return (
    <StContainer>
      <ListHeader
        title="Interview List"
        btnText="면접하기"
        clickHandler={() => setOpenModal(true)}
      />
      <StBody>
        <StList>
          {TEST_QNA.map((val, i, arr) => {
            const { title, username, createdAt } = val;
            return (
              <StItem key={i} $isLast={i === arr.length - 1}>
                <StInfo>
                  <StQnATitle>{createdAt}</StQnATitle>
                  <StSubInfo>
                    <StQnAUsername>{username}</StQnAUsername>
                  </StSubInfo>
                </StInfo>
                <StBtnWrapper>
                  <Button
                    btnStatus="beige"
                    clickHandler={() => handleNavigate("/interview-detail/id")}
                    // clickHandler={() => handleNavigate(`/interview-detail/${id}`)}
                    disabled={false}
                  >
                    <span>상세보기</span>
                  </Button>
                </StBtnWrapper>
              </StItem>
            );
          })}
        </StList>
      </StBody>
      {openModal ? (
        <ModalLayout width="480px" height="auto">
          <InterviewSettingModal clickHandler={() => setOpenModal(false)} />
        </ModalLayout>
      ) : (
        <></>
      )}
    </StContainer>
  );
};

export default InterviewList;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${WINDOW_H}px;
  padding: 60px 60px 48px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StBtnWrapper = styled.div`
  width: 100px;
`;

const StBody = styled.div`
  height: 100%;
  overflow: scroll;
`;

const StList = styled.ul``;

const StItem = styled.li<{ $isLast: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ $isLast, theme }) =>
    $isLast ? "none" : `1px solid ${theme.colors.gray03}`};
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: calc(100% - 116px);
`;

const StQnATitle = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.black02};
  font-family: "NanumSquareNeo";
  font-size: 16px;
  font-weight: 500;
`;

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const StQnAUsername = styled.span`
  color: ${({ theme }) => theme.colors.gray01};
  font-size: 14px;
  font-weight: 400;
`;
