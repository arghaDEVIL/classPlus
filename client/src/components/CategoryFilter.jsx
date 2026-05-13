import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
    const visibleCategories = ['All', 'Shayari', 'Joke', 'Updesh', 'Love', 'Birthday', 'Festival'];
    const hiddenCategories = ['Motivational'];

    return (
        <ScrollArea className="w-full whitespace-nowrap px-4 py-3">
            <div className="flex gap-2 pb-1">
                {visibleCategories.map((cat) => (
                    <Button
                        key={cat}
                        size="sm"
                        variant={activeCategory === cat ? 'default' : 'outline'}
                        className={
                            activeCategory === cat
                                ? 'bg-brand-gradient border-none text-white rounded-full text-xs'
                                : 'rounded-full text-xs border-border text-muted-foreground'
                        }
                        onClick={() => onCategoryChange(cat)}
                    >
                        {cat}
                    </Button>
                ))}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-full text-xs border-border">
                            More <ChevronDown size={12} className="ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {hiddenCategories.map((cat) => (
                            <DropdownMenuItem key={cat} onClick={() => onCategoryChange(cat)}>
                                {cat}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </ScrollArea>
    );
}
