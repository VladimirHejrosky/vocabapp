'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteAlbum } from '@/lib/db/db-actions';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  albumId: number;
  userId: string;
}

const DeleteAlbumDialog = ({ albumId, userId }: Props) => {
  const router = useRouter()
  const handleDelete = async () => {
    await deleteAlbum(userId, albumId)
    router.push("/albums")
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          <span className='hidden md:block'>Smazat</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Opravdu chceš smazat album?</AlertDialogTitle>
          <AlertDialogDescription>
            Tato akce je nevratná. Album bude trvale odstraněno.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Smazat</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlbumDialog;
