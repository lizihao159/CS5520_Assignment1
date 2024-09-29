import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import Colors from "../assets/Colors";
import Card from "../components/Card";

const GameScreen = ({ phone, onRestart }) => {
  const lastDigit = phone[phone.length - 1];

  // Generate possible numbers to guess (multiples of the last digit)
  const possibleNumbers = [];
  for (let i = 1; i <= 100; i++) {
    if (i % lastDigit === 0) {
      possibleNumbers.push(i);
    }
  }

  const [chosenNumber, setChosenNumber] = useState(
    possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]
  );

  // State variables
  const [attempts, setAttempts] = useState(4);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Timer logic
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
  };

  // Use a hint
  const useHint = () => {
    if (!hint) {
      // Calculate a larger range for the hint (30 interval)
      const lowerBound = Math.max(1, chosenNumber - 15); // At least 1
      const upperBound = Math.min(100, chosenNumber + 15); // At most 100
      setHint(`The correct number is between ${lowerBound} and ${upperBound}`);
    }
  };

  const submitGuess = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      Alert.alert('Invalid Input', 'Please enter a valid number between 1 and 100.');
      return;
    }
    
    setAttempts(attempts - 1);
    setAttemptsUsed(attemptsUsed + 1);

    if (parsedGuess === chosenNumber) {
      setIsCorrect(true);
      setShowFeedback(false);
    } else {
      setFeedback(parsedGuess > chosenNumber ? "You should guess lower." : "You should guess higher.");
      setShowFeedback(true);
      setGuess("");
    }
  };

  const tryAgain = () => {
    setShowFeedback(false);
    setGuess("");
  };

  const startNewGame = () => {
    const newNumber = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)];
    setChosenNumber(newNumber);
    setAttempts(4);
    setAttemptsUsed(0);
    setTimeLeft(60);
    setGameStarted(false);
    setIsCorrect(false);
    setGuess("");
    setHint(null);
    setFeedback("");
    setShowFeedback(false);
  };

  return (
    <View style={styles.screen}>
      {/* Restart Button */}
      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>

      {isCorrect ? (
        // Summary Card
        <Card style={styles.summaryCard}>
          <Text style={styles.infoText}>You guessed correct!</Text>
          <Text style={styles.infoText}>Attempts used: {attemptsUsed}</Text>
          <Image
            source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
            style={styles.image}
          />
          <TouchableOpacity onPress={startNewGame} style={styles.newGameButton}>
            <Text style={styles.newGameButtonText}>New Game</Text>
          </TouchableOpacity>
        </Card>
      ) : showFeedback ? (
        // Feedback Card
        <Card style={styles.feedbackCard}>
          <Text style={styles.infoText}>You did not guess correctly!</Text>
          <Text style={styles.infoText}>{feedback}</Text>
          <TouchableOpacity onPress={tryAgain} style={styles.tryAgainButton}>
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Game Over", "Ending the game.")} style={styles.endGameButton}>
            <Text style={styles.endGameButtonText}>End the game</Text>
          </TouchableOpacity>
        </Card>
      ) : (
        // Main Guessing Card
        <Card style={styles.infoCard}>
          <Text style={styles.infoText}>
            Guess a number between 1 & 100 that is a multiple of {lastDigit}
          </Text>

          {gameStarted ? (
            <>
              <TextInput
                style={styles.input}
                value={guess}
                onChangeText={(text) => setGuess(text)}
                placeholder="Enter your guess"
                keyboardType="numeric"
                placeholderTextColor="#B0C4DE"
              />
              <Text style={styles.infoText}>Attempts left: {attempts}</Text>
              <Text style={styles.infoText}>Timer: {timeLeft}s</Text>

              {/* Hint Button */}
              <TouchableOpacity onPress={useHint} style={styles.hintButton}>
                <Text style={styles.hintButtonText}>Use a Hint</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={submitGuess} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Guess</Text>
              </TouchableOpacity>

              {hint && <Text style={styles.hintText}>{hint}</Text>}
            </>
          ) : (
            <TouchableOpacity onPress={handleStart} style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
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
  restartButton: {
    position: "absolute",
    bottom: "78%", // Position close above the card
    right: 20,
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
  feedbackCard: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(211, 211, 211, 0.8)", // Light transparent grey
    alignItems: "center",
  },
  summaryCard: {
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
    fontSize: 16,
  },
  hintButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  hintButtonText: {
    color: "white",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  tryAgainButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: Colors.purplefont,
  },
  tryAgainButtonText: {
    color: "white",
    fontSize: 16,
  },
  endGameButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: Colors.redfont,
  },
  endGameButtonText: {
    color: "white",
    fontSize: 16,
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
});

export default GameScreen;
