import React from "react";
import AppLayout from "../components/layout/AppLayout";
import InterviewDetail from "../components/InterviewDetail";

const InterviewDetailPage = () => {
  return (
    <AppLayout showHeader={false}>
      <InterviewDetail />
    </AppLayout>
  );
};

export default InterviewDetailPage;
