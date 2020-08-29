import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Hello react-native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7159',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default App;
