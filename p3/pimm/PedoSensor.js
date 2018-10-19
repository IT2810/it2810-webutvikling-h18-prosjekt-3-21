import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from "react-native";

export class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    stepCount7days: 0,
    stepGoalToday: 0,
    stepsToday: 0,
    steps: 0,
    showGoalSetup: false,
    configStepGoalPending: 0
  };

  getStepPercent = () => {
    return (((this.state.stepsToday + this.state.steps) / this.state.stepGoalToday)*100);
  }

  onPressConfig = () => {
    if(this.state.showGoalSetup) 
    {
      this.setState({stepGoalToday : this.state.configStepGoalPending});   
      this._StoreGoal();
    }
    else
    {
      this.setState({configStepGoalPending : this.state.stepGoalToday});
    }

    this.setState({showGoalSetup : !this.state.showGoalSetup});
  }

  onPressIncrementGoal = () => {
    let newGoal = this.state.configStepGoalPending;
    newGoal += 100;
    this.setState({configStepGoalPending : newGoal})
  }
  
  onPressDecrementGoal = () => {
    let newGoal = this.state.configStepGoalPending;
    newGoal = newGoal > 100 ? newGoal - 100 : 100;
    this.setState({configStepGoalPending : newGoal})
  }

  _StoreGoal = async () => {
    try {
      await AsyncStorage.setItem('@pedometer:step-goal', this.state.stepGoalToday.toString(), () => {
        AsyncStorage.setItem('@pedometer:step-goal', this.state.stepGoalToday.toString());
      });
      console.log("Item set " + this.state.stepGoalToday.toString());
    } catch (error) {
      console.log(error);
    }
  }

  _LoadGoal = async () => {
    try {
      const value = await AsyncStorage.getItem('@pedometer:step-goal');
      console.log(value)
      if (value !== null) {
        this.setState({stepGoalToday : parseInt(value)});
        console.log("found step goal");
      }
      else 
      {
        this.setState({stepGoalToday : 1000});
      }
     } catch (error) {
       console.log(error)
     }
  }

  

  componentDidMount() {
    this._subscribe();
    this._LoadGoal();

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

    const now = new Date();
    
    const weekBefore = new Date();
    weekBefore.setDate(now.getDate() - 7);
    weekBefore.setHours(0,0,0,0);

    Pedometer.getStepCountAsync(weekBefore, now).then(
      result => {
        this.setState({ stepCount7days : result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
    
    const dayBefore = new Date();
    dayBefore.setDate(now.getDate());
    dayBefore.setHours(0,0,0,0);
    
    Pedometer.getStepCountAsync(dayBefore, now).then(
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
    let config;
    if (this.state.showGoalSetup)
    {
      config = (
        <View style={styles.configwindow}>        
          <TouchableOpacity style={styles.incdecbutton} onPress={this.onPressDecrementGoal}>
            <Text>-</Text>
          </TouchableOpacity>
          <View style={styles.currentgoalconfig}>
            <Text style={{fontSize: 30}}>
              {this.state.configStepGoalPending}
            </Text>
          </View>
          <TouchableOpacity style={styles.incdecbutton} onPress={this.onPressIncrementGoal}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if ( this.state.isPedometerAvailable == 'true' )
    {
      content = (
      <View style={styles.container}>
        
        <View style={styles.top}>
          <Image
          source={require("./assets/walking.gif")}
          style={{marginBottom: 40}}
          />
          <Text style={styles.progressbar_percent_text}>
            Steps today: {this.state.stepsToday + this.state.steps} / {this.state.stepGoalToday} ({Math.min(this.getStepPercent().toFixed(0), 100)}%):
          </Text>
          <View style={styles.progressbar}>
            <View style={[styles.progressbar_completed, {width: `${Math.min(this.getStepPercent(), 100)}%`}]} />
          </View>
          <Text>
            Last 7 days average per day: {(this.state.stepCount7days / 7).toFixed(0)}
          </Text>
          {this.getStepPercent() >= 100 ? <Text style={{fontSize: 28, marginTop: 30}}>STEP GOAL COMPLETE, NICE!</Text> : ""}
        </View>
        
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.showconfigbutton} onPress={this.onPressConfig}>
            <Text>{this.state.showGoalSetup ? "Confirm" : "Set goal"}</Text>
          </TouchableOpacity>
          {config}
        </View>
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

  bottom: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },

  top: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
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
    marginBottom: 20,
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
    color: '#333',
    marginBottom: 2
  },

  showconfigbutton: {
    height: 50,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#7fe6ff',
    borderColor: '#7fc1ff',
    borderWidth: 3
  },

  configwindow: {
    width: '100%',
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  incdecbutton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#7fe6ff',
    borderColor: '#7fc1ff',
    borderWidth: 3
  },

  currentgoalconfig: {
    backgroundColor: '#b7f1ff',
    height: 50,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: '#7fc1ff',
    borderWidth: 3
  }
});


