import { type Column } from '@tanstack/react-table';
import { Button } from '@/Components/ui/button';
import { Slider } from '@/Components/ui/slider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/Components/ui/dropdown-menu';
import {ListFilterPlus } from 'lucide-react';
import { type Product } from '@/api/api';
import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
    column: Column<Product, unknown>;
}

export function PriceRangeFilter({ column }: PriceRangeFilterProps) {
    const priceRange = column.getFacetedMinMaxValues();
    const minPrice = priceRange?.[0] ?? 0;
    const maxPrice = priceRange?.[1] ?? 1000;
    const currentFilter = column.getFilterValue() as
        | [number, number]
        | undefined;

    const [sliderValues, setSliderValues] = useState<[number, number]>([
        currentFilter?.[0] ?? minPrice,
        currentFilter?.[1] ?? maxPrice,
    ]);

    useEffect(() => {
        if (currentFilter) {
            setSliderValues([currentFilter[0], currentFilter[1]]);
        } else {
            setSliderValues([minPrice, maxPrice]);
        }
    }, [currentFilter, minPrice, maxPrice]);

    const handleSliderChange = (values: number[]) => {
        setSliderValues([values[0], values[1]]);
    };

    const applyFilter = () => {
        if (sliderValues[0] === minPrice && sliderValues[1] === maxPrice) {
            column.setFilterValue(undefined);
        } else {
            column.setFilterValue([sliderValues[0], sliderValues[1]]);
        }
    };

    const clearFilter = () => {
        setSliderValues([minPrice, maxPrice]);
        column.setFilterValue(undefined);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <ListFilterPlus className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start">
                <DropdownMenuLabel>Filter by Price Range</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="p-4 space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${Math.round(minPrice)}</span>
                        <span>${Math.round(maxPrice)}</span>
                    </div>

                    <div className="px-2">
                        <Slider
                            value={sliderValues}
                            onValueChange={handleSliderChange}
                            min={minPrice}
                            max={maxPrice}
                            step={1}
                            className="w-full"
                        />
                    </div>

                    <div className="text-center">
                        <div className="text-sm font-medium">
                            ${Math.round(sliderValues[0])} - $
                            {Math.round(sliderValues[1])}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Selected price range
                        </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="flex justify-between gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilter}
                            className="flex-1"
                        >
                            Clear
                        </Button>
                        <Button
                            size="sm"
                            onClick={applyFilter}
                            className="flex-1"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
