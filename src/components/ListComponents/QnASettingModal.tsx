import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { InputStatusType } from "../../types/etcTypes";

interface QnASettingModalProps {
  clickHandler: () => void;
}

const QnASettingModal = ({ clickHandler }: QnASettingModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
  const [inputStatus, setInputStatus] = useState<InputStatusType>("default");

  const navigate = useNavigate();
  const handleNavigate = (target: string) => navigate(target);

  useEffect(() => {
    title.trim().length > 0 ? setValid(true) : setValid(false);
  }, [title]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <StContainer>
      <StHeader>
        <h2>QnA 설정</h2>
      </StHeader>
      <StBody>
        <StTitle $inputStatus={inputStatus}>
          <label htmlFor="qna-title">제목</label>
          <input
            id="qna-title"
            type="text"
            value={title}
            onChange={(e) => handleChange(e)}
            onFocus={() => setInputStatus("focus")}
            onBlur={() =>
              valid ? setInputStatus("default") : setInputStatus("invalid")
            }
            autoComplete="off"
          />
        </StTitle>
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
          clickHandler={() => handleNavigate("/qna-detail/new")}
          disabled={!valid}
        >
          <span>질문하기</span>
        </Button>
      </StBtnWrapper>
    </StContainer>
  );
};

export default QnASettingModal;

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

const StTitle = styled.div<{ $inputStatus: InputStatusType }>`
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
    border: 1px solid
      ${({ $inputStatus, theme }) => {
        switch ($inputStatus) {
          case "default":
            return theme.colors.gray02;
          case "focus":
            return theme.colors.blue02;
          case "valid":
            return theme.colors.gray02;
          case "invalid":
            return theme.colors.red02;
        }
      }};
    border-radius: 8px;
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
