import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ModalComponent({isVisible, closeModal}) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelection = language => {
    setSelectedLanguage(language);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{alignItems: 'center', marginBottom: 10}}
          onPress={closeModal}>
          <View style={styles.circle}>
            <FontAwesome name="close" size={18} color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              // fontWeight: '400',
              marginBottom: 10,
              fontFamily: 'DancingScript-Bold',
            }}>
            Select Language
          </Text>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Group
              onValueChange={value => handleLanguageSelection(value)}
              value={selectedLanguage}>
              <View style={styles.radioButton}>
                <RadioButton value="English" color="red" />
                <Text style={styles.txt}>English</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="Hindi" color="red" />
                <Text style={styles.txt}>हिंदी</Text>
              </View>
            </RadioButton.Group>
            <TouchableOpacity onPress={closeModal}>
              <Text
                style={{
                  backgroundColor: '#ff0078',
                  borderRadius: 10,
                  height: 45,
                  textAlign: 'center',
                  color: 'white',
                  padding: 5,
                  fontSize: 20,
                }}>
                Select
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  txt: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  radioButtonContainer: {
    flexDirection: 'column',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#C2E3E7',
    height: 80,
    borderRadius: 10,
  },
});

export default ModalComponent;
