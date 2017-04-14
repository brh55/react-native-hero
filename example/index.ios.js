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

export default class HeroExample extends Component {
  overlay() {
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold'}}>Welcome to react-native-hero!</Text>
        <Text style={{ fontSize: 14, color: '#27ae60'}}>Simplified Hero Units 🎉!</Text>
      </View>
     )
  }

  render() {
    return (
      <View style={styles.container}>
  	    <Hero
        	source={{ uri: 'https://images.unsplash.com/16/unsplash_5263607dd1bfc_2.jpg' }}
        	renderOverlay={() => this.overlay()}
          fullWidth={false} />
        <Hero
        	source={{ uri: 'https://images.unsplash.com/16/unsplash_5263607dd1bfc_2.jpg' }}
        	renderOverlay={() => this.overlay()}
        	colorOverlay="#16a085"
        	colorOpacity={0.5} />
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
