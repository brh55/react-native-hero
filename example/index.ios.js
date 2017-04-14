/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Hero from 'react-native-hero';
const { VibrancyView } = require('react-native-blur');

export default class HeroExample extends Component {
  overlay() {
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold'}}>Welcome to react-native-hero!</Text>
        <Text style={{ fontSize: 14, color: '#27ae60'}}>Simplified Hero Units 🎉!</Text>
      </View>
     )
  }

  blurOverlay() {
    return (
      <VibrancyView blurType='light' blur={10} style={{ padding: 30 }}>
        <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold'}}>Welcome to react-native-hero!</Text>
        <Text style={{ fontSize: 14, color: '#27ae60'}}>Simplified Hero Units 🎉!</Text>
      </VibrancyView>
     )
  }

  render() {
    return (
      <View style={styles.container}>
  	    <Hero
        	source={{ uri: 'https://s-media-cache-ak0.pinimg.com/736x/8e/f6/30/8ef6306bf7c3749768dbc8df038c414c.jpg' }}
        	renderOverlay={() => this.overlay()}
          fullWidth={false} />
        <Hero
        	source={{ uri: 'https://images.unsplash.com/16/unsplash_5263607dd1bfc_2.jpg' }}
        	renderOverlay={() => this.overlay()}
        	colorOverlay="#16a085"
        	colorOpacity={0.5} />
        <Hero
        	source={{ uri: 'https://images.unsplash.com/16/unsplash_5263607dd1bfc_2.jpg' }}
        	renderOverlay={() => this.blurOverlay()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
});

AppRegistry.registerComponent('HeroExample', () => HeroExample);
