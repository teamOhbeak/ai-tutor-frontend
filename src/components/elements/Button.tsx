import React from "react";
import styled from "styled-components";

import { BtnStatusType } from "../../types/etcTypes";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  btnStatus: BtnStatusType;
  clickHandler: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const Button = ({
  btnStatus,
  clickHandler,
  disabled,
  children,
}: ButtonProps) => {
  const handleEnter = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") clickHandler();
  };

  return (
    <StButton
      $btnStatus={btnStatus}
      onClick={() => clickHandler()}
      onKeyDown={(e) => handleEnter(e)}
      disabled={disabled}
    >
      <StContent $btnStatus={btnStatus}>{children}</StContent>
    </StButton>
  );
};

export default Button;

const StButton = styled.button<{ $btnStatus: BtnStatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  gap: 10px;
  background-color: ${({ theme, $btnStatus }) => {
    switch ($btnStatus) {
      case "primary01":
        return theme.colors.red02;
      case "primary02":
        return theme.colors.red03;
      case "beige":
        return theme.colors.beige01;
      case "cancel":
        return theme.colors.gray02;
      case "disabled":
        return theme.colors.gray04;
      case "transparent":
        return "transparent";
    }
  }};
  border: none;
  border-radius: 12px;
  cursor: ${({ $btnStatus }) =>
    $btnStatus === "disabled" ? "not-allowed" : "pointer"};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $btnStatus }) => {
      switch ($btnStatus) {
        case "primary01":
          return theme.colors.red01;
        case "primary02":
          return theme.colors.red02;
        case "beige":
          return theme.colors.beige02;
        case "cancel":
          return theme.colors.gray01;
        case "disabled":
          return theme.colors.gray04;
        case "transparent":
          return "transparent";
      }
    }};
  }
`;

const StContent = styled.div<{
  $btnStatus: BtnStatusType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  span {
    color: ${({ theme, $btnStatus }) => {
      switch ($btnStatus) {
        case "primary01":
          return theme.colors.white;
        case "primary02":
          return theme.colors.white;
        case "beige":
          return theme.colors.black02;
        case "cancel":
          return theme.colors.white;
        case "disabled":
          return theme.colors.gray02;
        case "transparent":
          return theme.colors.black01;
      }
    }};
    text-align: center;
    font-family: "NanumSquareNeo";
    font-size: 14px;
    font-weight: 500;
  }
`;
