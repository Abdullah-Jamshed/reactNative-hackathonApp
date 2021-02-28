import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

// Redux
import {connect} from 'react-redux';
// import {} from '../store/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import FormFields from '../components/FormFields';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation, userAuth}) => {
  const [formShow, setFormShow] = useState(null);
  const [loader, setLoader] = useState(true);

  // const submit = async () => {
  //   // AsyncStorage.setItem('@show_form', 'true');
  //   // setFormShow(false);
  // };

  const formShowSet = async () => {
    const value = await AsyncStorage.getItem('@show_form');
    setFormShow(!value);
    setLoader(false);
  };

  useEffect(() => {
    AsyncStorage.removeItem('@show_form');
    formShowSet();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center',paddingTop:20}}>
          {/* <Text style={styles.heading}>Recruitment App</Text> */}
          {loader ? (
            <ActivityIndicator color={'#a171ef'} size={'small'} />
          ) : (
            formShow && <FormFields />
          )}
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={submit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    // justifyContent: 'center',
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
  heading: {
    // position: 'absolute',
    // top: 50,
    fontSize: 20,
    color: '#a171ef',
    fontWeight: 'bold',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
