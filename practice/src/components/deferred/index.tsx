/**
 * 异步处理方案之二:
 *   Promise-Deffer
 * 核心原理是通过外部的变量来控制promise的状态更改
 */
class DeferredClass {
  constructor() {}
  level1(delay: number) {
    const res = new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[LEVEL1]延迟到${delay}s后then`);
      }, delay);
    });

    res.then((res): void => {
      console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
      console.log(res);
      console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
    });
  }
  level2(delay: number) {
    let resolveFn: any;

    const res = new Promise((resolve: unknown) => {
      resolveFn = resolve;
    });

    setTimeout(() => {
      resolveFn(`[LEVEL2]延迟到${delay}s后then`);
    }, delay);

    res.then((value) => {
      console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
      console.log(value);
      console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
    });
  }
  level3(delay: number) {
    type objType = {
      resolveFn?: Function;
      rejectFn?: Function;
      promise?: Promise<any>;
    };
    let obj: objType = {};

    obj.promise = new Promise((resolve, reject) => {
      obj.resolveFn = resolve;
      obj.rejectFn = reject;
    });

    setTimeout(() => {
      obj.resolveFn!("[LEVEL3] DEALY RESOLVE OVER");
      // obj.rejectFn!("[LEVEL3] DELAY REASON OVER")
    }, delay);

    obj.promise
      .then((value) => {
        console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
        console.log(value);
        console.log("🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
      })
      .catch((reason) => {
        console.log("🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
        console.log(reason);
        console.log("🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸");
      });
  }
}

function Deferred() {
  const instance = new DeferredClass();
  instance.level1(1000);
  instance.level2(2000);
  instance.level3(3000);
  return <section>defferred OPEN</section>;
}

export default Deferred;
