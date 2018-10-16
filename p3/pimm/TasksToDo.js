import React, { Component } from "react";
import { ScrollView, AsyncStorage } from "react-native";
import { styles } from "./HomeScreen";
import { Task } from "./Task";
import { retrieveData } from "./AsyncLoader";

export class TasksToDo extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
  }

  state = {
    tasksArray: [],
    parent: null
  };

  /*
  _retrieveData = async () => {
    let taskArr = [];
    try {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let task = JSON.parse(store[i][1]);
            if (task !== null) {
              if (task.isCompleted === false) {
                taskArr.push(task);
              }
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
  */

  async componentDidMount() {
    let taskArr = await retrieveData();
    /*
    async () => {
      taskArr = await retrieveData();
    };
    */

    /*
    taskArr.then(result => {
      console.log("result", result);
    });
    */
    console.log("insideCompdidmount", taskArr);

    if (typeof taskArr != "undefined") {
      this.setState({
        tasksArray: taskArr
      });
    }
  }

  updateTasks() {
    /*

    let taskArr = retrieveData();
    this.setState({
      tasksArray: taskArr
    });
    */
  }

  render() {
    console.log("Rendering tasks todo");
    console.log("grrr", this.state.tasksArray);
    return (
      <ScrollView
        contentContainerStyle={styles.taskContainer}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      >
        {this.state.tasksArray.map(task => (
          <Task
            id={task.id_str}
            taskdescription={task.taskDesc}
            key={task.id}
            parent={this}
          />
        ))}
      </ScrollView>
    );
  }
}
