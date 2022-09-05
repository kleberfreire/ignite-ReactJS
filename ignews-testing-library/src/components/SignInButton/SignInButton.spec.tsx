import { render, screen } from "@testing-library/react"

import { useSession } from "next-auth/react"
import { SignInButton } from "."

jest.mock('next-auth/react')


describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
   
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })
  

    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign with in Github')).toBeInTheDocument();
  })

  it('renders correctly when user is authenticated', () => {

    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: {user: { name: 'Jonh Doe', email: 'jonh.doe@gmail.com', image: '' }, expires: ""},
      status: "authenticated"
    })

    render(
      <SignInButton />
    )
  
    expect(screen.getByText('Jonh Doe')).toBeInTheDocument();
  })

})

