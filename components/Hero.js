'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';

// a -> b
const createPositionStyle = (zIndex=1) => ({
  top: 0,
  zIndex
});

// a -> a
const updateWidthState = (component, window) => {
  if (!component) return;
  component.setState({
    width: window.width
  });
}
// a, b -> b
export default class Hero extends Component {
  static propTypes = {
    renderOverlay: React.PropTypes.func,
    resizeMode: React.PropTypes.string,
    colorOpacity: React.PropTypes.number,
    minHeight: React.PropTypes.number,
    fullWidth: React.PropTypes.bool
  };

  static defaultProps = {
    fullWidth: true
  }

  constructor(props) {
    super(props);

    this.state = {
      source: this.props.source,
      opacity: 0,
      height: this.props.minHeight || undefined,
      resizeMode: this.props.resizeMode || 'cover'
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.source !== this.props.source) {
      this.setState({
        source: this.props.source
      });
    }
  };

  componentDidMount() {
    this.setState({
      opacity: 1
    });
  };

  renderColorOverlay() {
    let overlayStyles = [{
      height: this.state.height,
      width: '100%',
      backgroundColor: this.props.colorOverlay,
      opacity: this.props.colorOpacity || .30
    }, createPositionStyle(1), { position: 'absolute'}];

    return (this.props.colorOverlay) ?
      <View style={overlayStyles}></View> :
      null;
  };

  renderHeroOverlay() {
    const self = this;
    const transparentBg = { backgroundColor: 'transparent' };
    const contentStyles = (this.props.colorOverlay) ?
      [transparentBg, createPositionStyle(2)] :
      transparentBg;

    const updateViewHeight = (event) => {
      const overlayHeight = event.nativeEvent.layout.height;
      const overlayWidth = event.nativeEvent.layout.width;
      if (self.props.minHeight) return;
      if (overlayHeight !== self.state.height) {
        self.setState({
          height: overlayHeight
        });
      }

      // Initial width state set
      if ((this.props.fullWidth === true) && (!self.state.width)) {
        updateWidthState(self, Dimensions.get('window'));
        Dimensions.addEventListener('change', (window, screen) => updateWidthState(self, window));
      }
    };

    return (
      <View
        onLayout={(event) => updateViewHeight(event)}
        style={contentStyles}>
          {this.props.renderOverlay()}
      </View>
    );
  };

  render() {
    return (
      <View style={{opacity: this.state.opacity}}>
        <Image
          source={this.state.source}
          resizeMode={this.state.resizeMode}
          style={{height: this.state.height, width: (this.state.width || '100%') }}>
            {this.renderHeroOverlay()}
            {this.renderColorOverlay()}
        </Image>
      </View>
    )
  };
}
