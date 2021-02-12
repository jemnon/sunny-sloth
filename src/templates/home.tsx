import React, { FC, useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import Img from 'gatsby-image';
import Container from '../organisms/Container';
import Grid, { GridCell } from '../organisms/Grid';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import Layout from '../organisms/Layout';
import Newsletter from '../organisms/Newsletter';
import Scroller from '../organisms/Scroller';
import Stack, { StackItem } from '../organisms/Stack';
import BackToTop from '../molecules/BackToTop';
import CalloutLink from '../molecules/CalloutLink';
import Media from '../molecules/Media';
import ProfileCard from '../molecules/ProfileCard';
import SEO from '../molecules/SEO';
import { H4 } from '../atoms/Headings';
import ImgWrapper from '../atoms/ImgWrapper';
import Link from '../atoms/Link';
import { InstaDesktop, InstaMobile } from '../atoms/InstagramContainer';
import { useBreakpointContext } from '../context/BreakpointContextProvider';
import { ColorMode as ColorModeType } from '../types/theme';
import InstagramType from '../types/instagram';
import { Post as PostType } from '../types/post';
import ProfileAboutType from '../types/profile-about';
import VideoReelType from '../types/video-reel';

interface LatestPost {
  node: PostType;
}

interface RecentPosts {
  node: PostType;
}

interface Favorites {
  node: {
    posts: PostType[];
  };
}

interface Instagram {
  node: InstagramType;
}

interface HomeProps {
  pageContext?: {
    page?: {
      about?: ProfileAboutType;
      reels?: {
        videos: VideoReelType[];
      };
      favorites?: Favorites[];
      instagram?: Instagram[];
      latestPost?: LatestPost[];
      recentPosts?: RecentPosts[];
    };
  };
}

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

const Home: FC<HomeProps> = ({ pageContext }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { name: breakpoint } = useBreakpointContext();
  const [headerColorTheme, setHeaderColorTheme] = useState<ColorModeType>(
    'dark',
  );
  const { about } = pageContext?.page || {};
  const [{ node: latestPostNode }] = pageContext?.page?.latestPost || [];
  const [{ node: favoritesNode }] = pageContext?.page?.favorites || [];
  const { instagram } = pageContext?.page || {};
  const { recentPosts } = pageContext?.page || {};
  const handleScroll = (): void => {
    if (containerRef.current)
      containerRef?.current.scrollIntoView({
        behavior: 'smooth',
      });
  };
  const handleViewPost = (slug?: string): void => {
    navigate(`/post/${slug}`);
  };
  const handleViewAllClick = (): void => {
    navigate(`/posts/1`);
  };
  useEffect(() => {
    const heroHeight = heroRef.current?.clientHeight || 0;
    const handleScroll = (): void => {
      const windowY = window.pageYOffset;
      const waypoint = heroHeight / 3;
      if (waypoint >= windowY) {
        setHeaderColorTheme('dark');
      }
      if (waypoint <= windowY) {
        setHeaderColorTheme('light');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerColorTheme, setHeaderColorTheme]);
  return (
    <Layout>
      <SEO
        description={metaDesc}
        image="https://images.ctfassets.net/lz7g6u6kccw7/5ZTQ6JUabdhzkYxGsOWwAN/38506c10912bb5fb03443efb790da33f/creamy_garlic_pork_chops.JPG?w=800&q=60"
        title="Whisper of Yum | Recipes, Cooking and Los Angeles"
        type="website"
      />
      {latestPostNode?.images && (
        <>
          <Header colorTheme={headerColorTheme} pathname="/" />
          <Hero
            title={latestPostNode?.title}
            onDownScroll={(): void => handleScroll()}
            onViewPost={(): void => handleViewPost(latestPostNode?.slug)}
            image={
              <Img
                alt={latestPostNode?.title}
                fluid={latestPostNode?.images[0].fluid}
              />
            }
            ref={heroRef}
          />
        </>
      )}
      <Container ref={containerRef} hasTopMargin={false}>
        <Grid columns={breakpoint === 'desktop' ? 12 : 1}>
          <GridCell width={breakpoint === 'desktop' ? 8 : 1}>
            {recentPosts && (
              <Stack>
                <H4>Latest</H4>
                {recentPosts.map(post => (
                  <StackItem key={post.node.slug}>
                    <Link to={`/post/${post.node.slug}`}>
                      <Media
                        description={
                          <>
                            {post.node.bodyPreview && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    post.node.bodyPreview.childMarkdownRemark
                                      ?.html || '',
                                }}
                              />
                            )}
                          </>
                        }
                        publishDate={post.node.publishDate || ''}
                        title={post.node.title}
                        image={
                          <Img
                            alt={post.node.title}
                            fluid={post.node.images[0].fluid}
                          />
                        }
                      />
                    </Link>
                  </StackItem>
                ))}
                <CalloutLink onClick={handleViewAllClick}>View All</CalloutLink>
              </Stack>
            )}

            {favoritesNode && (
              <Stack>
                <H4>Favs</H4>
                {favoritesNode.posts.map(post => (
                  <StackItem key={post.slug}>
                    <Link to={`/post/${post.slug}`}>
                      <Media
                        description={
                          <>
                            {post.bodyPreview && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    post.bodyPreview.childMarkdownRemark
                                      ?.html || '',
                                }}
                              />
                            )}
                          </>
                        }
                        publishDate={post.publishDate || ''}
                        title={post.title}
                        image={
                          <Img alt={post.title} fluid={post.images[0].fluid} />
                        }
                      />
                    </Link>
                  </StackItem>
                ))}
              </Stack>
            )}
          </GridCell>
          <GridCell width={breakpoint === 'desktop' ? 4 : 1}>
            {about && (
              <Stack>
                <ProfileCard
                  descriptionHtml={about?.description.childMarkdownRemark.html}
                  image={about?.avatar.fixed.src}
                  name={about?.name}
                  onClick={(): void => {
                    navigate('/about');
                  }}
                />
              </Stack>
            )}
            <Stack>
              <H4>Newsletter</H4>
              <Newsletter />
            </Stack>
            {instagram && (
              <Stack>
                <H4>Instagram</H4>
                <InstaDesktop>
                  <Grid columns={2} gap="sm4" rowGap="sm4">
                    {instagram.map(item => (
                      <GridCell key={item.node.id} width={1}>
                        <Link to={item.node.permalink} target="_blank">
                          <ImgWrapper ratio={1 / 1}>
                            <Img
                              alt="whisperofyum instagram"
                              fixed={item.node.localImage.childImageSharp.fixed}
                            />
                          </ImgWrapper>
                        </Link>
                      </GridCell>
                    ))}
                  </Grid>
                </InstaDesktop>
                <InstaMobile>
                  <Scroller>
                    {instagram.map(item => (
                      <Link
                        to={item.node.permalink}
                        key={item.node.id}
                        target="_blank"
                      >
                        <ImgWrapper ratio={1 / 1}>
                          <Img
                            alt="whisperofyum instagram"
                            fixed={item.node.localImage.childImageSharp.fixed}
                          />
                        </ImgWrapper>
                      </Link>
                    ))}
                  </Scroller>
                </InstaMobile>
              </Stack>
            )}
          </GridCell>
        </Grid>
        <BackToTop onClick={handleScroll} />
      </Container>
    </Layout>
  );
};

export default Home;
