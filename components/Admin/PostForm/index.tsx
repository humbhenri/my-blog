"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputCheckBox } from "@/components/InputCheckBox";

export function PostForm() {
  return (
    <form action="" className="mb-16">
      <div className="flex flex-col gap-6">
        <Input labelText="Blah" placeholder="Blah" />
        <Input labelText="Blah" placeholder="Blah" disabled />
        <Input labelText="Blah" placeholder="Blah" readOnly />
        <InputCheckBox type="radio" labelText="Fuck you" name="test" />
        <InputCheckBox type="radio" labelText="Fuck you 2" name="test" />
        <InputCheckBox type="radio" labelText="Fuck you 3" name="test" />
        <div className="mt-4">
          <Button variant="default" type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  )
}