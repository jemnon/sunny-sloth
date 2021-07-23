const getProfileAbout = async graphql => {
  const data = await graphql(`
    query {
      contentfulProfileAbout {
        avatar {
          fixed(quality: 80, width: 400) {
            src
          }
        }
        description {
          childMarkdownRemark {
            html
          }
        }
        name
      }
    }
  `);
  return data;
};

const getInstagramData = async graphql => {
  const data = await graphql(`
    query {
      allInstagramContent(limit: 4) {
        edges {
          node {
            media_type
            permalink
            id
            localImage {
              childImageSharp {
                fixed(width: 500, height: 500, quality: 90) {
                  src
                }
              }
            }
          }
        }
      }
    }
  `);
  return data;
};

const getFavorites = async graphql => {
  const data = await graphql(`
    {
      allContentfulFavoritePosts(limit: 5) {
        edges {
          node {
            posts {
              title
              publishDate
              slug
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
              bodyPreview {
                bodyPreview
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    }
  `);
  return data;
};

const getAllPosts = async graphql => {
  const data = await graphql(`
    {
      allContentfulPosts(sort: { fields: publishDate, order: DESC }) {
        edges {
          previous {
            title
            slug
            images {
              fluid {
                aspectRatio
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
                tracedSVG
              }
            }
          }
          next {
            title
            slug
            images {
              fluid {
                aspectRatio
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
                tracedSVG
              }
            }
          }
          node {
            id
            contentful_id
            slug
            publishDate
            title
            enableComments
            enableAmp
            bodyPreview {
              bodyPreview
              childMarkdownRemark {
                htmlAst
              }
            }
            bodyShort {
              bodyShort
              childMarkdownRemark {
                html
              }
            }
            images {
              fixed(width: 400) {
                src
                base64
              }
              fluid {
                base64
                aspectRatio
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
              }
            }
            totalTime
            servings
            ingredients {
              childMarkdownRemark {
                html
                htmlAst
              }
            }
            optionalIngredients {
              childMarkdownRemark {
                html
                htmlAst
              }
            }
            instructions {
              childMarkdownRemark {
                html
                htmlAst
              }
            }
            relatedRecipes {
              id
              title
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
              publishDate
              slug
            }
            webStory {
              pages {
                title
                fixed(quality: 80) {
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                  aspectRatio
                }
              }
              coverPage {
                fixed(quality: 80) {
                  src
                  srcSet
                  srcSetWebp
                  srcWebp
                }
                title
              }
            }
          }
        }
      }
    }
  `);
  return data;
};

const getLatestPost = async graphql => {
  const data = await graphql(`
    query {
      allContentfulPosts(limit: 1, sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            title
            slug
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
  `);
  return data;
};

const getRecentPosts = async graphql => {
  const data = await graphql(`
    query {
      allContentfulPosts(
        limit: 5
        sort: { fields: publishDate, order: DESC }
        skip: 1
      ) {
        edges {
          node {
            title
            publishDate
            slug
            images {
              fluid(cropFocus: CENTER) {
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
    }
  `);
  return data;
};

const getReels = async graphql => {
  const data = await graphql(`
    query {
      contentfulReels {
        videos {
          id
          secure_url
          format
          duration
        }
        videoThumbs {
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
  `);
  return data;
};

const getFeaturedOn = async graphql => {
  const data = await graphql(`
    query {
      contentfulFeaturedOn {
        name
        logos {
          fluid {
            aspectRatio
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
          }
        }
        links
      }
    }
  `);
  return data;
};

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data: latestPostData } = await getLatestPost(graphql);
  const { data: favoritesData } = await getFavorites(graphql);
  const { data: featuredOnData } = await getFeaturedOn(graphql);
  const { data: recentPostsData } = await getRecentPosts(graphql);
  const { data: postsData } = await getAllPosts(graphql);
  const { data: profileAboutData } = await getProfileAbout(graphql);
  const { data: reelsData } = await getReels(graphql);
  let instaData = null;
  try {
    const { data } = await getInstagramData(graphql);
    instaData = data;
  } catch (error) {
    console.error('ig error: ', error);
  }
  createPage({
    path: '/',
    component: require.resolve('./src/templates/home.tsx'),
    context: {
      page: {
        about: profileAboutData
          ? profileAboutData.contentfulProfileAbout
          : null,
        reels: reelsData ? reelsData.contentfulReels : null,
        featuredOn: featuredOnData ? featuredOnData.contentfulFeaturedOn : null,
        latestPost: latestPostData
          ? latestPostData.allContentfulPosts.edges
          : null,
        favorites: favoritesData
          ? favoritesData.allContentfulFavoritePosts.edges
          : null,
        instagram: instaData ? instaData.allInstagramContent.edges : null,
        recentPosts: recentPostsData
          ? recentPostsData.allContentfulPosts.edges
          : null,
      },
    },
  });
  // post pages
  if (postsData) {
    postsData.allContentfulPosts.edges.forEach(edge => {
      const { slug, enableAmp } = edge.node;
      createPage({
        path: `post/${slug}`,
        component: require.resolve('./src/templates/post.tsx'),
        context: {
          about: profileAboutData.contentfulProfileAbout,
          instagram: instaData ? instaData.allInstagramContent.edges : null,
          page: { ...edge.node, next: edge.next, previous: edge.previous },
        },
      });
      // generate amp pages
      if (enableAmp) {
        createPage({
          path: `web-stories/${slug}`,
          component: require.resolve('./src/templates/post-amp.tsx'),
          context: {
            page: { ...edge.node, next: edge.next, previous: edge.previous },
          },
        });
      }
    });
    // print recipe pages
    postsData.allContentfulPosts.edges.forEach(edge => {
      const { slug } = edge.node;
      createPage({
        path: `recipe-print/${slug}`,
        component: require.resolve('./src/templates/recipe-print.tsx'),
        context: {
          page: { ...edge.node },
        },
      });
    });
    // generate pagination for posts page
    const postsPerPage = 9;
    const postsLen = postsData.allContentfulPosts.edges.length;
    const totalPages = Math.ceil(postsLen / postsPerPage);
    Array.from({ length: totalPages }).forEach((_, idx) => {
      createPage({
        path: `/posts/${idx + 1}`,
        component: require.resolve('./src/templates/post-list.tsx'),
        context: {
          about: profileAboutData.contentfulProfileAbout,
          reels: reelsData.contentfulReels,
          featuredOn: featuredOnData.contentfulFeaturedOn,
          instagram: instaData ? instaData.allInstagramContent.edges : null,
          currentPage: idx + 1,
          limit: postsPerPage,
          skip: idx * postsPerPage,
          totalPages,
        },
      });
    });
  }
};
