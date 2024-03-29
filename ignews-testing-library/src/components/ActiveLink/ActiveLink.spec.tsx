import { render, screen } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock('next/router', () => ({
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

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(screen.getByText('Home')).toBeInTheDocument();
  })
  
  it('adds active class if the link as currently active', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toHaveClass('active');
  })
})

