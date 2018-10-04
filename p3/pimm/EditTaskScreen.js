import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker
} from "react-native";
import { styles } from "./HomeScreen";

export class EditTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
    this.state.taskDescription = "";
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Add task</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <TextInput
            style={stylesEditScreen.textInputField}
            placeholder="Add task description here"
            blurOnSubmit={true}
            multiline={true}
            placeholderTextColor={"gray"}
            onChangeText={text => this.setState({ taskDescriptions: text })}
          />
        </View>
        <View style={styles.navBarBottom}>
          <TouchableOpacity onPress={this.onPressBack} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressSaveTask}
            style={styles.button}
          >
            <View>
              <Text style={styles.buttonText}>Save task</Text>
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

export const stylesEditScreen = StyleSheet.create({
  textInputField: {
    height: 60,
    margin: 10
  }
});
