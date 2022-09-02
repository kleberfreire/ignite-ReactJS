import { render, screen, fireEvent } from "@testing-library/react"

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
})

