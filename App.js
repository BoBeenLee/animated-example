import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Carousel from './src/components/AnimatedCarousel';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Carousel />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
