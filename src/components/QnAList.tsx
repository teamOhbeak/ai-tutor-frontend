import React from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useNavigate } from "react-router-dom";
import { WINDOW_H } from "../styles/theme";

const TEST_QNA = [
  {
    title:
      "title title title title title title title title title titletitle title title title title title title title title titletitle title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title ",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title ",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
  {
    title: "title title title title title title title title title title",
    username: "user12345",
    createdAt: "2023-09-19",
  },
];
const QnAList = () => {
  const navigate = useNavigate();
  const handleNavigate = (target: string) => navigate(target);

  return (
    <StContainer>
      <StHeader>
        <h2>QnA List</h2>
        <StBtnWrapper>
          <Button
            btnStatus="primary02"
            clickHandler={() => handleNavigate("/qna-detail/new")}
            disabled={false}
          >
            <span>질문하기</span>
          </Button>
        </StBtnWrapper>
      </StHeader>
      <StBody>
        <StList>
          {TEST_QNA.map((val, i, arr) => {
            const { title, username, createdAt } = val;
            return (
              <StItem isLast={i === arr.length - 1}>
                <StInfo>
                  <StQnATitle>{title}</StQnATitle>
                  <StSubInfo>
                    <StQnAUsername>{username}</StQnAUsername>
                    <StQnADate>{createdAt}</StQnADate>
                  </StSubInfo>
                </StInfo>
                <StBtnWrapper>
                  <Button
                    btnStatus="beige"
                    clickHandler={() => handleNavigate("/qna-detail/new")}
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
    </StContainer>
  );
};

export default QnAList;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${WINDOW_H}px;
  padding: 60px 60px 48px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black02};

  h2 {
    color: ${({ theme }) => theme.colors.black01};
    font-size: 24px;
    font-weight: 500;
    flex-grow: 1;
  }
`;

const StBtnWrapper = styled.div`
  width: 100px;
`;

const StBody = styled.div`
  height: 100%;
  overflow: scroll;
`;

const StList = styled.ul``;

const StItem = styled.li<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ isLast, theme }) =>
    isLast ? "none" : `1px solid ${theme.colors.gray03}`};
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

const StQnADate = styled.span`
  color: ${({ theme }) => theme.colors.gray02};
  font-size: 14px;
  font-weight: 400;
`;
