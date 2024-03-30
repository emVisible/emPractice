/**
 * 异步处理方案之一
 *   发布订阅
*/

interface EventType {
  [key: string]: Function[];
}

class ObserverClass {
  events: EventType = {};
  constructor() {}

  on(key: string, callback: Function) {
    if (!this.events[key]) {
      this.events[key] = [];
    }
    this.events[key].push(callback);
  }

  emit(key: string) {
    if (!this.events[key]) throw new Error("Key不存在");
    this.events[key].forEach((item) => {
      item();
    });
    console.log("🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
    console.log("执行完毕");
    console.log("🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
  }
}

export default function Observer() {
  const observer = new ObserverClass();
  // 订阅相应的callback
  observer.on("code", () => {
    console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
    console.log("CODE 1");
    console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
  });
  observer.on("code", () => {
    console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
    console.log("CODE 2");
    console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
  });
  observer.on("code", () => {
    console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
    console.log("CODE 3");
    console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
  });

  new Promise((resolve) => {
    setTimeout(() => {
      resolve("DELAY 3s, THEN RUN");
    }, 3000);
  }).then((res) => {
    console.log(res);
    // 发布
    observer.emit("code");
  });

  return <section>observer OPEN</section>;
}
