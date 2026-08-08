const savedItems = [
  {
    id: 1,
    type: "link",
    title: "Complete JWT Authentication Guide",
    description:
      "A practical guide explaining access tokens, refresh tokens and protected Express routes.",
    source: "YouTube",
    url: "https://youtu.be/vVgtZC5vHa8?si=w3eXpJptPZJO1YEa",
    tags: ["React", "JWT", "Authentication"],
    userNote: "Useful for building the Recall login system.",
    savedAt: "2026-08-04",
    isFavourite: true,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    type: "screenshot",
    title: "MongoDB authentication error",
    description:
      "Screenshot captured while debugging a MongoDB connection and authentication problem.",
    source: "Screenshot",
    url: "",
    tags: ["MongoDB", "Error", "Backend"],
    userNote:
      "Check the database username and password if this happens again.",
    savedAt: "2026-08-03",
    isFavourite: false,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    type: "note",
    title: "React controlled form notes",
    description:
      "Controlled inputs store their values in React state and update through onChange.",
    source: "Personal note",
    url: "",
    tags: ["React", "Forms", "Learning"],
    userNote:
      "Review before connecting login forms to the backend.",
    savedAt: "2026-08-02",
    isFavourite: true,
    thumbnail: "",
  },
  {
    id: 4,
    type: "link",
    title: "MongoDB Atlas Vector Search",
    description:
      "Documentation and examples for implementing semantic search with MongoDB vectors.",
    source: "MongoDB",
    url: "https://www.mongodb.com/",
    tags: ["MongoDB", "Vector Search", "AI"],
    userNote:
      "Required later for natural-language memory search.",
    savedAt: "2026-07-30",
    isFavourite: false,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    type: "link",
    title: "Modern dashboard design inspiration",
    description:
      "A collection of clean dashboard interfaces with sidebars, cards and responsive layouts.",
    source: "Design article",
    url: "https://dribbble.com/",
    tags: ["UI", "Dashboard", "Design"],
    userNote: "Use for improving the Recall dashboard.",
    savedAt: "2026-07-28",
    isFavourite: false,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    type: "note",
    title: "Recall product idea",
    description:
      "Save links, notes and screenshots, then find them later using incomplete memories.",
    source: "Personal note",
    url: "",
    tags: ["Recall", "Product", "Idea"],
    userNote: "This is the main purpose of the project.",
    savedAt: "2026-07-17",
    isFavourite: true,
    thumbnail: "",
  },
];

export default savedItems;