import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import {connect} from 'react-redux';

// firebasee
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation, userAuth}) => {
  const [userDetail, setUserDetail] = useState(null);
  const signOut = () => {
    AsyncStorage.removeItem('@account_type');
    auth().signOut();
  };
  const userDetailFetch = async () => {
    const type = await AsyncStorage.getItem('@account_type');
    const data = await firestore().collection(type).doc(userAuth.uid).get();
    setUserDetail(data.data());
  };

  useEffect(() => {
    userDetailFetch();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {userAuth && (
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={signOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.photoCircle}>
              {userAuth.photoURL ? (
                <Image
                  source={{uri: userAuth.photoURL}}
                  style={styles.imageStyle}
                />
              ) : (
                <View style={styles.defaultImage}>
                  <AntDesign name="user" size={60} color={'#c4c4c4'} />
                </View>
              )}
              <View style={styles.editButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Update')}
                  style={styles.editButton}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDetailWrapper}>
            {userDetail ? (
              <View style={styles.userDetailContainer}>
                <View>
                  <Text style={styles.headingText}>Personal Detail</Text>
                </View>

                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Name :</Text>
                  <Text style={styles.userDetailValue}>
                    {userDetail.userName}
                  </Text>
                </View>
                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Email :</Text>
                  <Text style={styles.userDetailValue}>{userDetail.email}</Text>
                </View>

                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Gender :</Text>
                  <Text style={styles.userDetailValue}>
                    {userDetail.gender}
                  </Text>
                </View>

                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Phone :</Text>
                  <Text style={styles.userDetailValue}>
                    {userDetail.phoneNumber}
                  </Text>
                </View>
                <View>
                  <Text style={styles.headingText}>Achievements</Text>
                </View>
                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Grade :</Text>
                  <Text style={styles.userDetailValue}>
                    {userDetail.grade}
                  </Text>
                </View>
                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Score :</Text>
                  <Text style={styles.userDetailValue}>
                    {userDetail.score}
                  </Text>
                </View>
                <View style={styles.userDetail}>
                  <Text style={styles.userDetailLabel}>Courses :</Text>
                  <Text style={styles.userDetailValue}>
                    {userDetail.courses}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.loaderContainer}>
                <ActivityIndicator color={'#a171ef'} size={'large'} />
              </View>
            )}

            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={signOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    width: 100,
    // alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#a171ef',
    fontWeight: 'bold',
  },
  photoContainer: {
    width,
    backgroundColor: '#a171ef',
    height: 100,
    alignItems: 'center',
    marginBottom: 50,
  },
  photoCircle: {
    position: 'relative',
    top: 50,
    width: 106,
    height: 106,
    backgroundColor: '#f6f6f6',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailWrapper: {
    paddingVertical: 20,
  },
  userDetailContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  userDetail: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  userDetailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 70,
  },
  defaultImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonContainer: {
    zIndex: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  editButton: {
    padding: 5,
    backgroundColor: '#586069',
    borderRadius: 100,
  },
  loaderContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
    accountType: state.homeReducer.accountType,
  };
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ProfileScreen);
