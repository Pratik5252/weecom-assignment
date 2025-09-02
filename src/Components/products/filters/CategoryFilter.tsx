import { type Column } from '@tanstack/react-table';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/Components/ui/dropdown-menu';
import { Filter, ChevronDown, ListFilterPlus } from 'lucide-react';
import { type Product } from '@/api/api';
import { useMemo } from 'react';

interface CategoryFilterProps {
    column: Column<Product, unknown>;
}

function CategoryFilter({ column }: CategoryFilterProps) {
    const uniqueCategories = column.getFacetedUniqueValues();

    const sortedUniqueCategories = useMemo(
        () =>
            Array.from(uniqueCategories?.keys() || [])
                .sort()
                .slice(0, 5000),
        [uniqueCategories]
    );

    const selectedCategories = (column.getFilterValue() as string[]) || [];

    const handleCategoryChange = (category: string, checked: boolean) => {
        let newCategories: string[];

        if (checked) {
            newCategories = [...selectedCategories, category];
        } else {
            newCategories = selectedCategories.filter((c) => c !== category);
        }

        column.setFilterValue(
            newCategories.length > 0 ? newCategories : undefined
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="">
                    <ListFilterPlus className="h-4 w-4" />
                    {selectedCategories.length > 0 && (
                        <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                            {selectedCategories.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="max-h-60 overflow-y-auto">
                    {sortedUniqueCategories.map((category) => (
                        <DropdownMenuItem
                            key={category}
                            className="cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <div className="flex items-center space-x-2 w-full">
                                <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(
                                        category
                                    )}
                                    onCheckedChange={(checked) =>
                                        handleCategoryChange(
                                            category,
                                            checked as boolean
                                        )
                                    }
                                />
                                <div className="w-full flex justify-between">
                                    <label
                                        htmlFor={`category-${category}`}
                                        className="text-sm font-medium leading-none cursor-pointer capitalize flex items-center justify-between"
                                    >
                                        {category}
                                    </label>
                                    <span className="text-muted-foreground ml-1">
                                        {uniqueCategories?.get(category) || 0}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CategoryFilter;
