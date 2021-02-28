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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import {connect} from 'react-redux';
import {setFormShow} from '../store/actions/homeActions';

// firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import FormFields from '../components/FormFields';
import List from '../components/List';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation, userAuth, formShow, setFormShow}) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const [accountType, setAccountType] = useState(null);

  const formShowSet = async () => {
    const value = await AsyncStorage.getItem('@show_form');
    if (value !== 'false') {
      console.log('account type ==>> 1 ', !value);
      // console.log('account type ==>> 1 ', value == 'false');
      setFormShow(!(value == 'false'));
      setLoader(false);
    } else if (value == 'false') {
      setLoader(false);
    }
  };

  const fetchData = async () => {
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
          });
      }
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem('@show_form');
    formShowSet();
  }, []);

  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);

  useEffect(() => {
    // AsyncStorage.removeItem('@show_form');
    fetchData();
  }, [accountType]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
          {/* <Text style={styles.heading}>Recruitment App</Text> */}
          {loader ? (
            <ActivityIndicator
              style={{height: '100%'}}
              color={'#a171ef'}
              size={'large'}
            />
          ) : formShow ? (
            <FormFields />
          ) : (
            <List data={data} />
          )}
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
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
