import { memo } from 'react';
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";

const PaginationControls = memo(({ pagination, setPagination }) => {
    return (
        <PaginationContent>
            {pagination.page > 1 && (
                <PaginationPrevious
                    onClick={() => setPagination({
                        ...pagination,
                        page: Math.max(1, pagination.page - 1)
                    })}
                />
            )}

            <PaginationItem>
                <PaginationLink
                    isActive={pagination.page === 1}
                    onClick={() => setPagination({...pagination, page: 1})}
                >
                    1
                </PaginationLink>
            </PaginationItem>

            {pagination.total_pages > 3 && (
                <>
                    {pagination.page > 2 && <PaginationEllipsis/>}
                    {pagination.page > 1 && pagination.page < pagination.total_pages && (
                        <PaginationItem>
                            <PaginationLink isActive={true}>
                                {pagination.page}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    {pagination.page < pagination.total_pages - 1 && <PaginationEllipsis/>}
                </>
            )}

            {pagination.total_pages > 1 && (
                <PaginationItem>
                    <PaginationLink
                        isActive={pagination.page === pagination.total_pages}
                        onClick={() => setPagination({...pagination, page: pagination.total_pages})}
                    >
                        {pagination.total_pages}
                    </PaginationLink>
                </PaginationItem>
            )}

            {pagination.page < pagination.total_pages && (
                <PaginationNext
                    onClick={() => setPagination({
                        ...pagination,
                        page: Math.min(pagination.total_pages, pagination.page + 1)
                    })}
                />
            )}
        </PaginationContent>
    );
});

PaginationControls.displayName = 'PaginationControls';

export default PaginationControls;
