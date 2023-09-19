import React from "react";
import AppLayout from "../components/layout/AppLayout";
import Landing from "../components/Landing";

const LandingPage = () => {
  return (
    <AppLayout showHeader={false}>
      <Landing />
    </AppLayout>
  );
};

export default LandingPage;
