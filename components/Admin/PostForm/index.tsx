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
import { updatePostAction } from '@/actions/post/update-post-action';

type UpdatePostFormProps = {
  post: PublicPost;
  mode: 'update';
};

type CreatePostFormProps = {
  mode: 'create';
};

type PostFormProps = UpdatePostFormProps | CreatePostFormProps;

export function PostForm(props: PostFormProps) {
  const { mode } = props;
  let post;
  let postAction;
  if (mode === 'update') {
    post = props.post;
    postAction = updatePostAction;
  } else {
    postAction = createPostAction;
  }
  const initialState = {
    formState: makePartialPublicPost(post),
    errors: [],
  };
  const [state, action, isPending] = useActionState(postAction, initialState);
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

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post updated!');
    }
  }, [state.success]);

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <Input labelText="Id" readOnly defaultValue={formState?.id} name="id" />
        <Input labelText="Slug" readOnly defaultValue={formState?.slug} name="slug" />
        <Input
          labelText="Author"
          name="author"
          placeholder="Author"
          defaultValue={formState?.author}
          disabled={isPending}
        />
        <Input
          labelText="Title"
          placeholder="Title..."
          name="title"
          defaultValue={formState?.title}
          disabled={isPending}
        />
        <Editor
          textAreaName="content"
          labelText="Conteúdo"
          value={content}
          setValue={setContent}
          disabled={isPending}
        />
        <ImageUploader />
        <Input
          labelText="Cover image url"
          name="cover"
          defaultValue={formState?.cover}
          disabled={isPending}
        />
        <InputCheckBox
          type="checkbox"
          name="published"
          labelText="Publish?"
          defaultChecked={formState?.published}
          disabled={isPending}
        />
        <div className="mt-4">
          <Button variant="default" type="submit" disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
