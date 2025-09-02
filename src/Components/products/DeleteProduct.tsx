import { useState } from 'react';
import { useDeleteProduct } from '@/hooks/useProductQuery';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';

const DeleteProduct = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);

    const { mutateAsync, isPending } = useDeleteProduct();

    const handleDelete = async () => {
        try {
            await mutateAsync(id);
            setOpen(false);
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className=" p-2 rounded cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors">
                <Trash size={16} />
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete product details.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 pt-4">
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isPending}
                        className="flex-1"
                        onClick={handleDelete}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteProduct;
