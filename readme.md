# react-native-hero [![Travis](https://img.shields.io/travis/brh55/react-native-hero.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-hero)
> 📷 A super duper hero unit react-native component with support for dynamic images and sizing

Why not just nest it under `<Image>`? Well `react-native-hero` is a flexible abstraction on top of `<Image>Text</Image>`, however it includes a couple of useful things out of the box.
- Dynamic sizing of the background image based on the content, no need to worry about text overflows
- Support for remote images or local image
- Statically defined height of the hero
- Support for color overlay with opacity selection

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
5. Color Overlays? Simple, set `Hero.props.colorOverlay` to a [`react-native` color format](http://facebook.github.io/react-native/releases/0.43/docs/colors.html#colors), and set a desired opacity with `Hero.props.colorOpacity`.
    ```jsx
    render() {
        return (
            <Hero
              source={{uri: 'http://helloworld.com/1.jpeg'}}
              renderOverlay{() => this.overlay(this.props.data)}
              colorOverlay="#000"
              colorOpacity={0.7}/>
        )
    }
    ```

   ![image](https://cloud.githubusercontent.com/assets/6020066/24842132/f06b0b46-1d47-11e7-91d5-ac22aa4243d5.png)

## Component Props
| Props         | Type                                                                           | Description                                                                                                           |
|---------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| source        | string OR module                                                               | A local or remote image, with support for images bundle with require *(must set props.requireImage=true)*. EX: `source='http://logo.jpg'` or `source=require('images/logo.jpg')`
| renderOverlay | func                                                                           | A function that renders the content to be placed on top of the hero unit, and colored overlay (if applicable).        |
| colorOverlay  | [color](http://facebook.github.io/react-native/releases/0.43/docs/colors.html) | A colored overlay sitting below the rendered content overlay. Set the colorOverlay to a color to activate it.         |
| colorOpacity  | num                                                                            | If colorOverlay is set, this sets the level of opacity. `**Default:** .30`                                            |
| requireImage  | bool                                                                           | A boolean indicating if the source needs to be bundled with require.,`**Default:** false`                             |
| minHeight     | num                                                                            | A statically defined height for the hero unit, overrides dynamic sizing based on content.                             |

## Contribute
PR's are welcomed, just abide by rules listed within [contributing.json](http://github.com/brh55/contributing.json).

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-hero)
