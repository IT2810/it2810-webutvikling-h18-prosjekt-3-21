import React from 'react';
import {Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, Image } from 'react-native';


export class Task extends React.Component {
    
    state = {
        taskdescription: 'Hent melk'
    };

    _onPressButton = () => {
      Alert.alert("yeleo");
    }

    render() {
    return (
      <View style={styles.task}>
        <Text style={styles.taskdescription}>{this.state.taskdescription}</Text>
        <TouchableOpacity onPress={this._onPressButton}>
          <Image source={require("./assets/acceptbutton.png")} style={styles.acceptbutton}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    borderColor: '#999',
    borderWidth: 3,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10
  },

  acceptbutton: {
     width: 48,
     height: 48
  },

  taskdescription: {
    color: '#333',
    flex: 5
  }
});
