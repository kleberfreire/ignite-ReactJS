import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { createClient } from '../../services/prismicio'

const posts = [
  {
      slug: 'my-new-post',
      title: 'My new post',
      excerpt: 'Post excerpt',
      updatedAt: 'August, 4'
  }
]

jest.mock('../../services/stripe')

jest.mock('../../services/prismicio');

describe("Post page", () => {
  it("render correctly", () => {
    render(
      <Posts
        posts={posts}
      />
    );

    expect(screen.getByText("My new post")).toBeInTheDocument();
  });

    it('loads initial data', async () => {
      const getPrismicClientMocked = jest.mocked(createClient);

        getPrismicClientMocked.mockReturnValueOnce({
          getAllByType: jest.fn().mockResolvedValueOnce(
            [
              {
                uid: 'fake-slug',
                data: {
                  Title: [
                    {
                      type: "heading1",
                      text: "Fake title 1",
                    },
                  ],
                  Content: [
                    {
                      type: 'paragraph',
                      text: 'Fake excerpt 1',
                    },
                  ],
                },
                last_publication_date: '01-01-2020',
              },
            ],
        ),
        } as any);

        const response = await getStaticProps({
            previewData: undefined,
        });

        expect(response).toEqual(
          expect.objectContaining({
            props: {
              posts: [
                {
                  slug: 'fake-slug',
                  title: 'Fake title 1',
                  excerpt: 'Fake excerpt 1',
                  updatedAt: '01 de janeiro de 2020',
                }
              ]
            }
          })
      )
    });
});
