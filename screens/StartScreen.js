import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from 'react-native-check-box';
import Card from "../components/Card";
import Colors from "../assets/Colors";

const StartScreen = ({ onRegister }) => {
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
    if (!nameError && !emailError && !phoneError && name && email && phone && isRobotChecked) {
      onRegister(name, email, phone); // Correct function call
    } else {
      Alert.alert('Invalid Input', 'Please enter valid details to register');
    }
  };

  // Check if all inputs are valid for enabling Register button
  const isFormValid = !nameError && !emailError && !phoneError && name && email && phone && isRobotChecked;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Guess My Number</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={validateName}
          placeholder="Enter your name"
          placeholderTextColor="#B0C4DE"
        />
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

        <Text style={styles.cardTitle}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={validateEmail}
          placeholder="Enter your email"
          placeholderTextColor="#B0C4DE"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={styles.cardTitle}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={validatePhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          placeholderTextColor="#B0C4DE"
        />
        {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

        {/* Checkbox */}
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
          <TouchableOpacity
            onPress={confirmInput}
            style={[
              styles.registerButton,
              { backgroundColor: isFormValid ? '#4682B4' : Colors.redfont }
            ]}
            disabled={!isFormValid}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  title: {
    fontSize: 24,
    color: '#9370DB', // Light purple font
    fontWeight: 'bold',
    position: 'absolute', // Position it absolutely
    top: 70, // Distance from top of the screen
  },
  cardContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 250,
    padding: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.8)', // Light transparent grey for card background
    borderRadius: 10,
    marginTop: 120, // Add margin to avoid overlapping with the title
  },
  cardTitle: {
    fontSize: 18,
    color: '#4682B4', // Light blue font for input labels
    textAlign: "left", // Align to the left
    marginVertical: 10,
  },
  input: {
    height: 40,
    fontSize: 18,
    color: "black", // Light purple for text input
    borderBottomColor: '#9370DB',
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: "left", // Align input text to the left
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4682B4', // Light blue color for checkbox text
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  registerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default StartScreen;
