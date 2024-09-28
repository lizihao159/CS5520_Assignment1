import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert, StyleSheet } from "react-native";
import CheckBox from 'react-native-check-box'; // Import the CheckBox component
import Card from "../components/Card";
import Colors from "../assets/Colors";

const StartScreen = ({ startgame }) => {
  // State for the inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  // State for error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Validate Name
  const validateName = (value) => {
    setName(value);
    if (value.length <= 1 || /\d/.test(value)) {
      setNameError('Please enter a valid name');
    } else {
      setNameError('');
    }
  };

  // Validate Email
  const validateEmail = (value) => {
    setEmail(value);
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  // Validate Phone
  const validatePhone = (value) => {
    setPhone(value.replace(/[^0-9]/g, ""));
    if (value.length !== 10 || isNaN(value) || value[value.length - 1] === '0' || value[value.length - 1] === '1') {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  // Reset Inputs
  const resetInput = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsRobotChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  // Confirm Input
  const confirmInput = () => {
    if (!nameError && !emailError && !phoneError && name && email && phone) {
      startgame(); // Calls the start game function in App.js
    } else {
      Alert.alert('Invalid Input', 'Please enter valid details to register');
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Guess My Number</Text>
      <Card style={styles.inputContainer}>
        <Text style={styles.cardTitle}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={validateName}
          placeholder="Enter your name"
        />
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

        <Text style={styles.cardTitle}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={validateEmail}
          placeholder="Enter your email"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={styles.cardTitle}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={validatePhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

        {/* Checkbox for "I am not a robot" */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isRobotChecked}
            onClick={() => setIsRobotChecked(!isRobotChecked)}
            checkBoxColor={Colors.purplefont}
          />
          <Text style={styles.checkboxText}>I am not a robot</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button color={Colors.purplefont} title="Reset" onPress={resetInput} />
          <Button
            color={Colors.redfont}
            title="Register"
            onPress={confirmInput}
            disabled={!isRobotChecked || nameError || emailError || phoneError}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: Colors.purplefont,
    margin: 20,
    borderWidth: 2,
    borderColor: Colors.purplefont,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: Colors.yellowfont,
    textAlign: "center",
    margin: 20,
  },
  input: {
    height: 30,
    fontSize: 20,
    color: "#b8860b",
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: "center",
  },
  inputContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 250,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.purplefont,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default StartScreen;
