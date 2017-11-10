import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Injector from 'react-native-injectable-component';

// _createPositionStyle :: Number -> Object
export const _createPositionStyle = (zIndex=1) => ({
  top: 0,
  zIndex
});

// updateWidthState :: Component, Window -> _
const updateWidthState = (component, window) => {
  if (!component) return;

  component.setState({
    width: window.width
  });
}

export default class Hero extends Component {
  static propTypes = {
    renderOverlay: PropTypes.func,
    resizeMode: PropTypes.string,
    colorOpacity: PropTypes.number,
    minHeight: PropTypes.number,
    fullWidth: PropTypes.bool,
    customImageComponent: PropTypes.func,
    customImageProps: PropTypes.object
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
      backgroundColor: this.props.colorOverlay || 'transparent',
      opacity: this.props.colorOpacity || .30
    }, _createPositionStyle(1), { position: 'absolute'}];

    return (this.props.colorOverlay) ?
      <View style={overlayStyles}></View> :
      null;
  };

  renderHeroOverlay() {
    const self = this;
    const transparentBg = { backgroundColor: 'transparent' };
    const contentStyles = (this.props.colorOverlay) ?
      [transparentBg, _createPositionStyle(2)] :
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
        // This requires RN ^0.43 + React ^16, may consider alternative updating method for better
        // backwards compatability
        Dimensions.addEventListener('change', (window) => updateWidthState(self, window));
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
      const imageProps = {
        source: this.state.source,
        resizeMode: this.state.resizeMode,
        style: {
          height: this.state.height,
          width: (this.state.width || '100%')
        }
      };

    return (
      <View style={{opacity: this.state.opacity}}>
        <Injector
          defaultComponent={Image}
          defaultProps={imageProps}
          injectant={this.props.customImageComponent}
          injectantProps={this.props.customImageProps}>
            {this.renderHeroOverlay()}
            {this.renderColorOverlay()}
        </Injector>
      </View>
    )
  };
}
