import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';

// Redux
import {connect} from 'react-redux';
// redux store actions
import {userAuthAction, setAccountType} from '../store/actions/homeActions';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen
// Component
import DropDown from '../components/DropDown';

const {width, height} = Dimensions.get('window');

const SignUpScreen = ({
  navigation,
  userAuthAction,
  accountType,
  setAccountType,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  // const [collegeYear, setCollegeYear] = useState('');
  const [helperTextEmail, setHelperTextEmail] = useState('');
  const [helperTextPassword, setHelperTextPassword] = useState('');

  const SignUp = () => {
    helperTextEmail && setHelperTextEmail('');
    helperTextPassword && setHelperTextPassword('');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        var userUpdate = auth().currentUser;
        userUpdate
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            // Update successful.
            const currentUser = auth().currentUser;
            const userUID = currentUser.uid;
            firestore()
              .collection('users')
              .doc(userUID)
              .set({
                userUID: currentUser.uid,
                userName: currentUser.displayName,
              })
              .then(() => {
                setAccountType(true);
                userAuthAction(currentUser);
              });
          })
          .catch((error) => {
            // An error happened.
            console.log('Update Unsuccessful.', error);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setHelperTextEmail('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setHelperTextEmail('That email address is invalid!');
        }
        if (error.code === 'auth/weak-password') {
          setHelperTextPassword('Password should have at least 6 characters');
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
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
            <Text style={styles.headingText}>Sign Up</Text>
          </View>
        </View>
        <DropDown />
        <View style={styles.fields}>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
            placeholder="Full Name"
            textContentType="name"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            style={styles.textInput}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <View style={styles.helperTextContainer}>
            {helperTextEmail !== '' && (
              <Text style={styles.helperText}>{helperTextEmail}</Text>
            )}
          </View>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            style={styles.textInput}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
          />
          <View style={styles.helperTextContainer}>
            {helperTextPassword !== '' && (
              <Text style={styles.helperText}>{helperTextPassword}</Text>
            )}
          </View>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.trim())}
            style={styles.textInput}
            placeholder="Phone Number"
            keyboardType="number-pad"
            secureTextEntry={true}
          />
          <View style={styles.genderButtonCont}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.genderButton}
              onPress={() => {
                setGender('male');
              }}>
              <View
                style={
                  gender == 'male' ? styles.fillCircle : styles.emptyCircle
                }
              />
              <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.genderButton}
              onPress={() => {
                setGender('female');
              }}>
              <View
                style={
                  gender == 'female' ? styles.fillCircle : styles.emptyCircle
                }
              />
              <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={SignUp}
          activeOpacity={0.8}
          style={
            name && email && password && phoneNumber && gender && accountType
              ? styles.button
              : styles.disabledButton
          }
          disabled={!(name && email && password)}>
          <Text
            style={
              name && email && password && phoneNumber && gender && accountType
                ? styles.buttonText
                : styles.disabledButtonText
            }>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#a171ef',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  button: {
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
  },
  backButton: {
    // position: 'absolute',
    // top: 40,
    // left: 20,
  },
  backButtonIcons: {
    color: '#a171ef',
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
  helperTextContainer: {
    width: width / 1.3,
  },
  helperText: {
    fontSize: 12,
    color: '#fe6666',
  },
  fields: {
    // marginTop: 20,
  },
  fillCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#a171ef',
    borderRadius: 10,
  },
  emptyCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#a171ef',
    borderRadius: 10,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderButtonText: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 15,
  },
  genderButtonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

const mapStatetoProps = (state) => {
  return {
    accountType: state.homeReducer.accountType,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    userAuthAction: (userAuth) => dispatch(userAuthAction(userAuth)),
    setAccountType: (type) => dispatch(setAccountType(type)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SignUpScreen);