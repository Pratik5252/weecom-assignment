import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { useAddProduct } from '@/hooks/useProductQuery';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        category: '',
        stock: 0,
    });
    const [open, setOpen] = useState(false);

    const { mutateAsync, isPending } = useAddProduct();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await mutateAsync({ product: formData });
            setOpen(false);
        } catch (error) {
            console.error('Failed to add product:', error);
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
            title: '',
            price: 0,
            category: '',
            stock: 0,
        });
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center justify-center text-sm font-medium gap-1 py-2 px-4 cursor-pointer border rounded">
                Add <Plus size={16} />
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
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
                                    {isPending ? 'Adding...' : 'Add Product'}
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

export default AddProduct;
