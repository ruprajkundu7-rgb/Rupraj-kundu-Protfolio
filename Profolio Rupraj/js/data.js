/* ==========================================================================
   EDIT ME  —  Everything you see on the site comes from this one object.
   ==========================================================================
   Change the text below and the whole portfolio updates (both the phone
   experience and the laptop experience). Nothing else needs touching.

   Quick map:
     identity   -> your name, role, intro, avatar/photo
     about      -> the paragraph on the About screen
     education  -> school / college entries
     interests  -> the small chips under About
     skills     -> grouped skill list. level is 1-5 (drives the little meter)
     projects   -> project cards. Set links to "" to hide that button.
     experience -> timeline entries, newest first
     contact    -> email + profile links
   ========================================================================== */

const PORTFOLIO = {

  identity: {
    name: "Rupraj Kundu",
    // Shown under the name on both experiences.
    role: "BCA (Hons. with Research) Student & Developer",
    // The short introduction on the Home screen.
    intro:
      "I build web applications and mobile apps with clean user interfaces, " +
      "robust back ends, and solid computer science principles. Currently pursuing " +
      "BCA (Hons.) with Research at Amity University, Kolkata.",
    // Small facts that sit beside the intro on the laptop layout.
    facts: [
      { value: "10+", label: "technologies" },
      { value: "4",  label: "projects shipped" },
      { value: "2",  label: "work & intern roles" }
    ],
    // TO USE A REAL PHOTO: drop your image in assets/ and set the path here,
    // e.g. photo: "assets/profile.jpg"
    // Leave it as "" and a generated monogram avatar is used instead.
    photo: "",
    location: "Kolkata, West Bengal, India",
    // Used for the resume button. Set to "" to hide the button.
    resume: ""
  },

  about: {
    heading: "About me",
    body: [
      "I'm a computer science student pursuing BCA (Hons.) with Research at Amity University, Kolkata. " +
      "My foundational schooling was completed at Falakata High School.",
      "I specialize in full-stack web development and mobile app development using HTML, JavaScript, Java, " +
      "Python, C, SQL, Firebase, Git, GitHub, Android Studio, and modern development tools. " +
      "I love solving complex coding problems and building efficient software solutions."
    ]
  },

  education: [
    {
      title: "BCA (Hons.) with Research",
      place: "Amity University, Kolkata",
      period: "2024 — 2028",
      note: "Coursework in Data Structures & Algorithms, DBMS, Operating Systems, Networks, and Software Engineering."
    },
    {
      title: "Higher Secondary",
      place: "Falakata High School",
      period: "2020 — 2022",
      note: "Completed higher secondary education with a strong focus in Computer Science."
    }
  ],

  interests: [
    "Web Development",
    "Android Development",
    "Data Structures & Algorithms",
    "Open Source",
    "Cybersecurity",
    "System Design"
  ],

  skills: [
    {
      group: "Languages",
      items: [
        { name: "HTML",       level: 5 },
        { name: "JavaScript", level: 5 },
        { name: "Java",       level: 4 },
        { name: "Python",     level: 4 },
        { name: "C",          level: 4 },
        { name: "SQL",        level: 4 }
      ]
    },
    {
      group: "Tools & Design",
      items: [
        { name: "Figma",          level: 4 },
        { name: "Git",            level: 5 },
        { name: "GitHub",         level: 5 },
        { name: "Android Studio", level: 4 },
        { name: "Firebase",       level: 4 }
      ]
    },
    {
      group: "Web & Back end",
      items: [
        { name: "CSS",        level: 5 },
        { name: "Node.js",    level: 4 },
        { name: "MongoDB",    level: 4 }
      ]
    },
    {
      group: "Core Fundamentals",
      items: [
        { name: "DSA",           level: 4 },
        { name: "Cybersecurity", level: 4 }
      ]
    }
  ],

  projects: [
    {
      name: "Offline Mesh Messaging System",
      blurb: "An internet-free communication system for exchanging messages using nearby Bluetooth and multi-hop communication.",
      tech: ["Android", "Kotlin", "Bluetooth", "Mesh Networking"],
      icon: "radar",
      github: "https://github.com/ruprajkundu7-rgb",
      demo: ""
    },
    {
      name: "Recursive Education",
      blurb: "A personalized mobile learning platform giving students structured learning experiences with progress tracking.",
      tech: ["React Native", "Firebase", "JavaScript", "Cloud Firestore"],
      icon: "campus",
      github: "https://github.com/ruprajkundu7-rgb",
      demo: ""
    },
    {
      name: "Location Intelligence Cyber Research",
      blurb: "Consent-based cybersecurity research demonstrating location, weather, and camera telemetry after user permissions.",
      tech: ["HTML", "CSS", "JavaScript", "Geolocation API", "Weather API"],
      icon: "shield",
      github: "https://github.com/ruprajkundu7-rgb",
      demo: ""
    },
    {
      name: "AI Token Usage Analyzer",
      blurb: "A developer dashboard for analyzing AI API consumption, token counts, request rates, limits, and cost estimation.",
      tech: ["HTML", "CSS", "JavaScript", "REST API", "AI APIs"],
      icon: "graph",
      github: "https://github.com/ruprajkundu7-rgb",
      demo: ""
    }
  ],

  experience: [
    {
      role: "Software / Web Development",
      org: "Warshall Agency",
      period: "Work Experience",
      current: true,
      points: [
        "Worked on software and web development projects while gaining practical experience in building and designing digital solutions.",
        "Key skills & tags: Web Development, Software, UI Design."
      ]
    },
    {
      role: "Cyber Security Intern",
      org: "Travarsa Private Limited",
      period: "Internship",
      current: false,
      points: [
        "Gained practical experience in cybersecurity, security analysis, system security and basic security tools and techniques.",
        "Key skills & tags: Cyber Security, Security Analysis, System Security."
      ]
    }
  ],

  contact: {
    blurb: "Open to internships, junior developer roles and interesting " +
           "side projects. I reply within a day.",
    email: "ruprajkundu7@gmail.com",
    links: [
      { label: "LinkedIn", handle: "in/rupraj-kundu-4b4b26311", url: "https://www.linkedin.com/in/rupraj-kundu-4b4b26311/", icon: "linkedin" },
      { label: "GitHub",   handle: "ruprajkundu7-rgb",          url: "https://github.com/ruprajkundu7-rgb",             icon: "github" }
    ]
  },

  // Lines that type out during the laptop boot sequence. Keep them short.
  bootLog: [
    "rk-portfolio bootloader v2.6",
    "mounting /dev/projects ......... ok",
    "loading skills.json ............ ok",
    "starting display server ........ ok",
    "welcome back"
  ]
};

/* Expose it so main.js can fail gracefully if this file ever goes missing. */
window.PORTFOLIO = PORTFOLIO;
