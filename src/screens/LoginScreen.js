import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//redux
import {connect} from 'react-redux';

// firebase
import auth from '@react-native-firebase/auth';

// Screen
//Component
import DropDown from '../components/DropDown';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, accountType}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperTextEmail, setHelperTextEmail] = useState('');
  const [helperTextPassword, setHelperTextPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const signIn = () => {
    setLoader(true);
    helperTextEmail && setHelperTextEmail('');
    helperTextPassword && setHelperTextPassword('');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        AsyncStorage.setItem('@account_type', accountType);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          setHelperTextEmail('Invalid Email address !');
        }
        if (error.code === 'auth/user-not-found') {
          setHelperTextEmail('User Not found !');
        }
        if (error.code === 'auth/wrong-password') {
          setHelperTextPassword('Wrong Password !');
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Recruitment App</Text>
        </View>
        <View style={{marginTop: 30}}>
          <DropDown />
          <View style={{alignItems: 'center', marginTop: 30}}>
            <TextInput
              value={email}
              style={styles.textInput}
              placeholder="Email"
              textContentType="emailAddress"
              onChangeText={(text) => setEmail(text.trim())}
            />
            {helperTextEmail !== '' && (
              <View style={styles.helperTextContainer}>
                <Text style={styles.helperText}>{helperTextEmail}</Text>
              </View>
            )}
            <TextInput
              value={password}
              style={styles.textInput}
              onChangeText={(text) => setPassword(text.trim())}
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
            />
            {helperTextPassword !== '' && (
              <View style={styles.helperTextContainer}>
                <Text style={styles.helperText}>{helperTextPassword}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={signIn}
              activeOpacity={0.8}
              style={
                email && password && accountType
                  ? styles.button
                  : styles.disabledButton
              }
              disabled={!(email && password)}>
              <Text
                style={
                  email && password && accountType
                    ? styles.buttonText
                    : styles.disabledButtonText
                }>
                Log In
              </Text>
              {loader && (
                <ActivityIndicator
                  color={'#fff'}
                  size="small"
                  style={{marginLeft: 5}}
                />
              )}
            </TouchableOpacity>

            <View style={{marginTop: 8}}>
              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: '#a171ef', fontWeight: 'normal'},
                  ]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.signUp}>
          <Text>Don't Have account?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[styles.buttonText, {color: '#a171ef', marginLeft: 5}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  heading: {
    // position: 'absolute',
    // top: 25,
  },
  headingText: {
    fontSize: 20,
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
  signUp: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
  backgroundColor: '#a171ef',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
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
  return {
    accountType: state.homeReducer.accountType,
  };
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginScreen);
