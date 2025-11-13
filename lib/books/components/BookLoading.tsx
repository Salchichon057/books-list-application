import { Spinner } from '@/lib/shared/components/ui/Spinner';
import { UI_CONFIG } from '@/config/constants';

export function BookLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Spinner />
      <p className="mt-4 text-muted-foreground">{UI_CONFIG.LOADING_TEXT}</p>
    </div>
  );
}
