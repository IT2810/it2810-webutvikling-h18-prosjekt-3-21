import React, { Component } from "react";
import { ScrollView, AsyncStorage } from "react-native";
import { styles } from "./HomeScreen";
import { Task } from "./Task";

export class TasksCompleted extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
  }

  state = {
    tasksArray: [],
    parent: null
  };

  _retrieveData = async () => {
    let taskArr = [];
    try {
      AsyncStorage.getAllKeys((err, keys) => {
        let taskKeys = [];
        for (iii in keys) {
          if (keys[iii].slice(0, 4) === "task") {
            taskKeys.push(keys[iii]);
          }
        }
        console.log("all keys", taskKeys);
        AsyncStorage.multiGet(taskKeys, (err, stores) => {
          stores.map((result, i, store) => {
            let task = JSON.parse(store[i][1]);
            if (task.isCompleted) {
              taskArr.push(task);
            }
          });
        }).then(() => {
          this.setState({
            tasksArray: taskArr
          });
        });
      });
    } catch (error) {
      console.log(error);
      alert("Error retrieving data");
    }
  };

  componentDidMount() {
    this._retrieveData();
  }

  updateTasks() {
    this._retrieveData();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.taskContainer}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      >
        {this.state.tasksArray.map(task => (
          <Task
            id={task.id}
            taskdescription={task.taskDesc}
            key={task.id}
            parent={this}
          />
        ))}
      </ScrollView>
    );
  }
}
