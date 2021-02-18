import React, { FC } from 'react';
import Img from 'gatsby-image';
import { navigate } from 'gatsby';
import Carousel from '../organisms/Carousel';
import Container from '../organisms/Container';
import Grid, { GridCell } from '../organisms/Grid';
import Header from '../organisms/Header';
import Layout, { PageHeader } from '../organisms/Layout';
import Scroller from '../organisms/Scroller';
import Stack, { StackItem } from '../organisms/Stack';
import Card from '../molecules/Card';
import MarkdownList from '../molecules/MarkdownList';
import PosterIterator from '../molecules/PostIterator';
import RecipeMeta from '../molecules/RecipeMeta';
import SEO from '../molecules/SEO';
import Share from '../molecules/Share';
import BackToTop from '../molecules/BackToTop';
import BreadCrumbs from '../molecules/BreadCrumbs';
import { H1, H4 } from '../atoms/Headings';
import Link from '../atoms/Link';
import PostDate from '../atoms/PostDate';
import { useBreakpointContext } from '../context/BreakpointContextProvider';
import { Post as PostType } from '../types/post';
import { generateFromAst } from '../utils/utils';

interface PostPageProps {
  pageContext: {
    page: PostType;
    next: PostType;
    prev: PostType;
  };
  location: {
    pathname: string;
    href: string;
  };
}

const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const PostPage: FC<PostPageProps> = ({ location, pageContext }) => {
  const { name: breakpoint } = useBreakpointContext();
  const { page: post } = pageContext || {};
  const totalImages = post.images.length;
  const [{ fixed }] = post.images || [];
  const handleIteratorClick = (slug: string): void => {
    navigate(`/post/${slug}`);
  };
  const schemaJson = {
    '@context': 'http://schema.org',
    '@type': 'Recipe',
    author: 'Jeri Mobley',
    description: post.bodyPreview?.bodyPreview,
    datePublished: post.publishDate,
    image: `https:${fixed?.src}`,
    name: capitalize(post.title),
    recipeIngredient: generateFromAst(post.body?.childMarkdownRemark?.htmlAst),
    recipeInstructions: generateFromAst(
      post.body?.childMarkdownRemark?.htmlAst,
      'instructions',
      'ol',
    ),
  };
  return (
    <Layout>
      <SEO
        description={`${post.bodyPreview?.bodyPreview}`}
        title={`${capitalize(post.title)} | Whisper of Yum`}
        type="article"
        image={`https:${fixed?.src}`}
        pathname={location.pathname}
        script={JSON.stringify(schemaJson)}
      />
      <Header />
      <Container>
        <PageHeader>
          <Grid columns={12} gap="sm4">
            <GridCell width={9}>
              <BreadCrumbs
                onClick={(): void => {
                  navigate('/');
                }}
                title={post.title}
              />
            </GridCell>
            <GridCell width={3} display="flex" justifyContent="flex-end">
              <Share
                description={post.bodyPreview?.bodyPreview}
                media={`https:${fixed?.src}`}
                title={post.title}
                url={location.href}
              />
            </GridCell>
          </Grid>
        </PageHeader>
        <Stack bottomSpacing="sp-0">
          <StackItem>
            <Grid columns={breakpoint === 'desktop' ? 12 : 1} rowGap="md4">
              <GridCell width={breakpoint === 'desktop' ? 5 : 1}>
                {post.publishDate && (
                  <PostDate publishDate={post.publishDate} />
                )}
                <H1>{post.title}</H1>
                <Stack bottomSpacing="sp-0">
                  {breakpoint !== 'desktop' && (
                    <StackItem bottomSpacing="sm4">
                      {totalImages > 1 ? (
                        <Carousel>
                          {post.images.map(img => (
                            <>
                              {img.fluid && (
                                <Img
                                  alt={post.title}
                                  key={post.id}
                                  style={{ width: '100%' }}
                                  fluid={img.fluid}
                                />
                              )}
                            </>
                          ))}
                        </Carousel>
                      ) : (
                        <>
                          {post.images[0].fluid && (
                            <Img
                              alt={post.title}
                              fluid={post.images[0].fluid}
                            />
                          )}
                        </>
                      )}
                    </StackItem>
                  )}
                  {post?.bodyShort?.childMarkdownRemark && (
                    <StackItem
                      bottomSpacing="sm4"
                      dangerouslySetInnerHTML={{
                        __html: post.bodyShort?.childMarkdownRemark?.html,
                      }}
                    />
                  )}
                  {post.totalTime && post.servings && (
                    <RecipeMeta
                      cookTime={post.totalTime}
                      servings={post.servings}
                    />
                  )}
                </Stack>
              </GridCell>
              {breakpoint === 'desktop' && (
                <GridCell width={breakpoint === 'desktop' ? 7 : 1}>
                  {totalImages > 1 ? (
                    <Carousel>
                      {post.images.map(img => (
                        <>
                          {img.fluid && (
                            <Img
                              alt={post.title}
                              key={post.id}
                              style={{ width: '100%' }}
                              fluid={img.fluid}
                            />
                          )}
                        </>
                      ))}
                    </Carousel>
                  ) : (
                    <>
                      {post.images[0].fluid && (
                        <Img alt={post.title} fluid={post.images[0].fluid} />
                      )}
                    </>
                  )}
                </GridCell>
              )}
            </Grid>
          </StackItem>
          {post.ingredients && (
            <StackItem>
              <Grid columns={breakpoint === 'desktop' ? 12 : 1} rowGap="sm4">
                <GridCell width={breakpoint === 'desktop' ? 5 : 1}>
                  {post.ingredients && (
                    <H4 bottomSpacing="sp-0">Ingredients</H4>
                  )}
                </GridCell>
                <GridCell width={breakpoint === 'desktop' ? 7 : 1}>
                  {post.ingredients?.childMarkdownRemark && (
                    <MarkdownList
                      dangerouslySetInnerHTML={{
                        __html: post.ingredients?.childMarkdownRemark?.html,
                      }}
                    />
                  )}
                </GridCell>
              </Grid>
            </StackItem>
          )}
          {post.optionalIngredients && (
            <StackItem>
              <Grid columns={breakpoint === 'desktop' ? 12 : 1} rowGap="sm4">
                <GridCell width={breakpoint === 'desktop' ? 5 : 1}>
                  {post.optionalIngredients && (
                    <H4 bottomSpacing="sp-0">Optional</H4>
                  )}
                </GridCell>
                <GridCell width={breakpoint === 'desktop' ? 7 : 1}>
                  {post.optionalIngredients?.childMarkdownRemark && (
                    <MarkdownList
                      dangerouslySetInnerHTML={{
                        __html:
                          post.optionalIngredients?.childMarkdownRemark?.html,
                      }}
                    />
                  )}
                </GridCell>
              </Grid>
            </StackItem>
          )}
          {post.instructions && (
            <StackItem bottomSpacing="xlg4">
              <Grid columns={breakpoint === 'desktop' ? 12 : 1} rowGap="sm4">
                <GridCell width={breakpoint === 'desktop' ? 5 : 1}>
                  {post.instructions && (
                    <H4 bottomSpacing="sp-0">Instructions</H4>
                  )}
                </GridCell>
                <GridCell width={breakpoint === 'desktop' ? 7 : 1}>
                  {post.instructions?.childMarkdownRemark && (
                    <MarkdownList
                      dangerouslySetInnerHTML={{
                        __html: post.instructions?.childMarkdownRemark?.html,
                      }}
                    />
                  )}
                </GridCell>
              </Grid>
            </StackItem>
          )}
          <StackItem bottomSpacing="xlg4">
            <PosterIterator
              next={{
                image: post.next && post.next?.images[0].fluid && (
                  <Img
                    alt={post.next?.title}
                    fluid={post.next?.images[0].fluid}
                  />
                ),
                name: post.next?.title || '',
                slug: post.next?.slug || '',
              }}
              prev={{
                image: post.previous && post.previous?.images[0].fluid && (
                  <Img
                    alt={post.previous?.title}
                    fluid={post.previous?.images[0].fluid}
                  />
                ),
                name: post.previous?.title || '',
                slug: post.previous?.slug || '',
              }}
              onClick={handleIteratorClick}
            />
          </StackItem>
          {post.relatedRecipes && (
            <StackItem bottomSpacing="xlg4">
              <H4>Related Recipes</H4>
              {breakpoint === 'desktop' ? (
                <Grid columns={3} gap="sm4" rowGap="sm4">
                  {post.relatedRecipes.map(recipe => (
                    <GridCell key={recipe.title} width={1}>
                      <Link to={`/post/${recipe.slug}`}>
                        <Card
                          image={
                            recipe.images[0].fluid && (
                              <Img
                                alt={recipe.title}
                                fluid={recipe.images[0].fluid}
                              />
                            )
                          }
                          publishDate={recipe.publishDate}
                          title={recipe.title}
                        />
                      </Link>
                    </GridCell>
                  ))}
                </Grid>
              ) : (
                <Scroller columnWidth="75%">
                  {post.relatedRecipes.map(recipe => (
                    <Link key={recipe.slug} to={`/post/${recipe.slug}`}>
                      <Card
                        image={
                          recipe.images[0].fluid && (
                            <Img
                              alt={recipe.title}
                              fluid={recipe.images[0].fluid}
                            />
                          )
                        }
                        publishDate={recipe.publishDate}
                        title={recipe.title}
                      />
                    </Link>
                  ))}
                </Scroller>
              )}
            </StackItem>
          )}
          <StackItem>
            <BackToTop />
          </StackItem>
        </Stack>
      </Container>
    </Layout>
  );
};

export default PostPage;
