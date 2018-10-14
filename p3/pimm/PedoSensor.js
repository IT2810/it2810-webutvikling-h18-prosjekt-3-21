import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    stepCount7days: 0,
    stepGoalToday: 10000,
    stepsToday: 0,
    steps: 0
  };

  getStepPercent = () => {
    return (((this.state.stepsToday + this.state.steps) / this.state.stepGoalToday)*100);
  }


  componentDidMount() {
    this._subscribe();
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

    Pedometer.isAvailableAsync().then(
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
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);
    const start2 = new Date();
    start2.setDate(end.getDay() - 1); // TODO fix this
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ stepCount7days : result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
    Pedometer.getStepCountAsync(start2, end).then(
      result => {
        this.setState({ stepsToday : result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  increment = () => {
    const step = this.state.stepsToday + 1;
    this.setState({stepsToday : step});
  }


  render() {
    let content;
    if ( this.state.isPedometerAvailable == 'true' )
    {
      content = (
      <View style={styles.container}>
          <Image
            source={require("./assets/walking.gif")}
            style={{marginBottom: 40}}
          />
          <Text style={styles.progressbar_percent_text}>
            Steps today: {this.state.stepsToday + this.state.steps} / {this.state.stepGoalToday} ({Math.min(this.getStepPercent().toFixed(0), 100)}%):
          </Text>
          <View style={styles.progressbar}>
            <View style={[styles.progressbar_completed, {width: `${Math.min(this.getStepPercent(), 100)}%`}]}/>
          </View>
          <Text>
            Last 7 days average per day: {(this.state.stepCount7days / 7).toFixed(0)}
          </Text>
      </View>
      )
    } 
    else
    {
      content = (
        <View style={styles.mid}>
          <Text style={{alignItems: 'center', justifyContent: 'center'}}>
            No pedometer available.
          </Text>
        </View>
      );
    }     
    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'lightblue'
  },

  progressbar: {
    height: '10%',
    width: '80%',
    backgroundColor: '#b7f1ff',
    borderRadius: 10,
    borderColor: '#7fc1ff',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },

  progressbar_completed: {
    borderRadius: 10,
    borderColor: '#7fbaff',
    borderRightWidth: 3,
    backgroundColor: '#7fe6ff'
  },

  progressbar_percent: {
    flexDirection: 'row',
    flex: 1
  },

  progressbar_percent_text: {
    fontSize: 15,
    color: '#777',
    marginBottom: 2
  },
});


