export type Project = {
  slug: string;
  title: string;
  kind: string;
  repo: string;
  url: string;
  /** Last push to the repository, `YYYY.MM`. */
  lastPush: string;
  summary: string;
  problem: string;
  approach: string;
  built: string;
  tags: string[];
  /** Byte counts per language as reported by the GitHub languages API. */
  languages: Record<string, number>;
  /** Longer-form notes for the case-study page, each read from the repo. */
  sections: { heading: string; items: string[] }[];
};

const gh = (repo: string) => `https://github.com/GandharMarathe/${repo}`;

// Every fact below was read from the repository itself (README, manifests,
// source). Keep it that way: no metrics, users, or claims the repo can't back.
export const projects: Project[] = [
  {
    slug: "keystone",
    title: "Project KEYSTONE",
    kind: "Field service management platform",
    repo: "Project-KEYSTONE-Field-Service-Management-Platform",
    url: gh("Project-KEYSTONE-Field-Service-Management-Platform"),
    lastPush: "2026.09",
    summary:
      "A full-stack platform for running field-service operations: work orders, technician dispatch and SLA tracking, with a separate portal for each role.",
    problem:
      "Managers, technicians and customers all touch the same job, but each needs a different view of it — and none of them should see more than their role allows.",
    approach:
      "One monorepo, three portals: an operations dashboard for managers and dispatchers, a My Jobs view for technicians, and a self-service portal for customers, behind JWT authentication and role-based access.",
    built:
      "Spring Boot API on PostgreSQL with Flyway migrations, a React + TypeScript + Vite front end, a Playwright end-to-end test, and Docker, Render and Netlify deployment config.",
    tags: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "JWT", "Flyway", "Docker", "Playwright"],
    languages: { TypeScript: 139445, Java: 95722, Dockerfile: 485, HTML: 376 },
    sections: [
      {
        heading: "Three portals",
        items: [
          "Manager / Dispatcher — operations dashboard and work orders.",
          "Technician — a My Jobs view of assigned work in the field.",
          "Customer — a self-service portal.",
        ],
      },
      {
        heading: "Repository layout",
        items: [
          "backend/ — the Spring Boot API.",
          "frontend/ — the React + TypeScript + Vite interface.",
          "docs/ — specifications, a system design document and a development log.",
        ],
      },
      {
        heading: "Running and shipping",
        items: [
          "The PostgreSQL schema is created by Flyway migrations on first start.",
          "A Playwright end-to-end test runs against the live stack.",
          "The API and database deploy to Render from a blueprint and Dockerfile; the static UI deploys to Netlify.",
        ],
      },
    ],
  },
  {
    slug: "taciturnus",
    title: "Taciturnus",
    kind: "Collaborative AI chat space",
    repo: "Taciturnus",
    url: gh("Taciturnus"),
    lastPush: "2025.11",
    summary:
      "Real-time chat rooms where an AI assistant sits in the conversation and can be called on to summarise, plan or explain.",
    problem:
      "Group conversations lose their thread. Decisions and next steps get buried under the messages that came after them.",
    approach:
      "Rooms joined by access code, with an assistant addressed in-line — @AI summarize, @AI next steps, @AI explain — and four modes: Summarizer, Brainstorm, Moderator and Research.",
    built:
      "Express + Socket.io server with Firestore persistence and OpenAI integration; Next.js client with Zustand state, reactions, typing indicators, read receipts, pinned messages, file sharing and chat export.",
    tags: ["Next.js", "React", "Socket.io", "Express", "Firestore", "OpenAI API", "Zustand", "Tailwind CSS"],
    languages: { JavaScript: 56011, CSS: 2853 },
    sections: [
      {
        heading: "AI in the room",
        items: [
          "@AI summarize — a summary of the recent discussion.",
          "@AI next steps — suggested action items from the conversation.",
          "@AI explain [topic] — research and explanation on request.",
          "Automatic conversation summaries every ten minutes.",
        ],
      },
      {
        heading: "Chat features",
        items: [
          "Message reactions, editing and deletion.",
          "Typing indicators and read receipts.",
          "Pinned messages and image sharing.",
          "Dark and light themes, browser notifications and export to a text file.",
        ],
      },
      {
        heading: "Architecture",
        items: [
          "An Express server with Socket.io handles rooms and real-time events.",
          "Separate services wrap Firestore persistence and the OpenAI integration.",
          "A Next.js app-router client keeps state in Zustand stores.",
        ],
      },
    ],
  },
  {
    slug: "intrusion-detection",
    title: "Intrusion Detection",
    kind: "ML network traffic classifier",
    repo: "aiml_final",
    url: gh("aiml_final"),
    lastPush: "2026.09",
    summary:
      "A Random Forest classifier trained on the CICIDS2017 dataset to label network traffic as benign or as a type of attack.",
    problem:
      "Raw flow captures are noisy — missing values, infinities, imbalanced classes — long before a model can say anything useful about them.",
    approach:
      "A small, readable pipeline split by responsibility: load and clean, encode and split, train, then evaluate on held-out traffic.",
    built:
      "Preprocessing, training and evaluation scripts reporting accuracy, precision, recall, F1 and a confusion matrix, plus feature-importance and correlation plots and a persisted model.",
    tags: ["Python", "scikit-learn", "pandas", "imbalanced-learn", "Matplotlib", "seaborn"],
    languages: { Python: 6761 },
    sections: [
      {
        heading: "Pipeline",
        items: [
          "preprocess.py — loads the CSV, drops NaN and infinite values, encodes labels and splits the data.",
          "train_model.py — trains a RandomForestClassifier and saves the model with joblib.",
          "evaluate.py — reports accuracy, precision, recall, F1 and a confusion matrix.",
        ],
      },
      {
        heading: "Dataset",
        items: [
          "CICIDS2017, a public network-flow dataset from the Canadian Institute for Cybersecurity.",
          "Each flow is labelled as benign or as a specific attack type.",
        ],
      },
      {
        heading: "Outputs",
        items: [
          "A feature-importance plot showing which flow features drive the classifier.",
          "A correlation heatmap of the input features.",
        ],
      },
    ],
  },
  {
    slug: "canteen",
    title: "APSIT Canteen",
    kind: "College canteen ordering system",
    repo: "MiniProject",
    url: gh("MiniProject"),
    lastPush: "2025.10",
    summary:
      "A food-ordering app for a college canteen: students browse the menu and order, admins manage what is on it.",
    problem:
      "A canteen counter at peak hour is a queue. Ordering needs to move off the counter and onto a screen.",
    approach:
      "A React front end talking to a REST API with separate user and admin paths for registration, login and menu management.",
    built:
      "React client with landing and menu views; Spring Boot backend with Spring Data JPA on MySQL exposing user and menu endpoints.",
    tags: ["React", "Spring Boot", "Spring Data JPA", "MySQL", "Java 17"],
    languages: { JavaScript: 50846, CSS: 34584, Java: 7721, HTML: 297 },
    sections: [
      {
        heading: "REST API",
        items: [
          "POST /api/users/register and /api/users/login for accounts.",
          "GET /api/menu to list menu items.",
          "POST, PUT and DELETE on /api/menu for admins to manage the menu.",
        ],
      },
      {
        heading: "Stack",
        items: [
          "React 18 client with landing and menu views.",
          "Spring Boot backend using Spring Web and Spring Data JPA.",
          "MySQL database, built with Maven on Java 17.",
        ],
      },
    ],
  },
  {
    slug: "digit-nn",
    title: "Digit Neural Network",
    kind: "Neural network from scratch",
    repo: "digit_neural-network",
    url: gh("digit_neural-network"),
    lastPush: "2025.08",
    summary:
      "A two-layer neural network written by hand in NumPy and trained on MNIST handwritten digits.",
    problem:
      "Frameworks hide the part worth understanding: what a forward pass, a gradient and a weight update actually are.",
    approach:
      "No deep-learning framework for the model — weights, sigmoid activations, forward pass and backpropagation are all plain matrix operations.",
    built:
      "A single-file network class with initialisation, forward and backward passes and gradient updates, trained on the MNIST dataset.",
    tags: ["Python", "NumPy", "MNIST", "Matplotlib"],
    languages: { Python: 3869 },
    sections: [
      {
        heading: "The network",
        items: [
          "Input, one hidden layer and an output layer, with sigmoid activations.",
          "Weights initialised with scaling by layer size; biases start at zero.",
          "The forward pass is two matrix products; backpropagation derives each layer’s gradients by hand and averages them over the batch.",
        ],
      },
      {
        heading: "Data",
        items: [
          "Trained on the MNIST handwritten-digit dataset.",
        ],
      },
    ],
  },
  {
    slug: "animal-rescue",
    title: "NGO Animal Rescue",
    kind: "Solution Challenge build",
    repo: "solutions-Project",
    url: gh("solutions-Project"),
    lastPush: "2025.03",
    summary:
      "A platform concept for reporting injured animals and connecting the report to NGOs and volunteers who can respond.",
    problem:
      "Someone who finds an injured animal rarely knows which organisation nearby can actually help.",
    approach:
      "Model the whole response: reporters, volunteers, donors and NGOs as roles, and each animal as a located case moving from injured to rescued, rehabilitated and adopted.",
    built:
      "A relational schema covering users, NGOs and geo-located animal reports, with a Django backend and HTML front end.",
    tags: ["Python", "Django", "SQL", "HTML"],
    languages: { Python: 8758, HTML: 2508 },
    sections: [
      {
        heading: "Data model",
        items: [
          "Users carry one of four roles: admin, volunteer, donor or NGO.",
          "NGOs are stored with address and contact details.",
          "Each animal report records species, injury description, latitude and longitude, and who reported it.",
          "A case moves through four states: injured, rescued, rehabilitated, adopted.",
        ],
      },
      {
        heading: "Stack",
        items: [
          "A Django project for the backend.",
          "HTML pages for the front end.",
        ],
      },
    ],
  },
];

export type Capability = {
  title: string;
  description: string;
  tech: string[];
  seenIn: string[];
};

// Only technologies that appear in the repositories above.
export const capabilities: Capability[] = [
  {
    title: "Full-stack engineering",
    description:
      "Interfaces and the APIs behind them, built as one system — typed front ends, REST contracts and a data model that fits both.",
    tech: ["React", "Next.js", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "REST APIs"],
    seenIn: ["Project KEYSTONE", "Taciturnus", "APSIT Canteen"],
  },
  {
    title: "Backend & systems",
    description:
      "Services with real concerns: authentication, role-based access, schema migrations and real-time transport.",
    tech: ["Spring Boot", "Spring Data JPA", "Node.js", "Express", "Socket.io", "Django", "PostgreSQL", "MySQL", "Firestore", "JWT"],
    seenIn: ["Project KEYSTONE", "Taciturnus", "NGO Animal Rescue"],
  },
  {
    title: "AI / ML",
    description:
      "From the maths up: a network written by hand, classical models on real datasets, and LLMs wired into products.",
    tech: ["Python", "NumPy", "scikit-learn", "pandas", "imbalanced-learn", "OpenAI API"],
    seenIn: ["Intrusion Detection", "Digit Neural Network", "Taciturnus"],
  },
  {
    title: "DevOps & delivery",
    description:
      "Getting software off the laptop: containers, deploy blueprints, database migrations and end-to-end tests.",
    tech: ["Docker", "Git", "Flyway", "Playwright", "Render", "Netlify"],
    seenIn: ["Project KEYSTONE"],
  },
  {
    title: "UI & product",
    description:
      "Deciding what each person on the other side of the screen needs to see — role-specific portals, real-time feedback, clear hierarchy.",
    tech: ["Responsive layout", "Role-based views", "Real-time UI", "State management"],
    seenIn: ["Project KEYSTONE", "Taciturnus"],
  },
];
