import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const List = ({data}) => {
  //   console.log(data);
  const [accountType, setAccountType] = useState(null);
  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);
  return (
    <View style={styles.container}>
      {accountType == 'student' && (
        <View style={styles.heading}>
          <Text style={styles.headingText}>Companies List</Text>
        </View>
      )}
      {accountType == 'company' && (
        <View style={styles.heading}>
          <Text style={styles.headingText}>Students List</Text>
        </View>
      )}
      {/* {accountType == 'admin' && (
        <View style={styles.heading}>
          <Text style={styles.headingText}>Students List</Text>
        </View>
      )} */}
      {accountType === 'admin' ? (
        <></>
      ) : (
        data.map((data) => {
          const dataObj = data.data();
          console.log('data ==>> ', dataObj);
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    width,
  },
  heading: {
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default List;
