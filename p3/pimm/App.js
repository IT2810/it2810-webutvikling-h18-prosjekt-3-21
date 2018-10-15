import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { HomeScreen } from "./HomeScreen";
import { EditTaskScreen } from "./EditTaskScreen";
import { PedometerSensor } from "./PedoSensor";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currentTab: "Pedometer",
  };
  handleAddTask = () => {
    this.setState({ currentTab: "AddTaskScreen" });
  };
  handlePressBack = () => {
    this.setState({ currentTab: "HomeScreen" });
  };
  handleEditTask = (id, desc) => {
    displayedScreen = (
      <EditTaskScreen parent={this} taskid={id} taskdesc={desc} />
    );
    this.setState({ currentTab: "EditTaskScreen" });
  };

  handleNavbarPress = (id) => {
    this.setState({currentTab : id});
  }

  render() {
    if (this.state.currentTab === "HomeScreen") {
      displayedScreen = <HomeScreen parent={this} />;
    } else if (this.state.currentTab === "AddTaskScreen") {
      displayedScreen = <EditTaskScreen parent={this} />;
    } else if (this.state.currentTab === "Pedometer") {
      displayedScreen = <PedometerSensor/>
    }

    let isPedometer = this.state.currentTab === "Pedometer";

    return (
      <View style={appStyle.app}>
        {displayedScreen}
        <View style={appStyle.navbar}>
          <TouchableOpacity 
            style={[appStyle.navbarbutton, !isPedometer ? appStyle.activebutton : ""]}
            onPress={() => this.handleNavbarPress("HomeScreen")}
            >
            <Text style={[appStyle.navbartext, !isPedometer ? appStyle.activeText : ""]}>TASK LIST</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[appStyle.navbarbutton, isPedometer ? appStyle.activebutton : ""]}
            onPress={() => this.handleNavbarPress("Pedometer")}
            >
            <Text style={[appStyle.navbartext, isPedometer ? appStyle.activeText : ""]}>STEP COUNTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const appStyle = StyleSheet.create({
  app: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },

  navbar: {
    height: '8%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  navbarbutton: {
    flex: 1,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    backgroundColor: '#aaa'
  },

  activebutton: {
    backgroundColor: '#f7f7f7'
  },

  navbartext: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: "900",
    fontSize: 20,
    color: "#555"
  },
  
  activeText: {
    color: "#333"
  }
});