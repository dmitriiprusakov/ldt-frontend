import { RootState } from "store";
import { Filters, Pagination } from "types";

const selectSidebarVisibility = (state: RootState): boolean => state.core.sidebarVisibility;

const selectPagination = (state: RootState): Pagination => state.core.pagination;

const selectFilters = (state: RootState): Filters => state.core.filters;

export { selectSidebarVisibility, selectPagination, selectFilters };
