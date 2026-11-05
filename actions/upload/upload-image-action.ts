'use server';

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

  const maxImgSize = Number(process.env.NEXT_PUBLIC_MAX_IMG_SIZE);
  if (file.size > maxImgSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image')) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const ext = extname(file.name);
  const name = `${Date.now()}${ext}`;

  const imgUploadDir = process.env.IMG_UPLOAD_DIR;
  const path = resolve(process.cwd(), 'public', imgUploadDir!);
  await mkdir(path, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);

  const filePath = resolve(path, name);
  await writeFile(filePath, buf);

  const imgServerUrl = process.env.IMG_SERVER_URL;
  return makeResult({ url: `${imgServerUrl}/${name}` });
}
