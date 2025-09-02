import type { Product } from '@/api/api';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { useUpdateProduct } from '@/hooks/useProductQuery';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';

interface EditProductProps {
    product: Product;
}
const EditProduct = ({ product }: EditProductProps) => {
    const [formData, setFormData] = useState({
        title: product.title,
        price: product.price,
        category: product.category,
        stock: product.stock,
    });
    const [open, setOpen] = useState(false);

    const { mutateAsync, isPending } = useUpdateProduct();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await mutateAsync({ id: product.id, product: formData });
            setOpen(false);
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: [value],
        }));
    };

    const handleCancel = () => {
        setFormData({
            title: product.title,
            price: product.price,
            category: product.category,
            stock: product.stock,
        });
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-primary text-accent border px-3 py-1 rounded cursor-pointer">
                Edit
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-2">
                            <label htmlFor="title">Title</label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                placeholder="Product title"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="category">Category</label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                placeholder="Product Category"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="price"
                                    className="text-sm font-medium"
                                >
                                    Price
                                </label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="stock"
                                    className="text-sm font-medium"
                                >
                                    Stock
                                </label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex-1"
                                >
                                    {isPending
                                        ? 'Updating...'
                                        : 'Update Product'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProduct;
