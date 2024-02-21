/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  VirtualizedList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { playBtn } from '../../../svg/svg-xml-list';
import ImageItem from './components/ImageItem/ImageItem';
import ImageDefaultHeader from './components/ImageDefaultHeader';
import StatusBarManager from './components/StatusBarManager';
import useAnimatedComponents from './hooks/useAnimatedComponents';
import useImageIndexChange from './hooks/useImageIndexChange';
import useRequestClose from './hooks/useRequestClose';
import { Video, ResizeMode } from 'expo-av';
import useAuth from '../../../hooks/useAuth';

const DEFAULT_ANIMATION_TYPE = 'fade';
const DEFAULT_BG_COLOR = '#000';
const DEFAULT_DELAY_LONG_PRESS = 800;
const SCREEN = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN.width;
function ImageViewing({
  images,
  keyExtractor,
  imageIndex,
  visible,
  onRequestClose,
  onLongPress = () => {},
  onImageIndexChange,
  animationType = DEFAULT_ANIMATION_TYPE,
  backgroundColor = DEFAULT_BG_COLOR,
  presentationStyle,
  swipeToCloseEnabled,
  doubleTapToZoomEnabled,
  delayLongPress = DEFAULT_DELAY_LONG_PRESS,
  HeaderComponent,
  FooterComponent,
  isVideoButton,
  onClickPlayButton = () => {},
  videoPosts,
}) {
  const { apiRegion } = useAuth();
  const imageList = useRef(null);
  const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
  const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, SCREEN);
  const [headerTransform, footerTransform, toggleBarsVisible] =
    useAnimatedComponents();
  const videoRef = React.useRef(null);
  useEffect(() => {
    if (onImageIndexChange) {
      onImageIndexChange(currentImageIndex);
    }
  }, [currentImageIndex]);

  const onZoom = useCallback(
    (isScaled) => {
      var _a, _b;
      // @ts-ignore
      (_b =
        (_a = imageList) === null || _a === void 0 ? void 0 : _a.current) ===
        null || _b === void 0
        ? void 0
        : _b.setNativeProps({ scrollEnabled: !isScaled });
      toggleBarsVisible(!isScaled);
    },
    [imageList]
  );
  const playVideoFullScreen = async () => {
    onClickPlayButton(currentImageIndex);
    if (videoRef) {
      await videoRef.current.loadAsync({
        uri: `https://api.${apiRegion}.amity.co/api/v3/files/${videoPosts[currentImageIndex]?.videoFileId?.original}/download`,
      });

      await videoRef.current.presentFullscreenPlayer();
      await videoRef.current.playAsync();
    }
  };
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={presentationStyle === 'overFullScreen'}
      visible={visible}
      presentationStyle={presentationStyle}
      animationType={animationType}
      onRequestClose={onRequestCloseEnhanced}
      supportedOrientations={['portrait']}
      hardwareAccelerated
    >
      <StatusBarManager presentationStyle={presentationStyle} />
      <View style={[styles.container, { opacity, backgroundColor }]}>
        <Animated.View style={[styles.header, { transform: headerTransform }]}>
          {typeof HeaderComponent !== 'undefined' ? (
            React.createElement(HeaderComponent, {
              imageIndex: currentImageIndex,
            })
          ) : (
            <ImageDefaultHeader onRequestClose={onRequestCloseEnhanced} />
          )}
        </Animated.View>
        <VirtualizedList
          ref={imageList}
          data={images}
          horizontal
          pagingEnabled
          windowSize={2}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={imageIndex}
          getItem={(_, index) => images[index]}
          getItemCount={() => images.length}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          renderItem={({ item: imageSrc }) => (
            <View>
              {/* Your overlay content */}

              <ImageItem
                onZoom={onZoom}
                imageSrc={imageSrc}
                onRequestClose={onRequestCloseEnhanced}
                onLongPress={onLongPress}
                delayLongPress={delayLongPress}
                swipeToCloseEnabled={swipeToCloseEnabled}
                doubleTapToZoomEnabled={doubleTapToZoomEnabled}
              />
              {isVideoButton && (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={playVideoFullScreen}
                >
                  <SvgXml xml={playBtn} width="50" height="50" />
                </TouchableOpacity>
              )}
            </View>
          )}
          onMomentumScrollEnd={onScroll}
          //@ts-ignore
          keyExtractor={(imageSrc, index) =>
            keyExtractor
              ? keyExtractor(imageSrc, index)
              : typeof imageSrc === 'number'
              ? `${imageSrc}`
              : imageSrc.uri
          }
        />
        {typeof FooterComponent !== 'undefined' && (
          <Animated.View
            style={[styles.footer, { transform: footerTransform }]}
          >
            {React.createElement(FooterComponent, {
              imageIndex: currentImageIndex,
            })}
          </Animated.View>
        )}
      </View>
      <View style={styles.videoContainer}>
        <Video ref={videoRef} resizeMode={ResizeMode.CONTAIN} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 0,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: 0,
  },
  playButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  playButtonImage: {
    width: 50,
    height: 50,
  },
  videoContainer: {
    display: 'none',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});
const EnhancedImageViewing = (props) => (
  <ImageViewing key={props.imageIndex} {...props} />
);
export default EnhancedImageViewing;