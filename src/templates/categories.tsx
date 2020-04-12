import React, { FC } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Categories as CategoriesType } from '../types/categories';
import ContainerStyled, {
  ContainerContent,
  ContainerSideBar,
  HR,
} from '../components/container-styled';
import Breadcrumbs from '../components/Breadcrumbs';
import Categories from '../components/Categories';
import { HEADER_HEIGHT } from '../components/Header';
import Layout from '../components/Layout';
import Link from '../components/Link';
import PostDetail from '../components/PostDetail';
import SEO from '../components/SEO';

interface CategoriesPageProps {
  data?: {
    allContentfulCategories?: {
      nodes: CategoriesType[];
    };
  };
  pageContext: {
    page: CategoriesType;
  };
}

const CategoriesPageListItem = styled.li`
  a {
    text-decoration: none;
    color: ${({ theme }): string => theme.colors.nearBlack};
  }
`;

const CategoriesPage: FC<CategoriesPageProps> = ({ data, pageContext }) => {
  const { nodes: categories } = data?.allContentfulCategories || {};
  const { page: pageData } = pageContext || {};
  const { posts } = pageData || {};
  return (
    <Layout>
      <SEO
        description="Whisper of Yum Categories page"
        title="Categories"
        meta={[
          {
            name: '',
            content: '',
          },
        ]}
      />
      <div style={{ paddingTop: HEADER_HEIGHT }}>
        <ContainerStyled>
          <ContainerContent>
            <Breadcrumbs title="categories" />
            {posts && (
              <ul>
                {posts.map((post, idx) => {
                  const postsLength = posts.length;
                  return (
                    <CategoriesPageListItem
                      key={`categories-${idx}-${post.id}`}
                    >
                      <Link to={`/post/${post.slug}`}>
                        <PostDetail
                          categories={post.categories}
                          publishDate={post.publishDate}
                          images={post.images}
                          title={post.title}
                          bodyShort={post.bodyShort}
                        />
                      </Link>
                      {posts.length - 1 === idx ? null : <HR />}
                    </CategoriesPageListItem>
                  );
                })}
              </ul>
            )}
          </ContainerContent>
          <ContainerSideBar>
            {categories && <Categories categories={categories} />}
          </ContainerSideBar>
        </ContainerStyled>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allContentfulCategories {
      nodes {
        name
        posts {
          slug
          id
        }
      }
    }
  }
`;

export default CategoriesPage;