import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

interface ListHeaderProps {
  title: string;
  btnText: string;
  clickHandler: () => void;
}

const ListHeader = ({ title, btnText, clickHandler }: ListHeaderProps) => {
  return (
    <StHeader>
      <h2>{title}</h2>
      <StBtnWrapper>
        <Button
          btnStatus="primary02"
          clickHandler={clickHandler}
          disabled={false}
        >
          <span>{btnText}</span>
        </Button>
      </StBtnWrapper>
    </StHeader>
  );
};

export default ListHeader;

const StHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
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
