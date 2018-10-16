import { AsyncStorage } from "react-native";

export async function retrieveData() {
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
        return taskArr;
      });
    });
  } catch (error) {
    console.log(error);
    alert("Error retrieving data");
  }
}
