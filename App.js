import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';

import StartScreen from './screens/StartScreen';

export default function App() {
  const [status, setStatus] = useState("start");

  const startGame = () => {
    console.log('Game Started!');
  }

  let content = null;

  if (status === 'start') {
    content = <StartScreen startgame={startGame} />;
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffccff', // You can set a background color here
  },
});
