interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

export default function Loading({ 
  size = 'md', 
  text = 'Carregando...'
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
      {text && (
        <p className={`${textSizes[size]} text-gray-600 dark:text-gray-400 animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}

export function PageLoading({ text = 'Carregando...' }: { text?: string }) {
  return <Loading text={text} />;
}
