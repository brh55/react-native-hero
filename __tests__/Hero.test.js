import { Text, View } from 'react-native';
import React from 'react';
import Hero, { _createPositionStyle } from '../components/Hero';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const imageUrl = 'https://catsarethebest.com/cat1';
const overlayTpl = (
	<View>
      <Text>React Native Hero</Text>
      <Text>Testing!</Text>
    </View>
);


const helpers = {
	getHeroContent: tree => tree.children[0].children[0],
	getHeroImage: tree => tree.children[1],
	overlay: {
		getOverlay: tree => tree.children[0],
		getHeroImage: tree => tree.children[2],
		getHeroContent: tree => tree.children[1].children[0]
	}
};

test('MAIN: Render correctly and overlay contains correct content', () => {
	// Tree Render ----
	// <View>
	//    <ContentOverlay />
	//    <SwappableImageComponent />
	// </View>
	const tree = renderer.create(
		<Hero
		  source={{uri: imageUrl}}
		  renderOverlay={() => overlayTpl} />
	).toJSON();

	// Contains only the overlay and the image
	const wrapper = tree.children;
	expect(wrapper.length).toEqual(2);

	const contentWrapper = tree.children[0];
	expect(contentWrapper.props.style[1].zIndex).toEqual(2);
	expect(contentWrapper.props.style[1].position).toEqual("absolute");

	const heroContent = helpers.getHeroContent(tree);
	// Text elements of the view
	// 	<View>
    //    <Text>React Native Hero</Text>
    //    <Text>Testing!</Text>
    // </View>
	expect(heroContent.type).toBe('View');
	expect(heroContent.children.length).toBe(2);
	expect(heroContent.children[0].type).toEqual("Text");

	const heroImage = helpers.getHeroImage(tree);
	expect(heroImage.type).toEqual("Image");
	expect(heroImage.props.source).toEqual({ uri: imageUrl });
	expect(heroImage.props.style.width).toBe('100%');
});

test('MAIN: Render with a static image', () => {
	const tree = renderer.create(
		<Hero
		  source={require('./__assets__/lion-sample.jpg')}
		  renderOverlay={() => overlayTpl} />
	).toJSON();

	const imageParent = helpers.getHeroImage(tree);
	expect(imageParent.type).toBe('Image');
	expect(imageParent.props.source.testUri).toEqual('../../../__tests__/__assets__/lion-sample.jpg');
});

test('PROPS: Props.minHeight should override the height', () => {
	const tree = renderer.create(
		<Hero
		  source={{uri: imageUrl}}
		  renderOverlay={() => overlayTpl}
		  minHeight={1000} />
    ).toJSON();

	const imageParent = helpers.getHeroImage(tree);
	expect(imageParent.props.style.height).toBe(1000)
});

test('PROPS: Props.fullWidth should default to state updates', () => {
	const tree = renderer.create(
		<Hero
		  source={{uri: imageUrl}}
		  renderOverlay={() => overlayTpl}
		  fullWidth={false} />
    ).toJSON();

	const imageParent = helpers.getHeroImage(tree);
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

	const imageParent = helpers.overlay.getHeroImage(tree);
	const bgImageContent = helpers.overlay.getHeroContent(tree);

	const colorOverlay = helpers.overlay.getOverlay(tree);
	const colorOverlayMainStyle = colorOverlay.props.style[0];
	expect(colorOverlayMainStyle.backgroundColor).toBe('red');
	// Needs to be 100%
	expect(colorOverlayMainStyle.width).toBe('100%');
	// Will inheriet on state change, so must not be defined
	expect(colorOverlayMainStyle.height).toBeUndefined;

	// Needs to be placed on top of content: z-1 + absolute
	expect(colorOverlay.props.style[1].zIndex).toBe(1)
	expect(colorOverlay.props.style[1].position).toBe('absolute')
});


test('PRIVATE FUNC: createPositionStyle should create a style', () => {
	expect(_createPositionStyle(2)).toEqual({
		top: 0,
		zIndex: 2,
		left: 0,
		position: 'absolute'
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
