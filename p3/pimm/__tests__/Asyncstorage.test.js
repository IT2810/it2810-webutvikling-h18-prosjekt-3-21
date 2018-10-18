import MockStorage from "../MockStorage";

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock("AsyncStorage", AsyncStorage);

test("Testing setting of string", () => {
  AsyncStorage.setItem("test", "test");
  keys.push("test");

  let testStr;
  AsyncStorage.getItem("test")
    .then(result => {
      testStr = result;
    })
    .then(() => {
      expect(testStr.toBe("test"));
    });
});

let testTask = {
  id: 0,
  taskDesc: "Clean room",
  isCompleted: false
};

test("Testing setting and getting of task", () => {
  AsyncStorage.setItem("testTask", testTask);
  keys.push("testTask");
  let asyncTestTask;
  AsyncStorage.getItem("testTask")
    .then(result => {
      asyncTestTask = result;
    })
    .then(() => {
      expect(asyncTestTask.toBe(testTask));
    });
});

let keys = [];

test("Testing getting all keys", () => {
  let asyncStorageKeys;
  AsyncStorage.getAllKeys()
    .then(result => {
      asyncStorageKeys = result;
    })
    .then(() => {
      expect(asyncStorageKeys.toBe(keys));
    });
});

const emptyStorageClear = new MockStorage(storageCache);
let storageToBeCleared = emptyStorageClear;

test("Testing clearing the storage", () => {
  storageToBeCleared.setItem("test", "test");
  storageToBeCleared.clear();
  expect(storageToBeCleared).toBe(emptyStorageClear);
});

const emptyStorageRemove = new MockStorage(storageCache);
let removedAsyncStorage = emptyStorageRemove;

test("Testing removing an item", () => {
  removedAsyncStorage.setItem("removeTest", "string to be removed");
  removedAsyncStorage.removeItem("removeTest");
  expect(removedAsyncStorage).toBe(emptyStorageRemove);
});
