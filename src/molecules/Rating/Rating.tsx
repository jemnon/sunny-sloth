import React, { FC, useEffect, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ButtonReset } from '../../atoms/Button';
import { StarFull } from '../../atoms/Icons';
import { useCommentsFormContext } from '../../organisms/Comments/CommentsFormContext';

type Size = 'normal' | 'small';

interface RatingProps {
  onSetRating?: (val: number) => void;
  rating?: number;
  size?: Size;
}

const RatingContainer = styled.ul`
  display: flex;
  align-items: center;

  margin-bottom: ${({ theme: { spacing } }): string => spacing.sm4};
  margin-left: ${({ theme: { spacing } }): string => `-${spacing.sm1}`};
`;

const RatingListItem = styled.li`
  line-height: 1;
`;

const RatingButton = styled.button<{ size?: Size }>`
  ${ButtonReset};
  cursor: ${({ size }): string => (size === 'small' ? 'auto' : 'pointer')};
  padding-right: ${({ theme: { spacing } }): string => spacing.sm1};
  padding-left: ${({ theme: { spacing } }): string => spacing.sm1};
`;

const Rating: FC<RatingProps> = ({
  onSetRating,
  rating = 0,
  size = 'normal',
}) => {
  const { colors, fontSizes } = useContext(ThemeContext);
  const { rating: rt } = useCommentsFormContext();
  const [value, setValue] = useState<number>(rating);
  const total = 5;
  const handleRating = (val: number): void => {
    if (onSetRating) onSetRating(val);
    setValue(val);
  };
  const getFill = (val: number, idx: number): string => {
    if (idx <= val && val !== 0) {
      return colors.orange;
    }
    return colors.lightGray;
  };
  if (rating === 0 && size === 'small') return null;
  useEffect(() => {
    if (rt) console.log('rt: ', rt);
  }, [rt]);
  return (
    <RatingContainer>
      {Array.from({ length: total }, (_, idx) => (
        <RatingListItem key={`rating-list-item-${idx}`}>
          <RatingButton
            onClick={(): void => {
              if (size === 'normal') handleRating(idx + 1);
            }}
            size={size}
          >
            <StarFull
              fontSize={size === 'normal' ? fontSizes.f3 : fontSizes.f1}
              fill={getFill(value, idx + 1)}
            />
          </RatingButton>
        </RatingListItem>
      ))}
    </RatingContainer>
  );
};

export default Rating;
