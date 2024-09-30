// GameScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import Colors from "../assets/Colors";
import Card from "../components/Card";
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import TitleText from '../components/TitleText';

const GameScreen = ({ phone, onRestart }) => {
  const lastDigit = phone[phone.length - 1];
  const possibleNumbers = [];
  for (let i = 1; i <= 100; i++) {
    if (i % lastDigit === 0) {
      possibleNumbers.push(i);
    }
  }

  const [chosenNumber, setChosenNumber] = useState(
    possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]
  );

  const [attempts, setAttempts] = useState(4);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");

  // Timer logic
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !isCorrect && attempts > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || attempts === 0) {
      setGameOver(true);
      setGameOverReason(timeLeft === 0 ? "You are out of time" : "You are out of attempts");
    }
  }, [timeLeft, gameStarted, isCorrect, attempts]);

  const handleStart = () => {
    setGameStarted(true);
  };

  // Updated hint logic
  const useHint = () => {
    if (!hint) {
      if (chosenNumber <= 50) {
        setHint(`The correct number is between 0 and 50`);
      } else {
        setHint(`The correct number is between 50 and 100`);
      }
    }
  };

  const submitGuess = () => {
    const numericGuess = parseInt(guess);
    if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
      Alert.alert("Invalid Guess", "Please enter a number between 1 and 100.");
      return;
    }

    setAttempts(attempts - 1);
    setAttemptsUsed(attemptsUsed + 1);

    if (numericGuess === chosenNumber) {
      setIsCorrect(true);
    } else {
      setFeedback(numericGuess > chosenNumber ? "You should guess lower." : "You should guess higher.");
      setShowFeedback(true);
    }

    if (attempts - 1 === 0 && numericGuess !== chosenNumber) {
      setGameOver(true);
      setGameOverReason("You are out of attempts");
    }

    setGuess("");
  };

  const tryAgain = () => {
    setShowFeedback(false);
  };

  const startNewGame = () => {
    setGameOver(false);
    setAttempts(4);
    setAttemptsUsed(0); // Reset attemptsUsed to 0 for the new game
    setTimeLeft(60);
    setGameStarted(false);
    setShowFeedback(false);
    setIsCorrect(false);
    setHint(null);
    setChosenNumber(possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]);
  };

  return (
    <View style={styles.screen}>
      {/* Restart Button */}
      <CustomButton
        title="Restart"
        onPress={onRestart}
        style={{ position: "absolute", top: 100, right: 20 }} // Adjusted position
      />

      {gameOver ? (
        // Game Over Card
        <Card style={styles.summaryCard}>
          <TitleText>The game is over!</TitleText>
          <Image
            source={require("../assets/SadFace.png")} 
            style={styles.image}
          />
          <Text style={styles.infoText}>{gameOverReason}</Text>
          <CustomButton title="New Game" onPress={startNewGame} />
        </Card>
      ) : isCorrect ? (
        // Summary Card
        <Card style={styles.summaryCard}>
          <Text style={styles.infoText}>You guessed correct!</Text> 
          <Text style={styles.infoText}>Attempts used: {attemptsUsed}</Text>
          <Image source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }} style={styles.image} />
          <TouchableOpacity onPress={startNewGame} style={styles.newGameButton}>
            <Text style={styles.newGameButtonText}>New Game</Text>
          </TouchableOpacity>
        </Card>
      ) : showFeedback ? (
        // Feedback Card
        <Card style={styles.feedbackCard}>
          <Text style={styles.infoText}>You did not guess correctly!</Text>
          <Text style={styles.infoText}>{feedback}</Text>
          <CustomButton title="Try Again" onPress={tryAgain} />
          <CustomButton
            title="End the game"
            onPress={() => setGameOver(true)}
            style={{ backgroundColor: Colors.redfont }}
          />
        </Card>
      ) : (
        // Main Guessing Card
        <Card style={styles.infoCard}>
          <TitleText>
            Guess a number between 1 & 100 that is a multiple of {lastDigit}
          </TitleText>

          {gameStarted ? (
            <>
              <CustomTextInput
                value={guess}
                onChangeText={(text) => setGuess(text)}
                placeholder="Enter your guess"
                keyboardType="numeric"
              />
              <Text style={styles.infoText}>Attempts left: {attempts}</Text>
              <Text style={styles.infoText}>Timer: {timeLeft}s</Text>

              <CustomButton title="Use a Hint" onPress={useHint} />
              <CustomButton title="Submit Guess" onPress={submitGuess} />

              {hint && <Text style={styles.hintText}>{hint}</Text>}
            </>
          ) : (
            <CustomButton title="Start" onPress={handleStart} />
          )}
        </Card>
      )}
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
  infoCard: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(211, 211, 211, 0.8)",
    alignItems: "center",
  },
  feedbackCard: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(211, 211, 211, 0.8)",
    alignItems: "center",
  },
  summaryCard: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(211, 211, 211, 0.8)",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: Colors.purplefont,
    marginVertical: 10,
    textAlign: "center",
  },
  image: {
    marginVertical: 15,
    width: 100,
    height: 100,
  },
  hintText: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.redfont,
  },
  newGameButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  newGameButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default GameScreen;
