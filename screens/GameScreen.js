import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Colors from "../assets/Colors";
import Card from "../components/Card";

const GameScreen = ({ phone, onRestart }) => {
  // Extract last digit from phone number
  const lastDigit = phone[phone.length - 1];

  // Generate possible numbers to guess (multiples of the last digit)
  const possibleNumbers = [];
  for (let i = 1; i <= 100; i++) {
    if (i % lastDigit === 0) {
      possibleNumbers.push(i);
    }
  }

  // State for managing attempts, time, and game status
  const [attempts, setAttempts] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState(null);

  // Start the timer when the game starts
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Clear timer when time runs out
    if (timeLeft <= 0) {
      clearInterval(timer);
      Alert.alert("Time's Up!", "You have no time left.");
    }

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  // Start the game
  const handleStart = () => {
    setGameStarted(true);
  };

  // Handle "Use a Hint"
  const useHint = () => {
    if (!hint) {
      const randomHintIndex = Math.floor(Math.random() * possibleNumbers.length);
      setHint(`The number is ${possibleNumbers[randomHintIndex]}`);
    }
  };

  // Handle Guess Submission
  const submitGuess = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      Alert.alert("Invalid Guess", "Please enter a valid number between 1 and 100.");
      return;
    }

    setAttempts(attempts - 1);
    // Check if attempts run out
    if (attempts - 1 <= 0) {
      Alert.alert("Game Over", "You have no attempts left.");
    }

    // Add logic to check if guess is correct
    // Currently only reduces attempts
  };

  return (
    <View style={styles.screen}>
      {/* Information Card */}
      <Card style={styles.infoCard}>
        <Text style={styles.infoText}>
          Guess a number between 1 & 100 that is a multiple of {lastDigit}
        </Text>

        {gameStarted ? (
          <>
            {/* User's Guess Input */}
            <TextInput
              style={styles.input}
              value={guess}
              onChangeText={(text) => setGuess(text)}
              placeholder="Enter your guess"
              keyboardType="numeric"
            />

            {/* Attempts and Timer */}
            <Text style={styles.infoText}>Attempts left: {attempts}</Text>
            <Text style={styles.infoText}>Timer: {timeLeft}s</Text>

            {/* Buttons for Hint and Submitting Guess */}
            <TouchableOpacity onPress={useHint} style={styles.hintButton}>
              <Text style={styles.hintButtonText}>Use a Hint</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitGuess} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Guess</Text>
            </TouchableOpacity>

            {/* Display Hint if Available */}
            {hint && <Text style={styles.hintText}>{hint}</Text>}
          </>
        ) : (
          <TouchableOpacity onPress={handleStart} style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </Card>

      {/* Restart Button - Positioned above the card */}
      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  restartButton: {
    position: "absolute", // Position it absolutely
    bottom: "80%", // Position it just above the card 
    right: 20, // Align to the right
  },
  restartButtonText: {
    color: Colors.purplefont,
    fontSize: 18,
  },
  infoCard: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(211, 211, 211, 0.8)", // Light transparent grey
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: Colors.purplefont,
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: Colors.purplefont,
    borderBottomWidth: 1,
    marginVertical: 15,
    width: "60%",
    textAlign: "center",
    fontSize: 18,
    color: Colors.purplefont,
  },
  startButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  hintButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  hintButtonText: {
    color: "white",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  hintText: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.redfont,
  },
});

export default GameScreen;
