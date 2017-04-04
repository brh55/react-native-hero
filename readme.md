# react-native-hero [![Travis](https://img.shields.io/travis/brh55/react-native-Hero.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-Hero)
> 📷 A super duper hero unit react-native component with support for dynamic images and sizing

Supports:
- Dynamic or static sizing of hero container
- Network or local images

![screen-shot-2017-03-31-at-11-3](https://cloud.githubusercontent.com/assets/6020066/24564115/a48c07a0-1605-11e7-964d-2293a4b72ee6.png)

## Usage
1. Install the repository
    ```bash
    $ npm install --save react-native-hero
    ```
2. Add an import to the top of your file
    ```js
    import Hero from 'react-native-hero';
    ```
3. Declare the component in the render method of your component
    ```js
    overlay() {
        return (
            <Text>Enjoy!</Text>
        )
    }

    render() {
        return (
            <Hero
              source={{uri: 'http://helloworld.com/1.jpeg'}}
              renderOverlay{() => this.overlay(this.props.data)}/>
        )
    }
    ```

## Prop Types
### source
#### Type: `string` or `module`
A local or remote image, with support for images bundle with require (must set props.requireImage=true).
EX: `<Hero source={{uri: 'remotelocation'}}>` or `<Hero source={require('images/image1')} requireImage={true}`>

### renderOverlay
#### Type: `func`

An overlay function that renders additional components to serve as the content of the hero unit.

### requireImage
#### Type: `bool`
#### Default: `false`

A boolean to indicate if the source needs to be bundled with require

### height
#### Type: `num`

A statically defined height for the hero unit, overrides dynamic sizing based on content.

## Contribute
PR's are welcomed, just abide by rules listed within [contributing.json](http://github.com/brh55/contributing.json).

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-hero)
