'use client';

import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { Input } from '@/components/Input';
import { InputCheckBox } from '@/components/InputCheckBox';
import React from 'react';
import { ImageUploader } from '../ImageUploader';

export function PostForm() {
  const [content, setContent] = React.useState<string>('');

  return (
    <form action="" className="mb-16">
      <div className="flex flex-col gap-6">
        <Input labelText="Name" placeholder="Name..." />
        <ImageUploader />
        <Editor textAreaName="content" labelText="Conteúdo" value={content} setValue={setContent} />
        <div className="mt-4">
          <Button variant="default" type="submit">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
