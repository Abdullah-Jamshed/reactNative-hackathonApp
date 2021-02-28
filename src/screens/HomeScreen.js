import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import {connect} from 'react-redux';
import {setFormShow, setKeyboard} from '../store/actions/homeActions';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [loader2, setLoader2] = useState(true);

  const [accountType, setAccountType] = useState(null);

  const formShowSet = async () => {
    const value = await AsyncStorage.getItem('@show_form');
    if (value !== 'false') {
      setFormShow(!(value == 'false'));
      setLoader(false);
    } else if (value == 'false') {
      setLoader(false);
    }
  };

  const fetchData = async () => {
    // setLoader2(true);
    if (accountType) {
      const fetchCollectionOf =
        accountType == 'student'
          ? 'company'
          : accountType == 'company'
          ? 'student'
          : 'both';
      // console.log('<==>', fetchCollectionOf);
      if (fetchCollectionOf !== 'both') {
        firestore()
          .collection(`${fetchCollectionOf}`)
          .get()
          .then((dataArr) => {
            // console.log(dataArr.docs)
            setData(dataArr.docs);
            setLoader2(false);
          })
          .catch(() => {
            // setLoader2(false);
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

  // useEffect(() => {
  //   formShowSet();
  // }, []);

  // useEffect(() => {
  //   const getType = async () => {
  //     const value = await AsyncStorage.getItem('@account_type');
  //     setAccountType(value);
  //   };
  //   getType();
  // }, []);

  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      console.log(value);
      setAccountType(value);
      if (value !== 'admin') {
        formShowSet();
        setLoader(false);
      }
    };
    getType();
  }, []);

  useEffect(() => {
    // AsyncStorage.removeItem('@account_type');
    if (accountType !== 'admin') {
      fetchData();
    }
  }, [accountType]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            width,
          }}>
          <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
            <Text style={styles.heading}>Recruitment App</Text>
            {accountType == 'admin' ? (
              <>
                <Text>Admin</Text>
              </>
            ) : (
              <>
                {loader || loader2 ? (
                  <ActivityIndicator
                    style={{height: '100%'}}
                    color={'#a171ef'}
                    size={'large'}
                  />
                ) : formShow ? (
                  <FormFields />
                ) : (
                  <List data={data} loader={loader2} navigation={navigation} />
                )}
              </>
            )}
          </View>
        </ScrollView>
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
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    color: '#a171ef',
    fontWeight: 'bold',
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
