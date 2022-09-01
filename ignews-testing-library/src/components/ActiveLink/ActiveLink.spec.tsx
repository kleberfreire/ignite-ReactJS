import { render } from "@testing-library/react"
import {jest} from '@jest/globals';
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

jest.mock('next/router', () => {
    return {
    userRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

test('active link renders correctly', () => {
  const { debug } = render(
    <ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>
  )

  debug()
})