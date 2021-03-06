import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { ButtonReset } from '../../atoms/Button';
import ImgWrapper from '../../atoms/ImgWrapper';
import Text from '../../atoms/Text';

interface PostIterator {
  image?: ReactNode;
  name: string;
  slug: string;
}

interface PostIteratorProps {
  prev?: PostIterator;
  next?: PostIterator;
  onClick: (slug: string) => void;
}

interface PostIteratorContainerProps {
  prev?: PostIterator;
  next?: PostIterator;
}

const PostIteratorContainer = styled.section<PostIteratorContainerProps>`
  display: flex;
  justify-content: ${({ next, prev }): string => {
    if (next?.image && !prev?.image) return 'flex-end';
    if (!next?.image && prev?.image) return 'flex-start';
    return 'space-between';
  }};

  width: 100%;

  padding: ${({ theme }): string => theme.spacing.sm4};

  background-color: ${({ theme }): string => theme.colors.nearWhite};
`;

const PostIteratorButton = styled.button`
  ${ButtonReset};

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const PostIteratorFigure = styled.figure`
  width: 4rem;
  ${up('sm')} {
    width: 5rem;
  }
`;

const PostIteratorContent = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: column;

  ${({ direction = 'left', theme }): string => {
    return direction === 'right'
      ? `margin-right: ${theme.spacing.sm4}`
      : `margin-left: ${theme.spacing.sm4}`;
  }};
`;

const PostIteratorName = styled.div<PostIteratorContainerProps>`
  display: ${({ next, prev }): string => {
    if (next?.name && prev?.name) return 'none';
    return 'block';
  }};
  max-width: 175px;
  ${up('sm')} {
    display: block;
  }
  ${up('md')} {
    max-width: none;
  }
`;

const PostIterator: FC<PostIteratorProps> = ({ next, prev, onClick }) => {
  const handleClick = (pathname: string): void => {
    onClick(pathname);
  };
  return (
    <PostIteratorContainer next={next} prev={prev}>
      {prev?.slug && (
        <PostIteratorButton onClick={(): void => handleClick(prev.slug)}>
          <PostIteratorFigure>
            <ImgWrapper ratio={1 / 1}>{prev.image}</ImgWrapper>
          </PostIteratorFigure>
          <PostIteratorContent>
            <Text textTransform="uppercase" fontSize="f-sm" fontWeight="bold">
              Previous
            </Text>
            <PostIteratorName
              as={Text}
              textTransform="uppercase"
              textColor="orange"
              fontSize="f-sm"
              fontWeight="bold"
              hasEllipsis
              next={next}
              prev={prev}
              title={prev.name}
            >
              {prev.name}
            </PostIteratorName>
          </PostIteratorContent>
        </PostIteratorButton>
      )}
      {next?.slug && (
        <PostIteratorButton onClick={(): void => handleClick(next.slug)}>
          <PostIteratorContent direction="right">
            <Text
              textAlign="right"
              textTransform="uppercase"
              fontSize="f-sm"
              fontWeight="bold"
            >
              Next
            </Text>
            <PostIteratorName
              as={Text}
              textTransform="uppercase"
              textColor="orange"
              fontSize="f-sm"
              fontWeight="bold"
              hasEllipsis
              next={next}
              prev={prev}
              title={next.name}
            >
              {next.name}
            </PostIteratorName>
          </PostIteratorContent>
          <PostIteratorFigure>
            <ImgWrapper ratio={1 / 1}>{next.image}</ImgWrapper>
          </PostIteratorFigure>
        </PostIteratorButton>
      )}
    </PostIteratorContainer>
  );
};

export default PostIterator;
