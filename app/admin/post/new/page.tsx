import { Button } from "@/components/Button";
import { BugIcon } from "lucide-react";

export default function AdminPostNewPage() {
  return (
    <>
      <div className="py-16 flex gap-3 items-center">
        <Button type="submit" size="sm"><BugIcon />Create Post</Button>
        <Button type="submit" variant="danger" size="md"><BugIcon />Create Post</Button>
        <Button type="submit" variant="ghost" size="lg"><BugIcon />Create Post</Button>
      </div>
        <div className="py-16 flex gap-3 items-center">
        <Button type="submit" size="sm" disabled><BugIcon />Create Post</Button>
        <Button type="submit" variant="danger" size="md" disabled><BugIcon />Create Post</Button>
        <Button type="submit" variant="ghost" size="lg" disabled><BugIcon />Create Post</Button>
      </div>
    </>
  );
}
