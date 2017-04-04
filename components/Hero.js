'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';

export default class Hero extends Component {
  static propTypes = {
    renderOverlay: React.PropTypes.func,
    resizeMode: React.PropTypes.string,
    requireImage: React.PropTypes.bool
  };

  constructor(props) {
    super(props);

    const source = setSource(this.props.requireImage, this.props.source);
    this.state = {
      source,
      opacity: 0,
      height: this.props.height || undefined,
      resizeMode: this.props.resizeMode || 'cover'
    };
  }

  componentWillReceiveProps(nextProps) {
    const source = setSource(this.props.requireImage, this.props.source);
    if (nextProps.source !== this.props.source) {
      this.setState({
        source
      });
    }
  }

  componentDidMount() {
    this.setState({
        opacity: 1
    });
  }

  render() {
    return (
      <View style={{opacity: this.state.opacity}}>
        <Image source={this.state.source} resizeMode={this.state.resizeMode} style={{height: this.state.height, width: '100%'}}>
          <View
            onLayout={(event) => {
              const overlayHeight = event.nativeEvent.layout.height;
              if (!this.props.height) {
                if (overlayHeight !== this.state.height) {
                  this.setState({
                    height: overlayHeight
                  });
                }
              }
            }}
            style={styles.hero__overlay}>
              {this.props.renderOverlay()}
          </View>
        </Image>
      </View>
    )
  }
}

function setSource (required, source) {
  return (!required) ? { uri: source } : source;
}

const styles = StyleSheet.create({
  hero__overlay: {
    backgroundColor: 'transparent'
  }
});
