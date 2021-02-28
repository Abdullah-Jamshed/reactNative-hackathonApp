import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

//redux
import {connect} from 'react-redux';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const UpdateUserScreen = ({detail}) => {
  //   console.log(detail.accountType);
  //   const [accountType, setAccountType] = useState(null);
  //   useEffect(() => {
  //     const getType = async () => {
  //       const value = await AsyncStorage.getItem('@account_type');
  //       console.log(value);
  //       setAccountType(value);
  //     };
  //     getType();
  //   }, []);

  const [accountType, setAccountType] = useState(null);
  const [loader, setLoader] = useState(false);

  const [grade, setGrade] = useState('');
  const [numbers, setNumbers] = useState('');
  const [courses, setCourses] = useState('');

  const [experence, setExperence] = useState('');
  const [noOfOpening, setNoOfOpening] = useState('');
  const [reqMarks, setReqMarks] = useState('');

  const submit = () => {};

  return (
    <View style={styles.container}>
      {detail && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backButton}
              onPress={() => {
                setAccountType(null);
                navigation.goBack();
              }}>
              <Ionicons
                name="chevron-back"
                size={30}
                style={styles.backButtonIcons}
              />
            </TouchableOpacity>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Update User</Text>
            </View>
          </View>

          <View style={styles.lowerCont}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              {detail.accountType == 'student' && (
                <>
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
                  <TouchableOpacity
                    onPress={submit}
                    activeOpacity={0.8}
                    style={
                      grade && courses && numbers
                        ? styles.button
                        : styles.disabledButton
                    }
                    disabled={!(grade && courses && numbers)}>
                    <Text
                      style={
                        grade && courses && numbers
                          ? styles.buttonText
                          : styles.disabledButtonText
                      }>
                      Update
                    </Text>
                    {loader && (
                      <ActivityIndicator
                        color={'#fff'}
                        size="small"
                        style={{marginLeft: 5}}
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}

              {detail.accountType == 'company' && (
                <>
                  <TextInput
                    value={noOfOpening}
                    style={styles.textInput}
                    placeholder="No of Openings"
                    onChangeText={(text) => setNoOfOpening(text.trim())}
                  />
                  <TextInput
                    value={experence}
                    style={styles.textInput}
                    placeholder="Experence Level"
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
                  <TouchableOpacity
                    onPress={submit}
                    activeOpacity={0.8}
                    style={
                      grade && noOfOpening && experence && reqMarks
                        ? styles.button
                        : styles.disabledButton
                    }
                    disabled={!(grade && noOfOpening && experence && reqMarks)}>
                    <Text
                      style={
                        grade && noOfOpening && experence && reqMarks
                          ? styles.buttonText
                          : styles.disabledButtonText
                      }>
                      Update
                    </Text>
                    {loader && (
                      <ActivityIndicator
                        color={'#fff'}
                        size="small"
                        style={{marginLeft: 5}}
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    padding: 10,
  },
  heading: {
    marginLeft: 10,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a171ef',
  },
  backButton: {
    // position: 'absolute',
    // top: 40,
    // left: 20,
  },
  backButtonIcons: {
    color: '#a171ef',
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#a171ef',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  lowerCont: {
    // backgroundColor: 'red',
    flex: 1,
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#a171ef',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    marginRight: 10,
  },

  disabledButton: {
    backgroundColor: '#e6e6e6',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButtonText: {
    fontWeight: 'bold',
    color: '#586069',
    fontSize: 15,
  },
});

const mapStatetoProps = (state) => {
  return {
    detail: state.homeReducer.detail,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    //   setDetail: (detail) => dispatch(setDetail(detail)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(UpdateUserScreen);
