import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

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

jest.mock('../../services/stripe')

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

  it('not inicial data',async () => {
    const retriveStripePricesMocked = jest.mocked(stripe.prices.retrieve)
    retriveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price', amount: '$10.00'
          }
        }
      })
    )
  })
});
