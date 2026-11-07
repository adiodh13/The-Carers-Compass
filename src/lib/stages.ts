// src/lib/stages.ts
// The route through the guide. Home's roadmap and the guide sidebar both draw from this.

export type Stop = {
  slug: string;
  href: string;
  title: string;
  /** Section number; only the five sections have one. */
  number?: number;
  blurb?: string;
};

export const SECTIONS: Stop[] = [
  {
    slug: "section-1",
    href: "/course/section-1",
    number: 1,
    title: "Steadying Yourself",
    blurb: "Easing panic and overwhelm, and taking your first small steps",
  },
  {
    slug: "section-2",
    href: "/course/section-2",
    number: 2,
    title: "Mapping the Road Ahead",
    blurb: "Asking clinicians the right questions and organising your information",
  },
  {
    slug: "section-3",
    href: "/course/section-3",
    number: 3,
    title: "Gaining Knowledge",
    blurb: "Researching what matters without burning out",
  },
  {
    slug: "section-4",
    href: "/course/section-4",
    number: 4,
    title: "Building Support",
    blurb: "Finding who can help and sharing the load with family and friends",
  },
  {
    slug: "section-5",
    href: "/course/section-5",
    number: 5,
    title: "Moving Forward",
    blurb: "Legal and admin basics, and caring sustainably for the road ahead",
  },
];

export const HOW_TO_USE: Stop = {
  slug: "how-to-use",
  href: "/course/how-to-use",
  title: "How to use this guide",
};

export const FINISH: Stop = {
  slug: "finish",
  href: "/course/finish",
  title: "Finish",
};

/** Every stop on the path, in order. */
export const STOPS: Stop[] = [HOW_TO_USE, ...SECTIONS, FINISH];
