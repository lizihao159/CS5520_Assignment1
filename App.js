import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const [status, setStatus] = useState("start");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  // Function to handle starting the game
  const startGame = () => {
    setStatus("game");
  }

  // Function to handle valid submission from StartScreen
  const onRegister = (name, email, phone) => {
    setUserInfo({ name, email, phone });
    setModalVisible(true); // Show the confirm modal
  }

  // Function to go back to StartScreen from modal
  const goBackToEdit = () => {
    setModalVisible(false);
  }

  // Confirm and continue to game screen
  const confirmAndContinue = () => {
    setModalVisible(false);
    startGame(); // Proceed to the game screen
  }

  let content = null;

  // Render only the start screen for now
  if (status === 'start') {
    content = <StartScreen onRegister={onRegister} />;
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
          onContinue={confirmAndContinue}
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
