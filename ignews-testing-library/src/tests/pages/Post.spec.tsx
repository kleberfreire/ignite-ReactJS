import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { createClient } from '../../services/prismicio'

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt</p>',
  updatedAt: 'August, 4'
}


jest.mock('../../services/stripe')

jest.mock('../../services/prismicio');

jest.mock("next-auth/react")

describe("Post page", () => {
  it("render correctly", () => {
    render(
      <Post
        post={post}
      />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

    it('redirects user if no subscription is found', async () => {
        const getSessionMock = jest.mocked(getSession)

        getSessionMock.mockResolvedValueOnce({
          activeSubscription: null,
        } as any)
      
        
        const response = await getServerSideProps({params: { slug: 'my-new-post' }} as any);



        expect(response).toEqual(
          expect.objectContaining({
            redirect: expect.objectContaining({
                destination: '/'  
          })
          })
      )
    });

    it('loads inicial data', async () => {
      const getSessionMocked = jest.mocked(getSession)
      const getPrismicClientMocked = jest.mocked(createClient);

      getPrismicClientMocked.mockReturnValueOnce({
        getByUID: jest.fn().mockResolvedValueOnce({
          data: {
            Title: [
              { type: 'heading', text: 'My new post' }
            ],
            Content: [
              { type: 'paragraph', text: 'Post content' }
            ]
          },
          last_publication_date: '04-01-2021'
        })
      } as any);
      
      getSessionMocked.mockReturnValueOnce({
          activeSubscription: 'fake-active-subscription'
      } as any);
      
      const response = await getServerSideProps({ params: { slug: 'my-new-post' }} as any);
  
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            post: {
              slug: 'my-new-post',
              title: 'My new post',
              content: '<p>Post content</p>',
              updatedAt: '01 de abril de 2021'
            }
          }
        })
      )
    });
});
