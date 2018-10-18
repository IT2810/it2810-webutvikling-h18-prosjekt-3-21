import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";

export class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    stepCount7days: 0,
    stepGoalToday: 10000,
    stepsToday: 0,
    steps: 0,
    showGoalSetup: false,
    configStepGoalPending: 0
  };

  getStepPercent = () => {
    return (
      ((this.state.stepsToday + this.state.steps) / this.state.stepGoalToday) *
      100
    );
  };

  onPressConfig = () => {
    if (this.state.showGoalSetup) {
      this.setState({ stepGoalToday: this.state.configStepGoalPending });
      this._StoreGoal();
    } else {
      this.setState({ configStepGoalPending: this.state.stepGoalToday });
    }

    this.setState({ showGoalSetup: !this.state.showGoalSetup });
  };

  onPressIncrementGoal = () => {
    let newGoal = this.state.configStepGoalPending;
    newGoal += 100;
    this.setState({ configStepGoalPending: newGoal });
  };

  onPressDecrementGoal = () => {
    let newGoal = this.state.configStepGoalPending;
    newGoal = newGoal > 100 ? newGoal - 100 : 100;
    this.setState({ configStepGoalPending: newGoal });
  };

  _StoreGoal = async () => {
    try {
      await AsyncStorage.setItem(
        "@pedometer:step-goal",
        this.state.stepGoalToday.toString(),
        () => {
          AsyncStorage.setItem(
            "@pedometer:step-goal",
            this.state.stepGoalToday.toString()
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  _LoadGoal = async () => {
    try {
      const value = await AsyncStorage.getItem("@pedometer:step-goal");
      console.log(value);
      if (value !== null) {
        this.setState({ stepGoalToday: parseInt(value) });
      } else {
        this.setState({ stepGoalToday: 1000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillMount() {
    this._subscribe();
    this._LoadGoal();
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        steps: result.steps
      });
    });

    Pedometer.isAvailableAsync()
      .then(
        result => {
          this.setState({
            isPedometerAvailable: String(result)
          });
        },
        error => {
          this.setState({
            isPedometerAvailable: "Could not get isPedometerAvailable: " + error
          });
        }
      )
      .then(() => {
        if (this.state.isPedometerAvailable == "true") {
          const now = new Date();

          const weekBefore = new Date();
          weekBefore.setDate(now.getDate() - 7);
          weekBefore.setHours(0, 0, 0, 0);

          Pedometer.getStepCountAsync(weekBefore, now).then(
            result => {
              this.setState({ stepCount7days: result.steps });
            },
            error => {
              this.setState({
                pastStepCount: "Could not get stepCount: " + error
              });
            }
          );

          const dayBefore = new Date();
          dayBefore.setDate(now.getDate());
          dayBefore.setHours(0, 0, 0, 0);

          Pedometer.getStepCountAsync(dayBefore, now).then(
            result => {
              this.setState({ stepsToday: result.steps });
            },
            error => {
              this.setState({
                pastStepCount: "Could not get stepCount: " + error
              });
            }
          );
        }
      });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  increment = () => {
    const step = this.state.stepsToday + 1;
    this.setState({ stepsToday: step });
  };

  render() {
    let content;
    let config;
    if (this.state.showGoalSetup) {
      config = (
        <View style={styles.configwindow}>
          <TouchableOpacity
            style={styles.incdecbutton}
            onPress={this.onPressDecrementGoal}
          >
            <Text style={styles.incdecbuttontext}>-</Text>
          </TouchableOpacity>
          <View style={styles.currentgoalconfig}>
            <Text
              style={{
                //fontWeight: "900",
                color: "#29436d",
                fontSize: 30
              }}
            >
              {this.state.configStepGoalPending}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.incdecbutton}
            onPress={this.onPressIncrementGoal}
          >
            <Text style={styles.incdecbuttontext}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.isPedometerAvailable == "true") {
      content = (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.headertext}>STEP TOWARDS YOUR GOALS</Text>
            <Text style={styles.infotext}>
              Steps today: {this.state.stepsToday + this.state.steps} /{" "}
              {this.state.stepGoalToday} (
              {Math.min(this.getStepPercent().toFixed(0), 100)}
              %):
            </Text>
            <View style={styles.progressbar}>
              <View
                style={[
                  styles.progressbar_completed,
                  { width: `${Math.min(this.getStepPercent(), 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.infotext}>
              Last 7 days average per day:{" "}
              {(this.state.stepCount7days / 7).toFixed(0)}
            </Text>
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.showconfigbutton}
              onPress={this.onPressConfig}
            >
              <Text
                style={{
                  //fontWeight: "600",
                  color: "#fff",
                  fontSize: 16
                }}
              >
                {this.state.showGoalSetup ? "CONFIRM" : "SET NEW GOAL"}
              </Text>
            </TouchableOpacity>
            {config}
          </View>
          <Text style={[styles.infotext, styles.goalCompleteText]}>
            {this.getStepPercent() >= 100 ? "STEP GOAL COMPLETE, NICE!" : " "}
          </Text>
        </View>
      );
    } else if(this.state.isPedometerAvailable == "false") {
      content = (
          <Text style={{backgroundColor: "lightblue", flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
            No pedometer available.
          </Text>
      );
    } else {
      content = (
        <View style={{backgroundColor: "lightblue", flex:1}} />
      )
    }
    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue"
  },

  bottom: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },

  top: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50
  },

  headertext: {
    fontSize: 45,
    color: "#fff",
    textShadowColor: "#29436d",
    textShadowRadius: 0,
    textShadowOffset: { width: 2, height: 2 },
    textAlign: "center",
    marginBottom: 70
  },

  progressbar: {
    height: "20%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 17,
    borderColor: "#29436d",
    borderWidth: 3,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },

  progressbar_completed: {
    borderColor: "#29436d",
    borderRightWidth: 1,
    backgroundColor: "#7fe6ff",
    borderRadius: 15
  },

  progressbar_percent: {
    flexDirection: "row",
    flex: 1
  },

  infotext: {
    // fontWeight: "600",
    color: "#fff",
    fontSize: 20,
    marginBottom: 15,
    textShadowColor: "#29436d",
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 }
  },

  showconfigbutton: {
    height: 50,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#5176A1",
    borderColor: "#29436d",
    borderWidth: 2
  },

  configwindow: {
    width: "100%",
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },

  incdecbutton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: "#5176A1",
    borderColor: "#29436d",
    borderWidth: 2,
    flexDirection: "column"
  },

  incdecbuttontext: {
    fontWeight: "600",
    fontSize: 50,
    lineHeight: 50,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    textShadowColor: "#29436d",
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 }
  },

  currentgoalconfig: {
    backgroundColor: "#d6f7ff",
    height: 50,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 10,
    borderColor: "#29436d",
    borderWidth: 2
  },

  goalCompleteText: {
    fontSize: 20
    // position: "absolute",
  }
});
