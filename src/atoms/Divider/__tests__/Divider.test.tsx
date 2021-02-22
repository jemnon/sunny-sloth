import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import Divider from '../Divider';
import theme from '../../../theme';

describe('<Divider />', (): void => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Divider />
    </ThemeProvider>
  );
  it('exists', (): void => {
    expect(Divider).toBeDefined();
  });
  it('renders defaults correctly', (): void => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});