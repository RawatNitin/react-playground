import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./App.css";
import { AbortControllerComp } from "./experiments/abort-controller";
import { ModalExperiment } from "./experiments/accessible-modal";
import { BroadcastChannelApi } from "./experiments/broadcast-channel-api";
import { Concurrency } from "./experiments/concurrency";
import { ErrorBoundary } from "./experiments/error-boundary";
import { FoldersContainer } from "./experiments/folder-structure";
import { GrpahQlExperiment } from "./experiments/graphql";
import { InfiniteScroll } from "./experiments/infinite-scroll";
import { InterSection } from "./experiments/intersection-observer";
import { KanbanBoard } from "./experiments/kanban-board";
import { MyPromise } from "./experiments/my-promise";
import { NByNGrid } from "./experiments/nByNGrid";
import { NestedComments } from "./experiments/nested-comments";
import { ProgressBar } from "./experiments/progress-bar";
import { AccordionTest } from "./experiments/react-patterns/compound-component";
import { HOCPattern } from "./experiments/react-patterns/hoc";
import { Search } from "./experiments/search";
import { Slide } from "./experiments/slide";
import { Sort } from "./experiments/sort-visualise";
import { TableViewer } from "./experiments/table";
import { Theme, ThemeProvider } from "./experiments/theme";
import { TryTabs } from "./experiments/tabs";
import { Virtualised } from "./experiments/virtualisation";
import { WebWorker } from "./experiments/web-worker";
import { FilterList } from "./experiments/deferred-value";
import { TimersContainer } from "./experiments/timers";
// import { Playground } from "./playground";

type ExperimentRoute = {
  path: string;
  title: string;
  description: string;
  element: ReactNode;
};

const normalizePath = (path: string) => {
  const normalizedPath = path.replace(/\/+$/, "");
  return normalizedPath || "/";
};

const experiments: ExperimentRoute[] = [
  {
    path: "/experiments/abort-controller",
    title: "Abort Controller",
    description: "Cancels in-flight fetch requests while typing.",
    element: <AbortControllerComp />,
  },
  {
    path: "/experiments/accessible-modal",
    title: "Accessible Modal",
    description: "Focus-aware modal rendered through a portal.",
    element: <ModalExperiment />,
  },
  {
    path: "/experiments/accordion",
    title: "Accordion",
    description: "Compound component pattern with nested slots.",
    element: <AccordionTest />,
  },
  {
    path: "/experiments/broadcast-channel-api",
    title: "Broadcast Channel API",
    description: "Shares input state between browser tabs.",
    element: <BroadcastChannelApi />,
  },
  {
    path: "/experiments/concurrency",
    title: "Concurrency",
    description: "Small concurrency experiment placeholder.",
    element: <Concurrency />,
  },
  {
    path: "/experiments/error-boundary",
    title: "Error Boundary",
    description: "Retries rendering after a component failure.",
    element: (
      <ErrorBoundary maxRetries={3}>
        <Search />
      </ErrorBoundary>
    ),
  },
  {
    path: "/experiments/folder-structure",
    title: "Folder Structure",
    description: "Expandable tree view with file and folder icons.",
    element: <FoldersContainer />,
  },
  {
    path: "/experiments/graphql",
    title: "GraphQL",
    description: "Apollo query demo pointed at a local GraphQL server.",
    element: <GrpahQlExperiment />,
  },
  {
    path: "/experiments/hoc-pattern",
    title: "HOC Pattern",
    description: "Higher-order component loading wrapper.",
    element: <HOCPattern />,
  },
  {
    path: "/experiments/infinite-scroll",
    title: "Infinite Scroll",
    description: "Loads product rows as the sentinel enters view.",
    element: <InfiniteScroll />,
  },
  {
    path: "/experiments/intersection-observer",
    title: "Intersection Observer",
    description: "Observes a sentinel at the end of a long list.",
    element: <InterSection />,
  },
  {
    path: "/experiments/kanban-board",
    title: "Kanban Board",
    description: "Static task board with priority lanes.",
    element: <KanbanBoard />,
  },
  {
    path: "/experiments/my-promise",
    title: "My Promise",
    description: "Promise polyfill experiment.",
    element: <MyPromise />,
  },
  {
    path: "/experiments/n-by-n-grid",
    title: "N by N Grid",
    description: "Selectable grid that clears chosen cells in order.",
    element: <NByNGrid rows={4} cols={4} />,
  },
  {
    path: "/experiments/nested-comments",
    title: "Nested Comments",
    description: "Recursive rendering for threaded comment trees.",
    element: <NestedComments />,
  },
  {
    path: "/experiments/progress-bar",
    title: "Progress Bar",
    description: "Queued progress bars with limited concurrency.",
    element: <ProgressBar />,
  },
  {
    path: "/experiments/search",
    title: "Search",
    description: "Debounced product typeahead.",
    element: <Search />,
  },
  {
    path: "/experiments/slide",
    title: "Slide",
    description: "Manual drag slider interaction.",
    element: <Slide />,
  },
  {
    path: "/experiments/sort-visualise",
    title: "Sort Visualise",
    description: "Bubble sort visualizer with animated bar updates.",
    element: <Sort />,
  },
  {
    path: "/experiments/table",
    title: "Table",
    description: "Sortable table component demo.",
    element: <TableViewer />,
  },
  {
    path: "/experiments/tabs",
    title: "Tabs",
    description: "Compound tabs built with contextual providers.",
    element: <TryTabs />,
  },
  {
    path: "/experiments/theme",
    title: "Theme",
    description: "Theme context provider and toggle.",
    element: (
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    ),
  },
  {
    path: "/experiments/virtualisation",
    title: "Virtualisation",
    description: "Windowed rendering for a long scroll list.",
    element: <Virtualised />,
  },
  {
    path: "/experiments/web-worker",
    title: "Web Worker",
    description: "Runs a calculation in a module worker.",
    element: <WebWorker />,
  },
  {
    path: "/experiments/deferred-value",
    title: "Filter List",
    description: "Filters list using defferedValue hook.",
    element: <FilterList />,
  },
  {
    path: "/experiments/timers",
    title: "Timers",
    description: "Count down timer with play and pause",
    element: <TimersContainer />,
  },
];

function useLocationPath() {
  const [path, setPath] = useState(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((nextPath: string) => {
    const normalizedNextPath = normalizePath(nextPath);
    if (normalizedNextPath === normalizePath(window.location.pathname)) return;

    window.history.pushState(null, "", normalizedNextPath);
    setPath(normalizedNextPath);
  }, []);

  return { path, navigate };
}

function NavLink({
  children,
  className,
  href,
  onNavigate,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  onNavigate: (path: string) => void;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}

function NavigationPage({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  return (
    <main className="navigation-page">
      <section className="navigation-hero">
        <p className="eyebrow">React Playground</p>
        <h1>Experiments</h1>
        <p>
          Pick an experiment to open its route. Each page keeps a direct URL so
          you can refresh or share it while working.
        </p>
      </section>

      <section className="experiment-grid" aria-label="Experiments">
        {experiments.map(({ path, title, description }) => (
          <NavLink
            className="experiment-card"
            href={path}
            key={path}
            onNavigate={onNavigate}
          >
            <span>{title}</span>
            <small>{description}</small>
          </NavLink>
        ))}
      </section>
    </main>
  );
}

function ExperimentPage({
  experiment,
  onNavigate,
}: {
  experiment: ExperimentRoute;
  onNavigate: (path: string) => void;
}) {
  return (
    <main className="experiment-page">
      <header className="experiment-header">
        <NavLink className="back-link" href="/" onNavigate={onNavigate}>
          Back to experiments
        </NavLink>
        <h1>{experiment.title}</h1>
        <p>{experiment.description}</p>
      </header>
      <section className="experiment-stage">{experiment.element}</section>
    </main>
  );
}

function NotFoundPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <main className="not-found-page">
      <h1>Route not found</h1>
      <p>This experiment route does not exist yet.</p>
      <NavLink className="primary-link" href="/" onNavigate={onNavigate}>
        View experiments
      </NavLink>
    </main>
  );
}

function App() {
  const { path, navigate } = useLocationPath();
  const routeMap = useMemo(
    () =>
      new Map(experiments.map((experiment) => [experiment.path, experiment])),
    [],
  );
  const activeExperiment = routeMap.get(path);

  return (
    <div id="app">
      {path === "/" ? (
        <NavigationPage onNavigate={navigate} />
      ) : activeExperiment ? (
        <ExperimentPage experiment={activeExperiment} onNavigate={navigate} />
      ) : (
        <NotFoundPage onNavigate={navigate} />
      )}

      {/* Playground */}
      {/* <Playground /> */}
    </div>
  );
}

export default App;
