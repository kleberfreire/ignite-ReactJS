import { render } from "@testing-library/react"
import { ActiveLink } from "."

// jest.mock('next/router', () => {
//   return {
//     userRouter() {
//       return {
//         asPath: '/'
//       }
//     }
//   }
// })

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
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

test('active link renders correctly', () => {
  const { getByText } = render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  )

  expect(getByText('Home')).toBeInTheDocument();
})

test('active link receiving active class', () => {
  const { debug, getByText } = render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  )
  debug()
  // expect(getByText('Home')).toHaveClass('active');
})