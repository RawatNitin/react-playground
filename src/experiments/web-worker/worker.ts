self.onmessage = (e: MessageEvent) => {
  console.log("message in worker", e);
  let sum = 0;
  for (let i = 0; i < 10000; i++) {
    sum += i;
  }
  self.postMessage(sum);
};
