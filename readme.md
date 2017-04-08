# react-native-hero [![Travis](https://img.shields.io/travis/brh55/react-native-Hero.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-Hero)
> 📷 A super duper hero unit react-native component with support for dynamic images and sizing

Why not just nest it under `<Image>`? Well `react-native-hero` is purely an abstraction on top of `<Image>Text</Image>`, however it includes a couple of useful things out of the box.
- Dynamic sizing of the background image based on the content, no need to worry about text overflows
- Support for remote images or local image
- Statically defined height of the hero

![image](https://cloud.githubusercontent.com/assets/6020066/24824103/0f759968-1bbb-11e7-895f-ab4ac50dbcd4.png)

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
    ```jsx
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
4. Blurred backgrounds? Simple, import [`react-native-blur`](https://github.com/react-native-community/react-native-blur) and you are good to go.
   ```jsx
   overlay() {
       return (
           <BlurView blurType="light" blurAmount={10}>
               <Text style={style.type.h1}>Henry's Harry Beard</Text>
               <Text style={style.type.h2}>The finest gear for a fellow hipster</Text>
           </BlurView>
    ```
    
## Prop Types
### source
#### Type: `string` or `module`
A local or remote image, with support for images bundle with require *(must set props.requireImage=true)*.
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
