import React from "react";
import AppLayout from "../components/layout/AppLayout";
import QnAList from "../components/QnAList";

const QnAListPage = () => {
  return (
    <AppLayout showHeader={true}>
      <QnAList />
    </AppLayout>
  );
};

export default QnAListPage;
