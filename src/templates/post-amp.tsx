import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../atoms/GlobalStyle';
import { H1, H2 } from '../atoms/Headings';
import theme from '../theme';
import SEO from '../molecules/SEO';
import { generateFromAst } from '../utils/utils';
import { Post as PostType } from '../types/post';

interface PostPageAMPProps {
  pageContext: {
    page: PostType;
  };
  location: {
    pathname: string;
    href: string;
  };
}

const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const boilerplate =
  'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';
const noscriptBoilerplate =
  'body{-webkit-animation: none;-moz-animation: none;-ms-animation: none;animation: none}';
const custom = 'amp-story-page { background-color: #000;}';

const PostPageAMP: FC<PostPageAMPProps> = ({ pageContext, location }) => {
  const { page: post } = pageContext || {};
  const [{ fixed }] = post.images || [];
  const schemaJson = {
    '@context': 'http://schema.org',
    '@type': 'Recipe',
    author: 'Jeri Mobley-Arias',
    description: post.bodyPreview?.bodyPreview,
    datePublished: post.publishDate,
    image: `https:${fixed?.src}`,
    name: capitalize(post.title),
    recipeIngredient: generateFromAst(
      post.ingredients?.childMarkdownRemark?.htmlAst,
    ),
    recipeInstructions: generateFromAst(
      post.instructions?.childMarkdownRemark?.htmlAst,
      'instructions',
      'ol',
    ),
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <SEO
          ampEnabled
          ampBoilerplate={boilerplate}
          ampNoscript={noscriptBoilerplate}
          ampCustom={custom}
          description={`${post.bodyPreview?.bodyPreview}`}
          title={`${capitalize(post.title)} | Whisper of Yum`}
          type="article"
          image={`https:${fixed?.src}`}
          pathname={`/post/${post.slug}`}
          script={JSON.stringify(schemaJson)}
        />
        <amp-story
          standalone
          title={`${capitalize(post.title)}`}
          publisher="Whipser of Yum"
          publisher-logo-src="/logo-white.png"
          poster-portrait-src=""
        >
          <amp-story-page id="cover">
            <amp-story-grid-layer template="fill">
              <amp-img
                src={post.webStory?.[0].coverPage.fixed.src}
                width="720"
                height="1280"
                layout="responsive"
              />
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical">
              <H1 color="white">{post.webStory?.[0].coverPage.title}</H1>
            </amp-story-grid-layer>
          </amp-story-page>
          {post.webStory?.[0].pages.map((page, key: number) => (
            <amp-story-page id={`page${key + 1}`} key={`page-${key}`}>
              <amp-story-grid-layer template="fill">
                <amp-img
                  src={page.fixed.src}
                  width="720"
                  height="1280"
                  layout="responsive"
                />
              </amp-story-grid-layer>

              <amp-story-grid-layer template="vertical">
                <H2 color="white">{page.title}</H2>
              </amp-story-grid-layer>
            </amp-story-page>
          ))}
        </amp-story>
      </Container>
    </ThemeProvider>
  );
};

export default PostPageAMP;
