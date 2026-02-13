import { AlertCircle, Info, Lightbulb } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

interface InfoBlockProps {
  text: string;
  status: 'Important' | 'Tip' | 'Attention';
}

const STATUS_CONFIG = {
  Important: {
    icon: AlertCircle,
    title: 'Важно',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    textColor: 'text-yellow-900',
  },
  Tip: {
    icon: Lightbulb,
    title: 'Совет',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    textColor: 'text-green-900',
  },
  Attention: {
    icon: Info,
    title: 'Внимание',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    textColor: 'text-red-900',
  },
};

export function InfoBlock({ text, status }: InfoBlockProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} border ${config.borderColor} rounded-2xl p-6`}>
      <div className="flex gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold text-lg mb-2 ${config.textColor}`}>{config.title}</h4>
          <div className={`prose prose-sm ${config.textColor}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
        </div>
      </div>
    </div>
  );
}
