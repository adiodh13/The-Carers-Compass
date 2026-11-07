// app/course/layout.tsx
import CourseShell from "@/components/course/CourseShell";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <CourseShell>{children}</CourseShell>;
}
