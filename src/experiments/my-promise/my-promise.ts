const STATE = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
} as const;

// https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a

// https://codesandbox.io/p/sandbox/promise-pollyfill-4otie?file=%2Fsrc%2Findex.js%3A16%2C26

type MyPromiseState = (typeof STATE)[keyof typeof STATE];

export class MyPromise {
  /* Promise must have 4 to start
        - state: pending, fullfilled, rejected
        - value
        - reason for rejection
        - then function
    */

  state: MyPromiseState;
  value: string;
  reason: string;
  resolveHandlers: Function[];
  rejectHandlers: Function[];

  constructor(handlerFn) {
    this.state = STATE.PENDING;
    this.resolveHandlers = [];
    this.rejectHandlers = [];

    const resolve = function (res) {
      this.value = res;
      this.err = null;
      this.state = STATE.FULLFILLED;
      this.resolveHandlers.forEach((handler) => {
        handler(res);
      });
    };

    const reject = function (err) {
      this.value = null;
      this.reason = err;
      this.state = STATE.REJECTED;
      this.rejectHandlers.forEach((handler) => {
        handler(err);
      });
    };

    try {
      handlerFn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onResolve, onReject) {
    if (this.state === STATE.PENDING) {
      this.resolveHandlers.push(onResolve);
      this.rejectHandlers.push(onReject);
    }

    if (this.state === STATE.FULLFILLED) {
      onResolve(this.value);
    }

    if (this.state === STATE.REJECTED) {
      onReject(this.reason);
    }
  }

  all(promises) {
    const results = [];
    let completed = 0;
    return new Promise((onResolve, onReject) => {
      promises.forEach((promise, index) => {
        promise.then(
          (result) => {
            results[index] = result;
            completed++;
            if (completed === promise.length) onResolve(results);
          },
          (err) => {
            results[index] = err;
            completed++;
            if (completed === promise.length) onReject(results);
          },
        );
      });
    });
  }
}

// *****************************************************************************************

const resolve = (res) => {
  console.log(res);
};

const reject = (err) => {
  console.error(err);
};

const catchFn = (err) => {
  console.error("catchFn", err);
};

const tryPromise = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
    // rej("error");
  }, 1000);
});

tryPromise.then(resolve, reject).catch(catchFn);
