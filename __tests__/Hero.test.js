import { Text, View } from 'react-native';
import React from 'react';
import Hero, { _createPositionStyle } from '../components/Hero';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const imageUrl = 'https://catsarethebest.com/cat1';
const overlayTpl =
      <View>
      <Text>React Native Hero</Text>
      <Text>Testing!</Text>
      </View>;

test('MAIN: Render correctly and overlay contains correct content', () => {
  const tree = renderer.create(
    <Hero
    source={{uri: imageUrl}}
    renderOverlay={() => overlayTpl} />
  ).toJSON();

  const imageParent = tree.children[0];
  // First child should be a Image wrapper
  expect(imageParent.type).toBe('Image');
  expect(imageParent.props.source).toEqual({ uri: imageUrl });
  // Default 100% width of Parent
  expect(imageParent.props.style.width).toBe('100%');
  // No color props set, so only overlay() content should be the only child
  expect(imageParent.children.length).toBe(1);

  const overlay = imageParent.children[0].children[0];
  expect(overlay.type).toBe('View');
  // Text elements of the view
  expect(overlay.children.length).toBe(2);
});

test('MAIN: Render with a static image', () => {
  const tree = renderer.create(
    <Hero
      source={require('../__assets__/lion-sample.jpg')}
      renderOverlay={() => overlayTpl} />
  ).toJSON();

  const imageParent = tree.children[0];
  expect(imageParent.type).toBe('Image');
  expect(imageParent.props.source).toBe(1);
});

test('PROPS: Props.minHeight should override the height', () => {
  const tree = renderer.create(
    <Hero
      source={{uri: imageUrl}}
      renderOverlay={() => overlayTpl}
      minHeight={1000} />
    ).toJSON();

  const imageParent = tree.children[0];
  expect(imageParent.props.style.height).toBe(1000)
});

test('PROPS: Props.fullWidth should default to state updates', () => {
  const tree = renderer.create(
    <Hero
      source={{uri: imageUrl}}
      renderOverlay={() => overlayTpl}
    fullWidth={false} />
    ).toJSON();

  const imageParent = tree.children[0];
  expect(imageParent.props.style.fullWidth).toBeUndefined;
});

test('PROPS: Color overlay', () => {
  const tree = renderer.create(
    <Hero
      source={{uri: imageUrl}}
      renderOverlay={() => overlayTpl}
      colorOverlay={'red'}
      colorOpacity={.40}/>
    ).toJSON();

  const imageParent = tree.children[0];
  const bgImageContent = imageParent.children;

  // The content overlay [0] and the color overlay [1]
  // should exist
  expect(bgImageContent.length).toBe(2);

  const colorOverlay = bgImageContent[1];
  const colorOverlayMainStyle = colorOverlay.props.style[0];
  expect(colorOverlayMainStyle.backgroundColor).toBe('red');
  // Needs to be 100%
  expect(colorOverlayMainStyle.width).toBe('100%');
  // Will inheriet on state change, so must not be defined
  expect(colorOverlayMainStyle.height).toBeUndefined;

  // Needs to be placed on top of content: z-1 + absolute
  expect(colorOverlay.props.style[1].zIndex).toBe(1)
  expect(colorOverlay.props.style[2].position).toBe('absolute')
});


test('PRIVATE FUNC: createPositionStyle should create a style', () => {
  expect(_createPositionStyle(2)).toEqual({
    top: 0,
    zIndex: 2
  });
});


test('SNAPSHOT: All functionality should match prev snapshot', () => {
  const tree = renderer.create(
       <Hero
     source={{uri: imageUrl}}
    renderOverlay={() => <Text>React Native Hero</Text>}
       colorOverlay={'red'}
    colorOpacity={.40}
    fullWidth={false}
    minHeight={1000} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
