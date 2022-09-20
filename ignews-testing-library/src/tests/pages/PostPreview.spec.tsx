import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { createClient } from "../../services/prismicio";

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt</p>',
  updatedAt: 'August, 4'
}


jest.mock('../../services/stripe')

jest.mock('../../services/prismicio');

jest.mock("next-auth/react")

jest.mock('next/router');

describe("Post preview page", () => {
  it("render correctly", () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(
      <Post
        post={post}
      />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading ?")).toBeInTheDocument();
  });

    it('redirects user to full post when user subscribed', async () => {
      const useSessionMocked = jest.mocked(useSession)
      const useRouterMocked = jest.mocked(useRouter)
      const pushMock = jest.fn()
      
      useSessionMocked.mockReturnValueOnce({
        data: {
          activeSubscription: 'fake-active-subscription',
          expires: null
      },
        status: "authenticated"
      })
      
      useRouterMocked.mockReturnValueOnce({
        push: pushMock
      }as any)
      
      
      render(
        <Post
        post={post}
        />
        );

      expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    });

    it('loads inicial data', async () => {
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
      
      const response = await getStaticProps({ params: { slug: 'my-new-post' }});
  
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
