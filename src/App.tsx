// import { IntersectionObserver } from "./experiments/intersection-observer";
// import { InfiniteScroll } from "./experiments/infinite-scroll";
// import { Virtualised } from "./experiments/virtualisation";
// import { AbortControllerComp } from "./experiments/abort-controller";
// import { MyPromise } from "./experiments/my-promise";
// import { WebWorker } from "./experiments/web-worker";
// import { ModalExperiment } from "./experiments/accessible-modal";
// import { AccordionTest } from "./experiments/react-patterns/compound-component";
// import { BroadcastChannelApi } from "./experiments/broadcast-channel-api";
// import { NByNGrid } from "./experiments/nByNGrid";
import { KanbanBoard } from "./experiments/kanban-board";

function App() {
  return (
    <div id="app">
      {/* <IntersectionObserver />; */}
      {/* <InfiniteScroll />; */}
      {/* <Virtualised /> */}
      {/* <AbortControllerComp /> */}
      {/* <MyPromise /> */}
      {/* <WebWorker /> */}
      {/* <ModalExperiment /> */}
      {/* <AccordionTest /> */}
      {/* <BroadcastChannelApi /> */}
      <KanbanBoard />
    </div>
  );
}

export default App;
