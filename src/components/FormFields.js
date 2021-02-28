import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const FormFields = () => {
  const [accountType, setAccountType] = useState(null);

  const [grade, setGrade] = useState('');
  const [numbers, setNumbers] = useState('');
  const [courses, setCourses] = useState('');

  const [experence, setExperence] = useState('');
  const [noOfOpening, setNoOfOpening] = useState('');
  const [reqMarks, setReqMarks] = useState('');

  const submit = async () => {
    // AsyncStorage.setItem('@show_form', 'true');
    // setFormShow(false);
  };

  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Complete Information :</Text>

      {accountType == 'student' && (
        <View>
          <TextInput
            value={grade}
            style={styles.textInput}
            placeholder="Grade"
            onChangeText={(text) => setGrade(text.trim())}
          />
          <TextInput
            value={numbers}
            style={styles.textInput}
            placeholder="Marks"
            onChangeText={(text) => setNumbers(text.trim())}
          />
          <TextInput
            value={courses}
            style={styles.textInput}
            placeholder="Courses"
            onChangeText={(text) => setCourses(text.trim())}
          />
        </View>
      )}
      {accountType == 'company' && (
        <View>
          <TextInput
            value={noOfOpening}
            style={styles.textInput}
            placeholder="No of Openings"
            onChangeText={(text) => setNoOfOpening(text.trim())}
          />
          <TextInput
            value={experence}
            style={styles.textInput}
            placeholder="Experence"
            textContentType="Experence Level"
            onChangeText={(text) => setExperence(text.trim())}
          />
          <TextInput
            value={grade}
            style={styles.textInput}
            placeholder="Grade"
            onChangeText={(text) => setGrade(text.trim())}
          />
          <TextInput
            value={reqMarks}
            style={styles.textInput}
            placeholder="Least Marks"
            onChangeText={(text) => setReqMarks(text.trim())}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={submit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#a171ef',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    color: '#a171ef',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#a171ef',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default FormFields;
