import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';
import Colors from './assets/Colors';

export default function App() {
  // State to track the current screen
  const [status, setStatus] = useState("start");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  // Function to handle valid submission from StartScreen
  const onRegister = (name, email, phone) => {
    setUserInfo({ name, email, phone });
    setModalVisible(true); // Show the confirm modal
  };

  // Function to handle navigating to the Game screen
  const startGame = () => {
    setModalVisible(false);
    setStatus("game");
  };

  // Function to reset all user data and navigate back to StartScreen
  const restartGame = () => {
    setUserInfo({ name: '', email: '', phone: '' });
    setStatus("start");
  };

  // Function to go back to StartScreen from modal
  const goBackToEdit = () => {
    setModalVisible(false);
  };

  let content = null;

  // Screen Logic
  if (status === 'start') {
    content = <StartScreen onRegister={onRegister} />;
  } else if (status === 'game') {
    content = <GameScreen phone={userInfo.phone} onRestart={restartGame} />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#a9c9ff', '#92a3fd']} // Blue gradient
        style={styles.lineargradient}
      >
        {content}

        {/* Confirm Modal as a Separate Component */}
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

