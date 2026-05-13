import "./kanban-board.css";

type Priority = "low" | "medium" | "high" | "urgent";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const COLUMNS: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      {
        id: "b1",
        title: "Research API options",
        description: "Evaluate REST vs GraphQL for the new service",
        priority: "medium",
        assignee: "Alice Chen",
      },
      {
        id: "b2",
        title: "Design system audit",
        description: "Review all components for consistency",
        priority: "low",
        assignee: "Bob Smith",
      },
      {
        id: "b3",
        title: "Write documentation",
        description: "Document the onboarding flow for new users",
        priority: "low",
        assignee: "Carol Davis",
      },
    ],
  },
  {
    id: "todo",
    title: "Todo",
    tasks: [
      {
        id: "t1",
        title: "Implement auth flow",
        description: "Set up JWT-based authentication with refresh tokens",
        priority: "high",
        assignee: "Diana Lee",
      },
      {
        id: "t2",
        title: "Add error boundaries",
        description: "Wrap major sections with React error boundaries",
        priority: "medium",
        assignee: "Eve Wang",
      },
      {
        id: "t3",
        title: "Optimize images",
        description: "Add lazy loading and WebP format support",
        priority: "low",
        assignee: "Frank Miller",
      },
      {
        id: "t4",
        title: "Set up monitoring",
        description: "Configure Datadog dashboards and alerts",
        priority: "medium",
        assignee: "Grace Kim",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "i1",
        title: "Build dashboard layout",
        description: "Create the main dashboard grid with widgets",
        priority: "high",
        assignee: "Henry Brown",
      },
      {
        id: "i2",
        title: "Fix notification bug",
        description: "Notifications not marking as read after clicking",
        priority: "urgent",
        assignee: "Iris Johnson",
      },
      {
        id: "i3",
        title: "Refactor user service",
        description: "Split monolithic service into smaller modules",
        priority: "medium",
        assignee: "Jack Wilson",
      },
      {
        id: "i4",
        title: "Add unit tests",
        description: "Achieve 80% coverage on the payment module",
        priority: "medium",
        assignee: "Kate Taylor",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "d1",
        title: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for automated deployments",
        priority: "high",
        assignee: "Leo Anderson",
      },
      {
        id: "d2",
        title: "Migrate database",
        description: "Move from PostgreSQL 12 to 16 with zero downtime",
        priority: "urgent",
        assignee: "Maria Garcia",
      },
      {
        id: "d3",
        title: "Implement dark mode",
        description: "Add theme switching with CSS custom properties",
        priority: "medium",
        assignee: "Nathan Patel",
      },
      {
        id: "d4",
        title: "Accessibility improvements",
        description: "Fix ARIA labels and keyboard navigation",
        priority: "high",
        assignee: "Olivia Martin",
      },
      {
        id: "d5",
        title: "Performance optimization",
        description: "Reduce bundle size by 40% through code splitting",
        priority: "high",
        assignee: "Quinn Davis",
      },
      {
        id: "d6",
        title: "Email templates",
        description: "Design responsive email templates for notifications",
        priority: "low",
        assignee: "Rachel Kim",
      },
      {
        id: "d6",
        title: "Email templates",
        description: "Design responsive email templates for notifications",
        priority: "low",
        assignee: "Rachel Kim",
      },
      {
        id: "d6",
        title: "Email templates",
        description: "Design responsive email templates for notifications",
        priority: "low",
        assignee: "Rachel Kim",
      },
      {
        id: "d6",
        title: "Email templates",
        description: "Design responsive email templates for notifications",
        priority: "low",
        assignee: "Rachel Kim",
      },
      {
        id: "d6",
        title: "Email templates",
        description: "Design responsive email templates for notifications",
        priority: "low",
        assignee: "Rachel Kim",
      },
    ],
  },
];

const PRIORITY_COLORS: Record<Priority, string> = {
  low: "#6b7280",
  medium: "#3b82f6",
  high: "#f59e0b",
  urgent: "#ef4444",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export const KanbanBoard = () => {
  return (
    <div className="kanban-wrapper">
      <div className="board">
        {COLUMNS.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

const Column = ({ column }: { column: Column }) => {
  return (
    <section className="column" aria-label={`${column.title} column`}>
      <header className="column-header">
        <h2 className="column-title">{column.title}</h2>
        <span
          className="task-count"
          aria-label={`${column.tasks.length} tasks`}
        >
          {column.tasks.length}
        </span>
      </header>
      <div className="card-list" role="list">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <article className="card" role="listitem" draggable>
      <div className="card-body">
        <h3 className="card-title">{task.title}</h3>
        <p className="card-desc">{task.description}</p>
        <div className="card-meta">
          <span
            className="priority-badge"
            style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
          >
            {task.priority}
          </span>
          <div className="assignee" title={task.assignee}>
            {getInitials(task.assignee)}
          </div>
        </div>
      </div>
    </article>
  );
};
