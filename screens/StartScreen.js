import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CheckBox from 'react-native-check-box';
import Colors from "../assets/Colors";
import CustomButton from '../components/CustomButton';
import TitleText from '../components/TitleText';

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
    // name should not be empty and should not contain numbers
    if (value.length <= 1 || /\d/.test(value)) {
      setNameError('Please enter a valid name');
    } else {
      setNameError('');
    }
  };

  // Validate Email
  const validateEmail = (value) => {
    setEmail(value);
    // email should match the email regex pattern
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  // Validate Phone
  const validatePhone = (value) => {
    // phone should be 10 digits and should not contain any letters
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
    // check if all inputs are valid and the checkbox is checked
    if (!nameError && !emailError && !phoneError && name && email && phone && isRobotChecked) {
      onRegister(name, email, phone);
    } else {
      Alert.alert('Invalid Input', 'Please enter valid details to register');
    }
  };

  // Check if all inputs are valid for enabling Register button
  const isFormValid = !nameError && !emailError && !phoneError && name && email && phone && isRobotChecked;

  return (
    <View style={styles.screen}>
      <TitleText>Guess My Number</TitleText>
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

        <Text style={[styles.cardTitle, { color: Colors.purplefont }]}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={validateEmail}
          placeholder="Enter your email"
          placeholderTextColor="#B0C4DE"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={[styles.cardTitle, { color: Colors.purplefont }]}>Phone Number</Text>
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
        {/* register button should be disabled if the form is not valid */}
        <View style={styles.buttonContainer}>
          <CustomButton title="Reset" onPress={resetInput} />
          <CustomButton
            title="Register"
            onPress={confirmInput}
            style={{
              backgroundColor: isFormValid ? Colors.purplefont : Colors.redfont,
            }}
            disabled={!isFormValid}
          />
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
  cardContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 250,
    padding: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
    borderRadius: 10,
    marginTop: 120,
  },
  cardTitle: {
    fontSize: 18,
    textAlign: "left",
    marginVertical: 10,
    color: Colors.purplefont,
  },
  input: {
    height: 40,
    fontSize: 18,
    color: "black",
    borderBottomColor: Colors.purplefont,
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: "left",
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
    color: Colors.purplefont,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  error: {
    color: Colors.redfont,
    marginBottom: 10,
  },
});

export default StartScreen;
