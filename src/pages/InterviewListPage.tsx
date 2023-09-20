import React from "react";
import AppLayout from "../components/layout/AppLayout";
import InterviewList from "../components/InterviewList";

const InterviewListPage = () => {
  return (
    <AppLayout showHeader={true}>
      <InterviewList />
    </AppLayout>
  );
};

export default InterviewListPage;
