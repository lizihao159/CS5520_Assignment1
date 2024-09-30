import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import CheckBox from 'react-native-check-box';
import Card from "../components/Card";
import Colors from "../assets/Colors";

const StartScreen = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (value) => {
    setName(value);
    if (value.length <= 1 || /\d/.test(value)) {
      setNameError('Please enter a valid name');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (value) => {
    setEmail(value);
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value) => {
    setPhone(value.replace(/[^0-9]/g, ""));
    if (value.length !== 10 || isNaN(value) || value[value.length - 1] === '0' || value[value.length - 1] === '1') {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  const resetInput = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsRobotChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  const confirmInput = () => {
    if (!nameError && !emailError && !phoneError && name && email && phone && isRobotChecked) {
      onRegister(name, email, phone);
    } else {
      Alert.alert('Invalid Input', 'Please enter valid details to register');
    }
  };

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
          placeholderTextColor={Colors.yellowfont}
        />
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

        <Text style={styles.cardTitle}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={validateEmail}
          placeholder="Enter your email"
          placeholderTextColor={Colors.yellowfont}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={styles.cardTitle}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={validatePhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          placeholderTextColor={Colors.yellowfont}
        />
        {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isRobotChecked}
            onClick={() => setIsRobotChecked(!isRobotChecked)}
            checkBoxColor={Colors.purplefont}
          />
          <Text style={styles.checkboxText}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button color={Colors.purplefont} title="Reset" onPress={resetInput} />
          <TouchableOpacity
            onPress={confirmInput}
            style={[
              styles.registerButton,
              { backgroundColor: isFormValid ? Colors.yellowfont : Colors.redfont }
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
    color: Colors.purplefont,
    fontWeight: 'bold',
    position: 'absolute',
    top: 70,
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
    color: Colors.purplefont,
    textAlign: "left",
    marginVertical: 10,
  },
  input: {
    height: 40,
    fontSize: 18,
    color: Colors.purplefont,
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
    color: Colors.redfont,
    marginBottom: 10,
  },
});

export default StartScreen;
