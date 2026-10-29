'use client';

import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { Input } from '@/components/Input';
import React from 'react';
import { ImageUploader } from '../ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';
import { PublicPost } from '@/dtos/PublicPost';

type PostFormProps = {
  post?: PublicPost;
};

export function PostForm({ post }: PostFormProps) {
  const [content, setContent] = React.useState<string>(post?.content || '');

  return (
    <form action="" className="mb-16">
      <div className="flex flex-col gap-6">
        <Input labelText="Id" disabled defaultValue={post?.id} name="id" />
        <Input labelText="Slug" disabled defaultValue={post?.slug} name="slug" />
        <Input labelText="Author" name="author" placeholder="Author" defaultValue={post?.author} />
        <Input labelText="Title" placeholder="Title..." name="title" defaultValue={post?.title} />
        <Editor textAreaName="content" labelText="Conteúdo" value={content} setValue={setContent} />
        <ImageUploader />
        <Input labelText="Cover image url" name="cover" defaultValue={post?.cover} />
        <InputCheckBox
          type="checkbox"
          name="published"
          labelText="Publish?"
          defaultChecked={post?.published}
        />
        <div className="mt-4">
          <Button variant="default" type="submit">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
