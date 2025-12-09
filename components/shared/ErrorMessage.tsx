interface ErrorMessageProps {
  message: string;
  title?: string;
}

export default function ErrorMessage({ 
  message, 
  title = 'Erro',
}: ErrorMessageProps) {
  const content = (
    <div className='flex flex-col items-center justify-center gap-4 p-8'>
      <div className='flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20'>
        <svg
          className='w-8 h-8 text-red-600 dark:text-red-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
      <div className='text-center max-w-md'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
          {title}
        </h3>
        <p className='text-red-600 dark:text-red-400'>
          {message}
        </p>
      </div>
    </div>
  );

  return content;
}

export function PageError({ message, title }: { message: string; title?: string }) {
  return <ErrorMessage message={message} title={title} />;
}
