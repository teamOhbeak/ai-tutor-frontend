import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import QnAListPage from "../pages/QnAListPage";
import QnADetailPage from "../pages/QnADetailPage";
import InterviewListPage from "../pages/InterviewListPage";
import InterviewDetailPage from "../pages/InterviewDetailPage";
import InterviewPage from "../pages/InterviewPage";

const Router = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/qna-list" element={<QnAListPage />} />
          <Route path="/qna-detail/:id" element={<QnADetailPage />} />
          <Route path="/interview-list" element={<InterviewListPage />} />
          <Route
            path="/interview-detail/:id"
            element={<InterviewDetailPage />}
          />
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      ) : (
        <></>
      )}
    </>
  );
};

export default Router;
