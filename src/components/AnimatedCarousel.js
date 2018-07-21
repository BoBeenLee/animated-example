import _ from 'lodash';
import { Animated, View, StyleSheet, Text, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';


const styles = StyleSheet.create({
    slide: {
        backgroundColor: "blue"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    title: {
        color: "#fff"
    },
})

class AnimatedCarousel extends Component {
    state = {
        currentIndex: 0,
        scrollX: new Animated.Value(50),
        entries: [{ title: "1", bgColor: "green", height: 50 }, { title: "2", bgColor: "blue", height: 200 }, { title: "3", bgColor: "yellow", height: 300 }]
    }
    constructor(props) {
        super(props);
        this.debounceScroll = this.debounceScroll;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    slideInterpolatedStyle={this._animatedStyles}
                    containerCustomStyle={{ height: 300 }}
                    slideStyle={{ height: 300 }}
                    useScrollView={true}
                    onSnapToItem={this._snapToItem}
                    onScroll={this.debounceScroll}
                />
                <Animated.View style={{ position: "absolute", top: this.state.entries[this.state.currentIndex].height, left: 0, width: "100%", height: "100%", backgroundColor: "blue",  ...(this._translateYForView()) }} />
            </View>
        );
    }
    
    _renderItem({ item, index }) {
        return (
            <View style={[styles.slide, { backgroundColor: item.bgColor, height: item.height }]}>
                <Image style={styles.image} source={{ uri: "https://picsum.photos/200/300/?random" }} />
            </View>
        );
    }

    _translateYForView = () => {
        return {
            transform: [{
                translateY: this.state.scrollX
            }]
        };
    }

    _snapToItem = (index) => {
        this.setState({
            currentIndex: index
        });
    }

    _animatedStyles = (index, animatedValue, carouselProps) => {
        return {};
    }

    debounceScroll = (e) => {
        const { currentIndex, entries } = this.state;
        if (!entries[currentIndex + 1]) {
            this.state.scrollX.setValue(0);
            return;
        }
        const height = entries[currentIndex + 1].height - entries[currentIndex].height;
        const ratio = (e.nativeEvent.contentOffset.x - (300 * currentIndex)) / 300;

        console.log(ratio * height);
        this.state.scrollX.setValue(ratio * height);
    }
}

export default AnimatedCarousel;
