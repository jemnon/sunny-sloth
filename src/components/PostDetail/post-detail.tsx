import React, { FC } from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Post } from '../../types/post';
import { H1 } from '../headings-styled';

type PostDetailProps = Post;

const PostDetailHeader = styled.header`
  font-family: ${({ theme }): string => theme.fonts.noto};
  margin-bottom: 1rem;
  > span {
    color: ${({ theme }): string => theme.colors.orange};
  }
  time {
    text-transform: capitalize;
    font-style: italic;
    > span {
      padding: 0 0.25rem;
    }
  }
`;

const PostDetailBody = styled.div`
  @media ${({ theme }): string => theme.breakpoints.desktop} {
    margin-bottom: 2rem;
  }
  margin-bottom: 1rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
`;

const PostDetailImage = styled.div`
  @media ${({ theme }): string => theme.breakpoints.desktop} {
    margin-bottom: 2rem;
  }
  margin-bottom: 1rem;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`;

const PostDetail: FC<PostDetailProps> = ({
  categories,
  publishDate,
  images,
  title,
  body,
  bodyShort,
}) => {
  const date = new Date(publishDate);
  const [{ fluid }] = images;
  const cats: Array<string> = [];
  categories.forEach(category => {
    cats.push(category.name);
  });
  return (
    <article>
      <PostDetailHeader>
        <time dateTime={publishDate}>
          {date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          <span>&ndash;</span>
        </time>
        <span>{cats.join()}</span>
      </PostDetailHeader>
      <H1>{title}</H1>
      <PostDetailImage>
        <Img fluid={fluid} />
      </PostDetailImage>
      <PostDetailBody>{body?.body || bodyShort?.bodyShort}</PostDetailBody>
    </article>
  );
};

export default PostDetail;
