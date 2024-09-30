import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Colors from '../assets/Colors';

const ConfirmScreen = ({ userInfo, visible, onGoBack, onContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <Card style={styles.modalCard}>
          <Text style={styles.modalTitle}>Hello {userInfo.name}</Text>
          <Text>Here is the information you entered:</Text>
          <Text>{userInfo.email}</Text>
          <Text>{userInfo.phone}</Text>
          <Text>If it is not correct, please go back and edit them.</Text>

          <View style={styles.modalButtonContainer}>
            <Button title="Go back" color={Colors.redfont} onPress={onGoBack} />
            <Button title="Continue" color={Colors.purplefont} onPress={onContinue} />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.8)',
  },
  modalCard: {
    width: '80%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.purplefont,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
});

export default ConfirmScreen;
