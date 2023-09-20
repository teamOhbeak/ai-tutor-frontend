import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./elements/Button";

const TUTOR_LIST = [
  {
    title: "AI Interview",
    content: "AI 멘토의 면접 질문, 꼬리 질문으로 함께하는 실전 면접 준비",
    btnText: "면접하기",
    url: "/interview-list",
  },
  {
    title: "AI QnA",
    content: "공부하다 막히는 내용, AI 멘토에게 질문하기",
    btnText: "질문하기",
    url: "/qna-list",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (target: string) => navigate(target);

  return (
    <StContainer>
      <StHeader>
        <h1 onClick={() => window.location.reload()}>AI TUTOR</h1>
        <span>by. team500</span>
      </StHeader>
      <StBody>
        <StBtnList>
          {TUTOR_LIST.map((val) => {
            const { title, content, btnText, url } = val;
            return (
              <li key={title}>
                <h3>{title}</h3>
                <StSubText>{content}</StSubText>
                <Button
                  btnStatus="primary02"
                  clickHandler={() => handleNavigate(url)}
                  disabled={false}
                >
                  <span>{btnText}</span>
                </Button>
              </li>
            );
          })}
        </StBtnList>
      </StBody>
    </StContainer>
  );
};

export default Landing;

const StContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StHeader = styled.div`
  width: 100%;
  padding: 16px 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.red03};

  h1 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 28px;
    font-weight: 500;
    cursor: pointer;
  }

  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    font-weight: 500;
    cursor: default;
  }
`;

const StBody = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 60px;
`;

const StBtnList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 60px 48px;
    background-color: ${({ theme }) => theme.colors.beige01};
    border-radius: 16px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);

    h3 {
      color: ${({ theme }) => theme.colors.black01};
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

const StSubText = styled.span`
  color: ${({ theme }) => theme.colors.gray01};
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;
