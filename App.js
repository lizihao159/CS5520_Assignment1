// App.js
import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';
import Colors from './assets/Colors';

export default function App() {
  const [status, setStatus] = useState("start");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  const onRegister = (name, email, phone) => {
    setUserInfo({ name, email, phone });
    setModalVisible(true);
  };

  const startGame = () => {
    setModalVisible(false);
    setStatus("game");
  };

  const restartGame = () => {
    setUserInfo({ name: '', email: '', phone: '' });
    setStatus("start");
  };

  const goBackToEdit = () => {
    setModalVisible(false);
  };

  let content = null;

  if (status === 'start') {
    content = <StartScreen onRegister={onRegister} />;
  } else if (status === 'game') {
    content = <GameScreen phone={userInfo.phone} onRestart={restartGame} />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#a9c9ff', '#92a3fd']}
        style={styles.lineargradient}
      >
        {content}

        <ConfirmScreen
          userInfo={userInfo}
          visible={modalVisible}
          onGoBack={goBackToEdit}
          onContinue={startGame}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineargradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  },
});
