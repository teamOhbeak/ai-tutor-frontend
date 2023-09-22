import React from "react";
import AppLayout from "../components/layout/AppLayout";
import QnADetail from "../components/QnADetail/QnADetail";

const QnADetailPage = () => {
  return (
    <AppLayout showHeader={false}>
      <QnADetail />
    </AppLayout>
  );
};

export default QnADetailPage;
