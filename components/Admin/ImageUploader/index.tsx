'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { MAX_IMG_SIZE } from '@/config/config';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ImageUploaderProps = {};

export function ImageUploader({}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [img, setImg] = useState<string>('');

  function handleClick() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMG_SIZE) {
      toast.error('Image size too big! Max size is 2MB.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (result.error) {
        toast.error(result.error);
        setImg('');
        return;
      }
      toast.success('Imagem enviada');
      setImg(result.url);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="default"
        type="button"
        className="self-start"
        onClick={handleClick}
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>

      <input
        name="file"
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {!!img && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {img}
          </p>
          <img src={img} alt="img just uploaded" className="rounded max-w-3xs" />
        </div>
      )}
    </div>
  );
}
