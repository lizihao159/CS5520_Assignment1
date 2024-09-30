// components/CustomTextInput.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../assets/Colors';

const CustomTextInput = ({ value, onChangeText, placeholder, keyboardType }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={Colors.yellowfont}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.purplefont,
    borderBottomWidth: 1,
    marginVertical: 15,
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    color: Colors.purplefont,
  },
});

export default CustomTextInput;
