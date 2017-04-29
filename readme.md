# react-native-hero [![Travis](https://img.shields.io/travis/brh55/react-native-hero.svg?style=flat-square)](https://travis-ci.org/brh55/react-native-hero) [![David](https://img.shields.io/david/dev/brh55/react-native-hero.svg?style=flat-square)](https://david-dm.org/brh55/react-native-hero?type=dev) [![npm](https://img.shields.io/npm/dt/react-native-hero.svg?style=flat-square)](https://www.npmjs.com/package/react-native-hero)
> :metal: A super duper hero unit react-native component with support for dynamic image, dynamic sizing, color overlays, and more.

<p align="center">
    <img src ="https://cloud.githubusercontent.com/assets/6020066/24824103/0f759968-1bbb-11e7-895f-ab4ac50dbcd4.png" />
</p>


Why not just nest it under `<Image>`? Well `react-native-hero` is a flexible abstraction on top of `<Image>Text</Image>`, however it includes a couple of useful things out of the box.
- Dynamic sizing of the background image based on the content, no need to worry about text overflows
- Full width sizing by device width, while supporting device rotation
- Support for remote images or local image
- Statically defined height of the hero
- Support for color overlay with opacity selection

## Basic Usage
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
    render() {
        return (
            <Hero
              source={{uri: 'http://helloworld.com/1.jpeg'}}
              renderOverlay{() => (
                <View>
                    <Text>React Native Hero!</Text>
                    <Text>Is super duper, cool!</Text>
                </View>
              )} />
        )
    }
    ```
4. Want more examples or a better demo? Take a look at the [example app](/tree/master/example).

## Advance Usage
### Blurred backgrounds
![image](https://cloud.githubusercontent.com/assets/6020066/24872727/3eaa2284-1dd3-11e7-94b4-1a63cb98b2ac.png)

Import [`react-native-blur`](https://github.com/react-native-community/react-native-blur) and add it to your overlay.
```jsx
// Assuming props.renderOverlay renders with overlay()
overlay() {
   return (
       <BlurView blurType="light" blurAmount={10}>
           <Text style={style.type.h1}>Henry's Harry Beard</Text>
           <Text style={style.type.h2}>The finest gear for a fellow hipster</Text>
       </BlurView>
    )
}
```


### Color Overlays
![image](https://cloud.githubusercontent.com/assets/6020066/24842132/f06b0b46-1d47-11e7-91d5-ac22aa4243d5.png)

Set `Hero.props.colorOverlay` to a [`react-native` color format](http://facebook.github.io/react-native/releases/0.43/docs/colors.html#colors), and set a desired opacity with `Hero.props.colorOpacity`.

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

## Component Props
| Props         | Type                                                                           | Description                                                                                                           |
|---------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| source        | object or module                                                               | A local or remote image, with support for images bundled with require. **EX:** `source={{ uri: 'http://logo.jpg' }}` or `source=require('images/logo.jpg')`
| renderOverlay | func                                                                           | A function that renders the content to be placed on top of the hero unit, and colored overlay (if applicable).        |
| colorOverlay  | [color](http://facebook.github.io/react-native/releases/0.43/docs/colors.html) | A colored overlay sitting below the rendered content overlay. Set the colorOverlay to a color to activate it.         |
| colorOpacity  | num                                                                            | If colorOverlay is set, this sets the level of opacity. **Default: .30**                                            |
| fullWidth  | bool                                                                           | A boolean indicating if the hero unit should be sized the full width of the device. Setting to false will size it according to the contents size.**Default: true**                             |
| minHeight     | num                                                                            | A statically defined height for the hero unit, overrides dynamic sizing based on content.                             |

## Contribute
PR's are welcomed and desired, just abide by rules listed within :squirrel: [contributing.json](http://github.com/brh55/contributing.json). 

### Beginners
Not sure where to start, or a beginner? No problemo! Take a look at the [issues page](https://github.com/brh55/react-native-hero/issues) for `low-hanging` or `beginner-friendly` labels as an easy ways to start contributing.

## License
MIT © [Brandon Him](https://github.com/brh55/react-native-hero)
