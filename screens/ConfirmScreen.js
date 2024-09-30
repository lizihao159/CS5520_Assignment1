import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import TitleText from '../components/TitleText';
import Colors from '../assets/Colors';

const ConfirmScreen = ({ userInfo, visible, onGoBack, onContinue }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      {/* Add a card to display the user information */}
      <View style={styles.modalBackground}>
        <Card style={styles.modalCard}>
          <TitleText>Hello {userInfo.name}</TitleText>
          <Text>Here is the information you entered:</Text>
          <Text>{userInfo.email}</Text>
          <Text>{userInfo.phone}</Text>
          <Text>If it is not correct, please go back and edit them.</Text>

          {/* Add buttons continue and back to previous screen*/}
          <View style={styles.modalButtonContainer}>
            <CustomButton title="Go back" onPress={onGoBack} style={{ backgroundColor: Colors.redfont }} />
            <CustomButton title="Continue" onPress={onContinue} />
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
});

export default ConfirmScreen;
