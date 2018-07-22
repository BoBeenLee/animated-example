import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Carousel from './src/components/AnimatedCarousel';
import Animation from './src/components/Animation';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animation />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
});
