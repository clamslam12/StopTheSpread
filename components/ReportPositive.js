import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const ReportPositive = ({onPress, buttonTitle, ...rest}) =>{
    return (
      <TouchableOpacity onPress={()=> onPress()} style={styles.buttonContainer} {...rest}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
};
export default ReportPositive;

const styles = StyleSheet.create({
    buttonContainer: {
      margin: 10,
      width: '100%',
      height: windowHeight / 15,
      backgroundColor: '#FF6961',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      fontFamily: 'Helvetica Neue'
    },
  });