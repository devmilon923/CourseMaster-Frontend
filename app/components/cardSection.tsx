"use client";

import Card from "./card";
import { useGuestCoursesQuery } from "../redux/api/call/courseApi";

export default function CardSection({ limit = 10 }: { limit: number }) {
  const { data } = useGuestCoursesQuery({ limit });
  const coursesFromApi = data?.data || [];
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {coursesFromApi.map((course: any) => (
        <Card key={course._id} course={course} />
      ))}
    </div>
  );
}
