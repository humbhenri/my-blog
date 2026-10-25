import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { BugIcon } from "lucide-react";

export default function AdminPostNewPage() {
  return (
    <div className="flex flex-col gap-2">
      <Input labelText="Blah" placeholder="Blah" />
      <Input labelText="Blah" placeholder="Blah" disabled />
      <Input labelText="Blah" placeholder="Blah" readOnly />
    </div>
  );
}
