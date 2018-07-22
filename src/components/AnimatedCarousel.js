import { Animated, Dimensions, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, { Component } from 'react';


const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    slide: {
        backgroundColor: "blue"
    },
    title: {
        color: "#fff"
    },
})

class AnimatedCarousel extends Component {
    state = {
        currentIndex: 0,
        scrollX: new Animated.Value(0),
        entries: [{ title: "1", bgColor: "green", height: 50 }, { title: "2", bgColor: "blue", height: 200 }, { title: "3", bgColor: "yellow", height: 300 }]
    }
    constructor(props) {
        super(props);
        this.debounceScroll = this.debounceScroll;
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: "#eee" }}>
                <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 300 }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={windowWidth}
                        itemWidth={windowWidth}
                        slideInterpolatedStyle={this._animatedStyles}
                        containerCustomStyle={{ flex: 1 }}
                        slideStyle={{ flex: 1 }}
                        useScrollView={true}
                        onSnapToItem={this._snapToItem}
                        onScroll={this.debounceScroll}
                    />
                </View>
                <Animated.View style={{ flex: 1, marginTop: this.state.scrollX, backgroundColor: "blue" }}>
                    <Text>
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                        loremloremloremloremloremloremloremloremloremlorem
                    </Text>
                </Animated.View>
            </ScrollView>
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

    _animatedStyles = () => {
        // NOTHING
        return {};
    }

    debounceScroll = (e) => {
        const { currentIndex } = this.state;
        if (300 * currentIndex > e.nativeEvent.contentOffset.x) {
            this.decreaseScroll(e);
            return;
        }
        this.increaseScroll(e);

    }

    decreaseScroll = (e) => {
        const { currentIndex, entries } = this.state;
        if (!entries[currentIndex - 1]) {
            this.state.scrollX.setValue(entries[currentIndex].height);
            return;
        }
        const height = entries[currentIndex].height - entries[currentIndex - 1].height;
        const ratio = (e.nativeEvent.contentOffset.x - (300 * currentIndex)) / 300;
        this.state.scrollX.setValue(ratio * height + entries[currentIndex].height);
    }

    increaseScroll = (e) => {
        const { currentIndex, entries } = this.state;
        if (!entries[currentIndex + 1]) {
            this.state.scrollX.setValue(entries[currentIndex].height);
            return;
        }
        const height = entries[currentIndex + 1].height - entries[currentIndex].height;
        const ratio = (e.nativeEvent.contentOffset.x - (300 * currentIndex)) / 300;
        this.state.scrollX.setValue(ratio * height + entries[currentIndex].height);
    };
}

export default AnimatedCarousel;
