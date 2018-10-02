import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./HomeScreen";

export class EditTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Text style={(styles.headerText, { marginTop: 40 })}> Edit task</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this.onPressBack} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Back to home screen</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressBack = () => {
    this.state.parent.handlePressBack();
  };
}
