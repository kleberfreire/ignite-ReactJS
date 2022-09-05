import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next/router");

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return {
        data: null,
        status: "unauthenticated",
      };
    },
  };
});

describe("Home page", () => {
  it("render correctly", () => {
    render(
      <Home
        product={{
          priceId: "fake-id",
          amount: "R$10,00",
        }}
      />
    );

    expect(screen.getByText("for R$10,00")).toBeInTheDocument();
  });
});