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
import {userAuthAction, setExists} from '../store/actions/homeActions';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen
// Component

const {width, height} = Dimensions.get('window');

const SignUpScreen = ({navigation, userAuthAction, setExists}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
                groupsJoined: [],
                location: null,
              })
              .then(() => {
                setExists(true);
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={30}
            style={styles.backButtonIcons}
          />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Family Tracker</Text>
        </View>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
          placeholder="Name"
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
        <TouchableOpacity
          onPress={SignUp}
          activeOpacity={0.8}
          style={
            name && email && password ? styles.button : styles.disabledButton
          }
          disabled={!(name && email && password)}>
          <Text
            style={
              name && email && password
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    position: 'absolute',
    top: 42,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fe6666',
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#fe6666',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fe6666',
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
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonIcons: {
    color: '#fe6666',
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
});

const mapStatetoProps = (state) => {
  return {};
};
const mapDispatchtoProps = (dispatch) => {
  return {
    userAuthAction: (userAuth) => dispatch(userAuthAction(userAuth)),
    setExists: (exists) => dispatch(setExists(exists)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SignUpScreen);
