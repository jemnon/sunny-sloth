import React, { FC } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';

interface AuthorProps {
  name?: string;
}

const AuthorContainer = styled.div`
  color: ${({ theme: { colors } }): string => colors.orange};

  font-weight: bold;
  font-size: ${({ theme: { fontSizes } }): string => fontSizes['f-sm']};
  ${up('md')} {
    font-size: ${({ theme: { fontSizes } }): string => fontSizes.f1};
  }

  margin-bottom: ${({ theme: { spacing } }): string => spacing.sm4};
`;

const Author: FC<AuthorProps> = ({ name = 'Jeri Mobley-Arias' }) => (
  <AuthorContainer>By {name}</AuthorContainer>
);

export default Author;
