import { Button } from '@/lib/shared/components/ui/Button';
import { UI_CONFIG } from '@/config/constants';

interface BookErrorProps {
  error: Error;
  onRetry?: () => void;
}

export function BookError({ error, onRetry }: BookErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {UI_CONFIG.ERROR_TEXT}
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          {error.message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="default" size="sm">
            {UI_CONFIG.RETRY_TEXT}
          </Button>
        )}
      </div>
    </div>
  );
}
