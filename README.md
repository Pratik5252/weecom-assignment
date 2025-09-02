# Weecom Products Dashboard

A small React + TypeScript + Vite application demonstrating product CRUD, client-/server-side pagination, sorting and filtering with TanStack Table, data fetching/mutations with React Query, and a fixed-header table UI built with Tailwind CSS and Shadcn UI components.

---

## 🚀 Setup Instructions

1. **Prerequisites**

    - Node.js ≥ 16
    - npm or yarn

2. **Clone & Install**

    ```bash
    git clone https://github.com/your-org/weecom.git
    cd weecom
    npm install
    # or
    yarn install
    ```

3. **Run in Development**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Build & Preview**
    ```bash
    npm run build
    npm run preview
    # or
    yarn build
    yarn preview
    ```

---

## 📚 Libraries Used

-   **Framework & Tooling**

    -   React 18
    -   Vite
    -   TypeScript

-   **Data Fetching & State**

    -   `@tanstack/react-query` – server state, caching & mutations
    -   `@tanstack/react-table` – headless table, pagination, filtering, sorting, faceting

-   **UI & Styling**

    -   Tailwind CSS
    -   Shadcn UI (Dialog, Table, Button, Input, Select, DropdownMenu, ScrollArea, Popover)
    -   `lucide-react` – icons

-   **Utilities**
    -   Fetch API (with simulated delays)
    -   Custom hooks under `src/hooks/useProductQuery.ts`

---

## 📝 Approach Overview

1. **Data Layer**

    - Wrapped all CRUD calls (`getProducts`, `addProduct`, `updateProduct`, `deleteProduct`) behind React Query mutations & queries.
    - Simulated network latency with `setTimeout` for realistic loading states.

2. **Table Implementation**

    - Used TanStack Table’s `useReactTable` for core, pagination, sorting, filtering and faceting.
    - Server-side pagination on initial load; demonstrated client-side pagination in `Products.tsx` with `getFilteredRowModel` & `getPaginationRowModel`.
    - Implemented a **fixed header** by splitting header & body into two tables sharing identical `<colgroup>` widths inside a scroll container.

3. **Filtering & Facets**

    - Title search: client-side text filter (`setFilterValue`) with debounced input.
    - Category filter: generated via `getFacetedUniqueValues()`; multi-select dropdown with checkboxes for OR-logic filtering.
    - “Select All” / “Clear” quick actions for category filters.

4. **UX Details**
    - Edit & Delete dialogs using Shadcn UI Dialog component.
    - Loading, success, and error states handled gracefully.
    - Fully responsive, accessible controls with keyboard support.

---

Feel free to explore the code under `src/Components/products` and `src/hooks`.
