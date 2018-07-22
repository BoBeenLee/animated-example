
import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Text = styled.Text``;

const Wrapper = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction:row;
    width: 100%;
    height: 40px;
    margin-top: 10px;
`;

const TouchView = styled.TouchableWithoutFeedback`
    flex: 1;
   justify-content: flex-start;
    align-items: flex-start;
`;

const SquareView = styled(Animated.View)`
    margin-top: 10px;
    width: 30px;
    height: 30px;
    background-color: green;
`;

const AbsoluteSquareView = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background-color: green;
`;

const Button = styled.Button``;


class Animation extends Component {

    state = {
        anim1: new Animated.Value(0),
        anim2: new Animated.Value(1),
        anim3: new Animated.Value(1),
        anim4: new Animated.Value(1),
        anim5: new Animated.Value(1),
        anim61: new Animated.Value(0),
        anim62: new Animated.Value(0),
        anim63: new Animated.Value(0),
    }

    componentDidMount() {
        const { anim61, anim62, anim63 } = this.state;
        Animated.spring(anim61, { toValue: anim62 }).start();
        Animated.spring(anim62, { toValue: anim63 }).start();
    }

    render() {
        return (
            <Container>
                {/* Animated.timing */}
                <TouchView onPress={this.animate1}>
                    <SquareView style={{
                        marginLeft: this.state.anim1
                    }} />
                </TouchView>
                {/* Interrupt Animations */}
                <TouchView
                    onPressIn={this.animate2In}
                    onPressOut={this.animate2Out}>
                    <SquareView style={{ transform: [{ scale: this.state.anim2 }], alignSelf: "center" }} />
                </TouchView>
                {/* Animated.spring */}
                <TouchView
                    onPressIn={this.animate3In}
                    onPressOut={this.animate3Out}>
                    <SquareView style={{ transform: [{ scale: this.state.anim3 }], alignSelf: "center" }} />
                </TouchView>
                {/* interpolate */}
                <TouchView
                    onPressIn={this.animate4In}
                    onPressOut={this.animate4Out}>
                    <SquareView style={{
                        alignSelf: "center",
                        transform: [{ scale: this.state.anim4 }],
                        opacity: this.state.anim4.interpolate({
                            inputRange: [1, 2],
                            outputRange: [1, 0]
                        }),
                    }} />
                </TouchView>
                {/* stopAnimation */}
                <Wrapper>
                    <Button title="left" onPress={this.animate5left} />
                    <SquareView style={{
                        transform: [
                            {
                                rotate: this.state.anim5.interpolate({
                                    inputRange: [0, 4],
                                    outputRange: ['0deg', '360deg']
                                })
                            },
                        ]
                    }} />
                    <Button title="right" onPress={this.animate5right} />
                </Wrapper>
                {/* Animated.chaining */}
                <Wrapper>
                    <AbsoluteSquareView style={{
                        left: this.state.anim61
                    }} />
                    <AbsoluteSquareView style={{
                        left: this.state.anim62
                    }} />
                    <TouchView onPress={this.animate6}>
                        <SquareView style={{ position: "absolute", left: this.state.anim63, top: 0 }} />
                    </TouchView>
                </Wrapper>
            </Container>
        );
    }

    animate1 = () => {
        Animated.timing(this.state.anim1, { toValue: 400 }).start();
    };

    animate2In = () => {
        Animated.timing(this.state.anim2, { toValue: 0.8 }).start();
    };

    animate2Out = () => {
        Animated.timing(this.state.anim2, { toValue: 1 }).start();
    };

    animate3In = () => {
        Animated.spring(this.state.anim3, { toValue: 0.8 }).start();
    };

    animate3Out = () => {
        Animated.spring(this.state.anim3, { toValue: 1 }).start();
    };

    animate4In = () => {
        Animated.spring(this.state.anim4, { toValue: 2 }).start();
    };

    animate4Out = () => {
        Animated.spring(this.state.anim4, { toValue: 1 }).start();
    };

    animate5left = () => {
        this.state.anim5.stopAnimation(value => {
            Animated.spring(this.state.anim5, {
                toValue: Math.round(value) - 1
            }).start();
        });
    };

    animate5right = () => {
        this.state.anim5.stopAnimation(value => {
            Animated.spring(this.state.anim5, {
                toValue: Math.round(value) + 1
            }).start();
        });
    };

    animate6 = () => {
        Animated.spring(this.state.anim63, { toValue: 200 }).start();
    };
}

export default Animation;
