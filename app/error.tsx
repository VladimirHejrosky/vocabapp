'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Unexpected error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4">
      <Card className="text-center">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <CardTitle className="text-2xl">Došlo k chybě</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Omlouváme se, něco se nepovedlo. Zkus to prosím znovu, nebo se vrať na hlavní stránku.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button onClick={() => reset()}>Zkusit znovu</Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Zpět do menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
