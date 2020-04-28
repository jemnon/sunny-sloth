import React, { FC } from 'react';
import styled from 'styled-components';
import { Post as PostType } from '../types/post';
import Container from '../components/container-styled';
import Breadcrumbs from '../components/Breadcrumbs';
import Header from '../components/Header';
import { HEADER_HEIGHT } from '../components/Header';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import PostDetail from '../components/PostDetail';
import SEO from '../components/SEO';
import Share from '../components/Share';

interface PostPageProps {
  pageContext: {
    page: PostType;
  };
  location: {
    href: string;
  };
}

const PostPageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  [class^='breadcrumbs'] {
    margin-bottom: 0;
  }
`;

const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const PostPage: FC<PostPageProps> = ({ location, pageContext }) => {
  const { page: post } = pageContext || {};
  const [{ fixed }] = post.images || [];
  return (
    <Layout>
      <SEO
        description={`${post.bodyPreview?.bodyPreview}`}
        title={`${capitalize(post.title)} | Whisper of Yum`}
        slug={`/${post.slug}`}
        meta={[
          {
            name: `twitter:image`,
            content: `https:${fixed?.src}`,
          },
          {
            name: `og:image`,
            content: `https:${fixed?.src}`,
          },
        ]}
      />
      <Header isVisible={true}>
        <Nav />
      </Header>
      <div style={{ paddingTop: HEADER_HEIGHT }}>
        <Container>
          <PostPageHeader>
            <Breadcrumbs title={post.title} />
            <Share image={`https:${fixed?.src}`} url={location.href} />
          </PostPageHeader>
          {post && (
            <PostDetail
              categories={post.categories}
              publishDate={post.publishDate}
              images={post.images}
              title={post.title}
              bodyShort={post.bodyShort}
              body={post.body}
            />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default PostPage;
