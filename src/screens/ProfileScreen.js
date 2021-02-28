import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Redux
import {connect} from 'react-redux';

// firebasee
import auth from '@react-native-firebase/auth';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation, userAuth}) => {
  const signOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {userAuth && (
        <View style={styles.container}>
          <View style={styles.photoContainer}>
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
                  activeOpacity={0.7}
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
            <View style={styles.userDetailContainer}>
              <View style={styles.userDetail}>
                <Text style={styles.userDetailLabel}>Name :</Text>
                <Text style={styles.userDetailValue}>
                  {userAuth.displayName}
                </Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.userDetailLabel}>Email :</Text>
                <Text style={styles.userDetailValue}>{userAuth.email}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={signOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: 'center',
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
    fontSize: 16,
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
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ProfileScreen);
