'use client';

import { Button } from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const MAX_IMG_SIZE = 2 * 1024 * 1024;

type ImageUploaderProps = {};

export function ImageUploader({}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant="default" type="button" className="self-start" onClick={handleClick}>
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
    </div>
  );
}
