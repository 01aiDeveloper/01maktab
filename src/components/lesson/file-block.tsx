import { Download, FileText } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';

interface FileBlockProps {
  url: string;
}

export function FileBlock({ url }: FileBlockProps) {
  const fileName = url.split('/').pop() || 'file';
  const fileExtension = fileName.split('.').pop()?.toUpperCase() || 'FILE';
  const downloadUrl = getMediaUrl(url);

  return (
    <a
      href={downloadUrl}
      download
      className="block bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-6 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{fileName}</p>
          <p className="text-sm text-muted-foreground">{fileExtension} file</p>
        </div>
        <Download className="w-5 h-5 text-blue-600 flex-shrink-0" />
      </div>
    </a>
  );
}
