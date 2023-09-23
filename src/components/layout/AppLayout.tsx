import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { DESKTOP_W, WINDOW_H } from "../../styles/theme";

interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  showHeader: boolean;
  children: React.ReactNode;
}

const NAV_LIST = [
  {
    btnText: "Interview",
    url: "/interview-list",
  },
  {
    btnText: "QnA",
    url: "/qna-list",
  },
];

const AppLayout = ({ showHeader, children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (target: string) => {
    navigate(target);
  };

  return (
    <StLayout>
      <StNav $showHeader={showHeader}>
        <h1 onClick={() => handleNavigate("/")}>AI TUTOR</h1>
        <ul>
          {NAV_LIST.map((val) => {
            const { btnText, url } = val;
            return (
              <StNavItem
                key={btnText}
                $currentPage={location.pathname === url}
                onClick={() => handleNavigate(url)}
              >
                <span>{btnText}</span>
              </StNavItem>
            );
          })}
        </ul>
      </StNav>
      {children}
    </StLayout>
  );
};

export default AppLayout;

const StLayout = styled.div`
  width: 100%;
  max-width: ${DESKTOP_W}px;
  height: ${WINDOW_H}px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StNav = styled.nav<{ $showHeader: boolean }>`
  display: ${({ $showHeader }) => ($showHeader ? "flex" : "none")};
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: ${DESKTOP_W}px;
  height: 60px;
  padding: 0 48px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray03};
  position: fixed;

  h1 {
    color: ${({ theme }) => theme.colors.red02};
    font-size: 28px;
    font-weight: 600;
    cursor: pointer;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 24px;
    height: 100%;
    padding: 0 48px;
  }
`;

const StNavItem = styled.li<{ $currentPage: boolean }>`
  cursor: pointer;

  span {
    color: ${({ theme, $currentPage }) =>
      $currentPage ? theme.colors.red02 : theme.colors.black02};
    font-size: 18px;
    font-weight: 600;
  }
`;
