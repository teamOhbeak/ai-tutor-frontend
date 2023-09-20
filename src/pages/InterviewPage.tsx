import React from "react";
import AppLayout from "../components/layout/AppLayout";
import Interview from "../components/interview/Interview";

const InterviewPage = () => {
  return (
    <AppLayout showHeader={false}>
      <Interview />
    </AppLayout>
  );
};

export default InterviewPage;
