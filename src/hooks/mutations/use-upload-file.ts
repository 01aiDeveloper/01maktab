import { useState } from 'react';
import api from '@/lib/api';

export function useUploadFile() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data?.data?.data as string;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
}
