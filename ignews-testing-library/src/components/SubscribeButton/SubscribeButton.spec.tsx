import { render, screen, fireEvent } from "@testing-library/react"
import { push } from 'next/router'

import { signIn } from "next-auth/react"
import { SubscribeButton } from "."

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {
        data: null,
        status: "unauthenticated"
      }
    },
    signIn: jest.fn()
  }
})

jest.mock('next/router'
, () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  })

  it("redirect user to sign in when not authenticated", () => {
    const signInMocked = jest.mocked(signIn);

    render(<SubscribeButton />)
    
    const subscriptionButton = screen.getByText('Subscribe now')

    fireEvent.click(subscriptionButton)

    expect(signInMocked).toHaveBeenCalled()

  })

  it("redirect tp posts when users already has a subscription", () => {
    const pushInMocked = jest.mocked(push);

    render(<SubscribeButton />)
    
    const subscriptionButton = screen.getByText('Subscribe now')

    fireEvent.click(subscriptionButton)

    expect(pushInMocked).toHaveBeenCalled()

  })
})

