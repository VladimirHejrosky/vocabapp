import { Skeleton } from "@/components/ui/skeleton";

export default function MenuSkeleton() {
  return (
    <div className="flex flex-col gap-4 my-4 min-w-54">
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
