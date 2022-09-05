import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";

import { signIn, useSession } from "next-auth/react";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");

jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirect user to sign in when not authenticated", () => {
    const signInMocked = jest.mocked(signIn);

    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    const subscriptionButton = screen.getByText("Subscribe now");

    fireEvent.click(subscriptionButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirect to posts when users already has a subscription", () => {
    const userRouteMocked = jest.mocked(useRouter);
    const useSessionMocked = jest.mocked(useSession);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Jonh Doe",
          email: "jonh.doe@gmail.com",
          image: "",
        },
        activeSubscription: "fake-act",
        expires: "",
      },
      status: "authenticated",
    });

    userRouteMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscriptionButton = screen.getByText("Subscribe now");

    fireEvent.click(subscriptionButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
