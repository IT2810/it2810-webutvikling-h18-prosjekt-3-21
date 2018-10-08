import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Task } from "./Task";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
    this.state.tasksArray = [];
  }
  state = {
    displayedTab: "todo"
  };

  componentDidMount() {
    _retrieveData = async () => {
      let taskArr = [];
      try {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              console.log("key: ", store[i][0]);
              console.log("value: ", store[i][1]);
              taskArr.push(JSON.parse(store[i][1]));
              console.log(taskArr);
            });
          }).then(() => {
            this.setState({
              tasksArray: taskArr
            });
            console.log("HomeScreen: ", this.state.tasksArray);
          });
        });
      } catch (error) {
        console.log(error);
        alert("Error retrieving data");
      }
    };

    _retrieveData();

    /*
    _retrieveData = async () => {
      try {
        const result = await AsyncStorage.getItem("tasks");
        if (result != null) {
          let taskArr = JSON.parse(result);
          for (var key in taskArr) {
            console.log("id: ", taskArr[key].id);
            console.log(taskArr[key].taskDesc);

            this.setState({});
          }
          console.log("Length of array: ", taskArr.length);
          this.setState({
            tasksArray: taskArr
          });
        } else {
          console.log("result is null");
        }
      } catch (error) {
        console.log(error);
        alert("Error retrieving data");
      }
    };

    _retrieveData();
    */
  }

  render() {
    let tasks;
    if (this.state.displayedTab === "todo") {
      tasks = (
        <ScrollView
          contentContainerStyle={styles.taskContainer}
          scrollEnabled={true}
          alwaysBounceVertical={false}
        >
          {this.state.tasksArray.map(task => (
            <Task taskdescription={task.taskDesc} key={task.id} />
          ))}
        </ScrollView>
      );
    } else if (this.state.displayedTab === "completed") {
      tasks = (
        <ScrollView
          contentContainerStyle={styles.taskContainer}
          scrollEnabled={true}
        >
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
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
    borderTopColor: "#888",
    borderTopWidth: 2,
    borderBottomColor: "#888",
    borderBottomWidth: 2
  },
  taskContainer: {
    padding: 1,
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
