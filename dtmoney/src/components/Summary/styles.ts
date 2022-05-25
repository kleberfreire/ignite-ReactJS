import styled from "styled-components";
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;

  margin-top: -6.9rem;

  div {
    background-color: var(--shape);
    padding: 1.25rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
      &.balance-color-red {
        color: var(--red);
      }
    }

    &.highlight-background {
      background: var(--green);
      color: #fff;
    }

    &.highlight-background-red {
      background: var(--red);
      color: #fff;
    }
  }
`;
