import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
  }
  state = {
    displayedTab: "todo"
  };
  render() {
    let tasks;
    if (this.state.displayedTab === "todo") {
      tasks = (
        <ScrollView
          contentContainerStyle={styles.taskContainer}
          scrollEnabled={true}
        >
          <Text style={styles.taskPlaceholder}>Task placeholder 1</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 2</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 3</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 4</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 5</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 6</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 7</Text>
          <Text style={styles.taskPlaceholder}>Task placeholder 8</Text>
        </ScrollView>
      );
    } else if (this.state.displayedTab === "completed") {
      tasks = (
        <ScrollView
          contentContainerStyle={styles.taskContainer}
          scrollEnabled={true}
        >
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 1
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 2
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 3
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 4
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 5
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 6
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 7
          </Text>
          <Text style={styles.taskPlaceholder}>
            Completed task placeholder 8
          </Text>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <TouchableOpacity onPress={this.onPressAddTask} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Add task</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>{tasks}</View>
        <View style={styles.navBarBottom}>
          <TouchableOpacity onPress={this.onPressToDo} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>To do</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressCompleted}
            style={styles.button}
          >
            <View>
              <Text style={styles.buttonText}>Completed</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  onPressToDo = () => {
    this.setState({ displayedTab: "todo" });
  };
  onPressCompleted = () => {
    this.setState({ displayedTab: "completed" });
  };
  onPressAddTask = () => {
    this.state.parent.handleEditTask();
  };
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flex: 1,
    width: "95%",
    marginTop: 30
  },
  headerText: {
    fontSize: 30,
    height: "100%"
  },
  mainContainer: {
    flex: 7,
    width: "100%",
    margin: 4,
    borderColor: "black",
    borderWidth: 4
  },
  taskContainer: {
    flex: 1,
    padding: 1,
    borderColor: "red",
    borderWidth: 3,
    alignItems: "center"
  },
  navBarBottom: {
    flex: 1,
    flexDirection: "row",
    padding: 3,
    marginBottom: 3
  },
  button: {
    flex: 1,
    backgroundColor: "#5176A1",
    borderColor: "black",
    width: "100%",
    borderWidth: 3,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 2
  },
  buttonText: {
    fontSize: 25
  },
  taskPlaceholder: {
    flex: 0,
    width: "95%",
    height: "20%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 4,
    margin: 1,
    textAlign: "center",
    textAlignVertical: "center"
  }
});
