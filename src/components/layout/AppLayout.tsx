import React from "react";
import styled from "styled-components";

interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <StLayout>{children}</StLayout>;
};

export default AppLayout;

const StLayout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.white};
`;
