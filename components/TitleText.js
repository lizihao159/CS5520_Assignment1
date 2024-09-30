// components/TitleText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../assets/Colors';

const TitleText = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.purplefont,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default TitleText;
