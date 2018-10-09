import React, { Component } from "react";
import { ScrollView, AsyncStorage } from "react-native";
import { styles } from "./HomeScreen";
import { Task } from "./Task";

export class TasksToDo extends Component {
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
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            //console.log("key: ", store[i][0]);
            //console.log("value: ", store[i][1]);
            taskArr.push(JSON.parse(store[i][1]));
            //console.log(taskArr);
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

  render() {
    console.log("TasksToDo: ", this.state.tasksArray);
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
