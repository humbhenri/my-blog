'use server';

import { IMG_SERVER_URL, IMG_UPLOAD_DIR, MAX_IMG_SIZE } from '@/config/config';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  if (file.size > MAX_IMG_SIZE) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image')) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const ext = extname(file.name);
  const name = `${Date.now()}${ext}`;

  const path = resolve(process.cwd(), 'public', IMG_UPLOAD_DIR);
  await mkdir(path, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);

  const filePath = resolve(path, name);
  await writeFile(filePath, buf);

  return makeResult({ url: `${IMG_SERVER_URL}/${name}` });
}
