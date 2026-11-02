'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { Input } from '@/components/Input';
import { InputCheckBox } from '@/components/InputCheckBox';
import { makePartialPublicPost, PublicPost } from '@/dtos/PublicPost';
import React, { useActionState, useEffect } from 'react';
import { ImageUploader } from '../ImageUploader';
import { toast } from 'react-toastify';

type PostFormProps = {
  post?: PublicPost;
};

export function PostForm({ post }: PostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(post),
    errors: [],
  };
  const [state, action, isPending] = useActionState(createPostAction, initialState);
  const { formState } = state;
  const [content, setContent] = React.useState<string>(post?.content || '');

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  }, [state.errors]);

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <Input labelText="Id" disabled defaultValue={formState?.id} name="id" />
        <Input labelText="Slug" disabled defaultValue={formState?.slug} name="slug" />
        <Input
          labelText="Author"
          name="author"
          placeholder="Author"
          defaultValue={formState?.author}
        />
        <Input
          labelText="Title"
          placeholder="Title..."
          name="title"
          defaultValue={formState?.title}
        />
        <Editor textAreaName="content" labelText="Conteúdo" value={content} setValue={setContent} />
        <ImageUploader />
        <Input labelText="Cover image url" name="cover" defaultValue={formState?.cover} />
        <InputCheckBox
          type="checkbox"
          name="published"
          labelText="Publish?"
          defaultChecked={formState?.published}
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
