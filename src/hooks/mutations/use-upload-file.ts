import { useState } from 'react';
import { fileApi } from '@/services/react-query/file';

export function useUploadFile() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      return fileApi.upload(file);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
}
