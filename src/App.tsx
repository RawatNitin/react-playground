// import { IntersectionObserver } from "./experiments/intersection-observer";
// import { InfiniteScroll } from "./experiments/infinite-scroll";
// import { Virtualised } from "./experiments/virtualisation";
// import { AbortControllerComp } from "./experiments/abort-controller";
// import { MyPromise } from "./experiments/my-promise";
// import { WebWorker } from "./experiments/web-worker";
import { ModalExperiment } from "./experiments/accessible-modal";
function App() {
  return (
    <div id="app">
      {/* <IntersectionObserver />; */}
      {/* <InfiniteScroll />; */}
      {/* <Virtualised /> */}
      {/* <AbortControllerComp /> */}
      {/* <MyPromise /> */}
      {/* <WebWorker /> */}
      <ModalExperiment />
    </div>
  );
}

export default App;
