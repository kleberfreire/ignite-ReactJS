import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Banner />

      <h1>Home</h1>
    </>
  );
};

export default Home;
