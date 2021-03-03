import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import {connect} from 'react-redux';
import {setFormShow, setKeyboard} from '../store/actions/homeActions';

// firebase
import firestore from '@react-native-firebase/firestore';

// components
import FormFields from '../components/FormFields';
import List from '../components/List';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({
  navigation,
  userAuth,
  formShow,
  setFormShow,
  setKeyboard,
}) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [active, setActive] = useState('student');
  const [accountType, setAccountType] = useState(null);

  const formShowSet = async () => {
    console.log(accountType);
    if (accountType) {
      firestore()
        .collection(`${accountType}`)
        .where('userUID', '==', userAuth.uid)
        .where('completeForm', '==', 'true')
        .get()
        .then((data) => {
          if (data.docs.length !== 0) {
            setFormShow(false);
            setLoader(false);
          } else {
            setFormShow(true);
            setLoader(false);
          }
        });
    }
  };

  const fetchData = async () => {
    if (accountType) {
      setLoader(true);
      if (accountType == 'student' || accountType == 'company') {
        firestore()
          .collection(`${accountType}`)
          .onSnapshot((dataArr) => {
            setData(dataArr.docs);
            setLoader(false);
          });
      } else if (accountType == 'admin') {
        firestore()
          .collection(`${active}`)
          .onSnapshot((dataArr) => {
            setData(dataArr.docs);
            setLoader(false);
          });
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboard(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboard(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);

  useEffect(() => {
    if (accountType !== 'admin') {
      formShowSet();
      fetchData();
    }
  }, [accountType]);

  useEffect(() => {
    if (accountType == 'admin') {
      fetchData();
    }
  }, [active, accountType]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
          <Text style={styles.heading}>Recruitment App</Text>
          {accountType == 'admin' && (
            <>
              <View>
                <View style={styles.buttonContainer2}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setActive('student');
                    }}
                    style={
                      active == 'student' ? styles.button : styles.disableButton
                    }>
                    <Text
                      style={
                        active == 'student'
                          ? styles.buttonText
                          : styles.disableButtonText
                      }>
                      Student
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setActive('company');
                    }}
                    style={
                      active == 'company' ? styles.button : styles.disableButton
                    }>
                    <Text
                      style={
                        active == 'company'
                          ? styles.buttonText
                          : styles.disableButtonText
                      }>
                      Company
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <List
                    data={data}
                    loader={loader}
                    navigation={navigation}
                    active={active}
                  />
                </View>
              </View>
            </>
          )}
          <>
            {loader ? (
              <ActivityIndicator
                style={{height: '100%'}}
                color={'#a171ef'}
                size={'large'}
              />
            ) : formShow ? (
              <FormFields />
            ) : (
              <List data={data} loader={loader} navigation={navigation} />
            )}
          </>
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
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  disableButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#a171ef',
    marginHorizontal: 5,
  },
  disableButtonText: {
    fontSize: 15,
    color: '#a171ef',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    color: '#a171ef',
    fontWeight: 'bold',
  },
  buttonContainer2: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
    formShow: state.homeReducer.formShow,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setFormShow: (show) => dispatch(setFormShow(show)),
    setKeyboard: (flag) => dispatch(setKeyboard(flag)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
