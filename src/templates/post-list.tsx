import React, { FC, useRef, useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { useNavigate } from '@reach/router';
import styled from 'styled-components';
import { HeroType } from '../types/hero';
import { Post as PostType } from '../types/post';
import Container from '../components/container-styled';
import Grid from '../components/grid-styled';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Pagination from '../components/Pagingation';
import PostDetail from '../components/PostDetail';
import SEO from '../components/SEO';

interface PostNode {
  node: PostType;
}

interface HeroNode {
  node: HeroType;
}

interface PostListProps {
  data?: {
    allContentfulPosts?: {
      edges?: PostNode[];
    };
    allContentfulHeroes?: {
      edges?: HeroNode[];
    };
  };
  location: {
    key: string;
    state?: {
      isScrollTo?: boolean;
    };
  };
  pageContext?: {
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}

const PostLink = styled.a`
  text-decoration: none;
  color: ${({ theme }): string => theme.colors.nearBlack};
`;

const metaDesc =
  `Just like you (or not), I love food. So much so, ` +
  `my partner and I decided to create this repository of my go-to, ` +
  `flavor-bomb dishes, with simple-ish prep. I get down making all sorts ` +
  `of eats, especially Filipino dishes from my childhood. ` +
  `I keep it simple and straight to the point; brief-ish description, ingredients, and steps.` +
  `I figure, if it looks good and you feel so inclined to making it, ` +
  `I'll spare you the endless scrolling through the details of why I ` +
  `chose a specific ingredient over another and get straight to what ` +
  `you want. Enjoy the content.`;

const PostList: FC<PostListProps> = ({ data, location, pageContext }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { edges: posts } = data?.allContentfulPosts || {};
  const { edges: hero } = data?.allContentfulHeroes || {};
  const [{ node: heroNode }] = hero || [];
  const handlePaginationClick = async (page: number): Promise<void> => {
    await navigate(`/${page === 1 ? '' : page}`, {
      state: {
        isScrollTo: true,
      },
    });
  };
  useEffect(() => {
    const heroHeight = heroRef.current?.clientHeight || 0;
    const handleScroll = () => {
      const windowY = window.pageYOffset;
      const waypoint = heroHeight / 2;
      if (waypoint >= windowY) {
        setIsHeaderVisible(false);
      }
      if (waypoint <= windowY) {
        setIsHeaderVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHeaderVisible, setIsHeaderVisible]);
  return (
    <Layout>
      <SEO
        description={metaDesc}
        image="https://res.cloudinary.com/dd8c1nipl/image/upload/c_scale,w_880/v1586932061/woy/pork-chop.jpg"
        title="Whisper of Yum | Recipes, Cooking and Los Angeles"
        type="article"
      />
      <Header isVisible={isHeaderVisible}>
        <Nav isHeaderVisible={isHeaderVisible} />
      </Header>
      <Hero ref={heroRef} images={heroNode.images} />
      <Container id="post-list-container">
        {posts && (
          <>
            <Grid columns={3}>
              {posts.map((post, idx) => {
                return (
                  <PostLink
                    as={Link}
                    key={post.node.id}
                    to={`/post/${post.node.slug}`}
                  >
                    <PostDetail
                      categories={post.node.categories}
                      publishDate={post.node.publishDate}
                      images={post.node.images}
                      title={post.node.title}
                      bodyPreview={post.node.bodyPreview}
                    />
                  </PostLink>
                );
              })}
            </Grid>
            {pageContext?.currentPage && pageContext.totalPages && (
              <Pagination
                currentPage={pageContext?.currentPage}
                limit={pageContext?.limit}
                onClick={handlePaginationClick}
                totalPages={pageContext?.totalPages}
              />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query homePageQuery($skip: Int!, $limit: Int!) {
    allContentfulPosts(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: publishDate }
    ) {
      edges {
        node {
          id
          slug
          publishDate
          categories {
            name
            posts {
              slug
            }
          }
          title
          images {
            fixed(width: 400) {
              src
            }
            fluid(maxWidth: 1440) {
              aspectRatio
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
            }
          }
          bodyPreview {
            bodyPreview
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulHeroes {
      edges {
        node {
          images {
            fluid {
              aspectRatio
              sizes
              src
              srcSet
              srcSetWebp
              srcWebp
            }
          }
        }
      }
    }
  }
`;

export default PostList;