# Quick Reference - ERP Frontend (React + TypeScript + Tailwind)

This guide is a copy-ready cheat sheet for building ERP screens using the same style and architecture used in this project.

---

## 1) Standard ERP Page Pattern

Use this structure for every module page (`Clients`, `Products`, `Manufacturers`, `Users`, `Invoices`):

1. Header
   - Title + short description
   - Primary action button (Add/Create/Export)
2. Filters row
   - Search input
   - Optional dropdown filters
3. Table/list area
   - Data rows
   - Row actions
4. Modal(s)
   - Add/Edit forms
   - Confirm actions

Recommended wrapper:

```tsx
<div className="space-y-4 animate-in fade-in duration-500">
  <header className="flex justify-between items-end">{/* title + actions */}</header>
  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
    {/* filters + table */}
  </div>
</div>
```

---

## 2) Typography Rules (Current UI Standard)

- Buttons: use `font-medium` (not `font-bold`, `font-semibold`, or `font-black`)
- Form inputs/selects/textarea: use `font-normal`
- Placeholder text follows input font, so keeping inputs `font-normal` keeps placeholders non-bold
- Labels can be `font-medium`

Quick conversion map:

- `font-black` -> `font-medium`
- `font-bold` -> `font-medium` (buttons) or `font-normal` (inputs)
- `font-semibold` -> `font-medium`

---

## 3) Cursor Rules

All interactive buttons should have `cursor-pointer`.

Apply to:

- Header action buttons
- Table row action buttons
- Modal footer buttons
- Small icon buttons

Example:

```tsx
<button className="cursor-pointer px-4 py-2 rounded-lg font-medium">Save</button>
```

---

## 4) Modal Pattern (Used Across Modules)

```tsx
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/5">
      <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <h2 className="text-xs uppercase font-medium">Modal Title</h2>
        <button className="cursor-pointer p-1.5">X</button>
      </div>
      <form className="p-5 space-y-4">
        <input className="w-full text-xs font-normal rounded-xl" />
        <div className="flex gap-3">
          <button type="button" className="cursor-pointer flex-1 font-medium">Cancel</button>
          <button type="submit" className="cursor-pointer flex-1 font-medium">Save</button>
        </div>
      </form>
    </div>
  </div>
)}
```

---

## 5) Navbar + Sidebar Mobile Behavior (Under `sm`)

Current responsive rule:

- On `sm` and below:
  - Move `Notifications` + `Theme Toggle` to bottom of sidebar
  - Hide them from top navbar
  - Use smaller user button and smaller search text

Suggested classes:

- Hide in navbar mobile: `hidden sm:flex`
- Show in sidebar mobile only: `sm:hidden`
- Smaller search input mobile: `text-[11px] sm:text-xs`
- Smaller avatar mobile: `w-7 h-7 sm:w-8 sm:h-8`

---

## 6) Reusable Form Field Classes

Input:

```tsx
className="w-full bg-slate-50/50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-none rounded-xl py-1.5 px-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#19b6f0]/30 outline-none transition-all font-normal"
```

Select:

```tsx
className="w-full bg-slate-50/50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-none rounded-xl py-1.5 px-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#e9ac33]/30 outline-none transition-all font-normal"
```

Primary button:

```tsx
className="cursor-pointer px-4 py-2 rounded-lg bg-[#e9ac33] text-black text-sm font-medium hover:bg-[#e9ac33]/90 transition-all"
```

Secondary button:

```tsx
className="cursor-pointer px-4 py-2 rounded-lg bg-slate-50 dark:bg-[#1c1c1c] text-slate-500 text-sm font-medium hover:bg-slate-100 transition-all border border-slate-200 dark:border-white/5"
```

---

## 7) New ERP Module Checklist

When creating a new module (example: `Suppliers`, `Warehouses`, `Payments`):

1. Create folder in `src/components/<ModuleName>/`
2. Build page with standard page pattern
3. Add add/edit modal
4. Ensure:
   - Buttons are non-bold (`font-medium`)
   - Inputs are `font-normal`
   - All buttons use `cursor-pointer`
5. Add route and sidebar nav item
6. Verify responsive behavior (`sm`, `md`, `lg`)
7. Run lint and fix warnings

---

## 8) Fast Migration to Another ERP

To reuse this UI in another ERP project:

1. Keep layout system:
   - `Layout.tsx`, `Sidebar.tsx`, `Navbar.tsx`
2. Copy style conventions:
   - color tokens and utility patterns
   - modal/table/form classes
3. Swap only business modules:
   - replace `Clients`, `Products`, etc. with new ERP domains
4. Keep interaction standards:
   - non-bold action typography
   - cursor-pointer on all clickable controls
5. Keep responsive sidebar/navbar split for mobile

---

## 9) Common Commands

```bash
pnpm dev
pnpm build
pnpm lint
```

Use lint after any major UI refactor to catch unused imports and class-level issues.

# Quick Reference Guide - E-commerce React Admin Dashboard

## 🚀 Common Code Patterns

### 1. Fetching Data with Search & Pagination

```typescript
// State
const [page, setPage] = useState(1);
const [searchQuery, setSearchQuery] = useState("");
const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

// Debounce (700ms)
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearchQuery(searchQuery);
  }, 700);
  return () => clearTimeout(timer);
}, [searchQuery]);

// Build query
const queryParams = new URLSearchParams();
if (debouncedSearchQuery) queryParams.append("search", debouncedSearchQuery);
queryParams.append("page", page.toString());
const query = queryParams.toString();

// Fetch
const { data, isLoading } = useCustomQuery(
  `products/?${query}`,
  ["products", debouncedSearchQuery, page]
);

// Extract
const items = data?.data || [];
const count = data?.count || 0;
```

### 2. Create Operation

```typescript
import { toast } from "sonner";
import { useCustomPost } from "@/hooks/useMutation";
import handleErrorAlerts from "@/utils/showErrorMessages";

const { mutateAsync: createItem, isPending } = useCustomPost(
  "products/",
  ["products"]
);

const handleSubmit = async (formData) => {
  try {
    await createItem(formData);
    toast.success("تم الإنشاء بنجاح");
    navigate("/products");
  } catch (error) {
    handleErrorAlerts(error.response?.data);
  }
};
```

### 3. Update Operation

```typescript
import { toast } from "sonner";
import { useCustomPatch } from "@/hooks/useMutation";
import handleErrorAlerts from "@/utils/showErrorMessages";

const { mutateAsync: updateItem, isPending } = useCustomPatch(
  `products/${id}/`,
  ["products"]
);

const handleUpdate = async (formData) => {
  try {
    await updateItem(formData);
    toast.success("تم التحديث بنجاح");
    navigate("/products");
  } catch (error) {
    handleErrorAlerts(error.response?.data);
  }
};
```

### 4. Delete Operation

```typescript
import { toast } from "sonner";
import { useCustomRemove } from "@/hooks/useMutation";
import handleErrorAlerts from "@/utils/showErrorMessages";

const { mutateAsync: deleteItem } = useCustomRemove(
  `products/${id}/`,
  ["products"]
);

const handleDelete = async () => {
  try {
    await deleteItem();
    toast.success("تم الحذف بنجاح");
  } catch (error) {
    handleErrorAlerts(error.response?.data);
  }
};
```

### 5. Date Picker with React Hook Form

```typescript
import { Controller } from "react-hook-form";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { toLocalISOString } from "@/utils/toLocalISOString";

type DatePickerValue = Date | null;

<Controller
  name="date"
  control={control}
  rules={{ required: "التاريخ مطلوب" }}
  render={({ field }) => (
    <DatePicker
      selected={field.value ? new Date(field.value) : null}
      onChange={(date) => field.onChange(toLocalISOString(date))}
      showTimeSelect
      timeIntervals={60}
      timeFormat="HH:mm"
      dateFormat="yyyy-MM-dd HH:mm"
      locale={ar}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
      placeholderText="اختر التاريخ والوقت"
    />
  )}
/>
```

### 6. Form with React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import handleErrorAlerts from "@/utils/showErrorMessages";

const { register, handleSubmit, formState: { errors } } = useForm({
  defaultValues: {
    name: "",
    email: "",
  }
});

const onSubmit = async (data) => {
  try {
    await createItem(data);
    toast.success("تم الحفظ بنجاح");
  } catch (error) {
    handleErrorAlerts(error.response?.data);
  }
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input
    {...register("name", { required: "الاسم مطلوب" })}
    className="w-full px-4 py-2 border rounded-md"
  />
  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
</form>
```

### 7. Loading States

```typescript
// Query loading
const { data, isLoading } = useCustomQuery(...);

// Mutation loading
const { mutateAsync, isPending } = useCustomPost(...);

// Conditional rendering
{isLoading ? (
  <Spinner />
) : (
  <Table data={data} />
)}

// Button with loading state
<Button disabled={isPending}>
  {isPending ? "جاري الحفظ..." : "حفظ"}
</Button>
```

### 8. Pagination Component

```typescript
import Pagination from "@/core/Pagination";

<Pagination
  currentPage={page}
  count={count}
  onPageChange={setPage}
  pageSize={15} // optional, defaults to 15
/>
```

### 9. Toast Notifications (Sonner)

```typescript
import { toast } from "sonner";

// Success
toast.success("تم الحفظ بنجاح");

// Error
toast.error("حدث خطأ");

// Info
toast.info("معلومة");

// Warning
toast.warning("تحذير");
```

### 10. Error Handling

```typescript
import handleErrorAlerts from "@/utils/showErrorMessages";

try {
  await apiCall();
} catch (error) {
  handleErrorAlerts(error.response?.data);
  // or
  handleErrorAlerts("Error message");
}
```

### 11. Date Formatting

```typescript
import formatDate from "@/utils/formatDate";
import { formatDateTimeSimple } from "@/utils/formatDateTime";
import { toLocalISOString } from "@/utils/toLocalISOString";

// Display date
formatDate(dateString); // "2024-01-15"

// Display datetime
formatDateTimeSimple(isoString); // "15-01-2024 2:30 PM"

// Send to API
toLocalISOString(date); // "2024-01-15T14:30:00"
```

### 12. Query Key Patterns

```typescript
// Simple list
["products"]

// With search
["products", searchQuery]

// With pagination
["products", page]

// With filters
["orders", statusFilter, startDate, endDate, page]

// Detail view
["order", orderId]

// Dashboard
["dashboard-stats"]
["dashboard-revenue-trend"]
["dashboard-active-users-trend"]
```

### 13. Modal/Dialog Pattern

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>عنوان الحوار</DialogTitle>
      <DialogDescription>وصف الحوار</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### 14. Table with Overflow

```typescript
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50">
        <th className="text-right py-4 px-6 font-semibold text-gray-700 text-sm">
          العمود
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <td className="py-4 px-6">{item.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### 15. Authentication Check

```typescript
import { isAuthenticated, getStoredUser } from "@/services/auth";

// Check if authenticated
if (isAuthenticated()) {
  // User is logged in
}

// Get current user
const user = getStoredUser();
```

### 16. Navigation

```typescript
import { useNavigate } from "react-router";

const navigate = useNavigate();

// Navigate to route
navigate("/products");

// Navigate with state
navigate("/products", { state: { id: 1 } });
```

### 17. Chart.js Line Chart

```typescript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const chartData = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [{
    label: "Revenue",
    data: [100, 200, 150],
    borderColor: "rgb(59, 130, 246)",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    tension: 0.4,
  }],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

<Line data={chartData} options={options} />
```

---

## 📁 File Structure Template

### New Feature Structure

```
src/
├── pages/
│   └── FeatureName.tsx
└── components/
    └── FeatureName/
        ├── FeatureTable.tsx
        ├── FeatureFilters.tsx
        └── (optional: FeatureStats.tsx)
```

---

## 🔑 Key Imports

```typescript
// Data Fetching
import { useCustomQuery } from "@/hooks/useQuery";
import { useCustomPost, useCustomPatch, useCustomRemove } from "@/hooks/useMutation";

// Forms
import { useForm, Controller } from "react-hook-form";

// Notifications
import { toast } from "sonner";
import handleErrorAlerts from "@/utils/showErrorMessages";

// Routing
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

// State
import { useQueryClient } from "@tanstack/react-query";

// Components
import Pagination from "@/core/Pagination";
import Spinner from "@/core/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";

// Utils
import formatDate from "@/utils/formatDate";
import { formatDateTimeSimple } from "@/utils/formatDateTime";
import { toLocalISOString } from "@/utils/toLocalISOString";

// Services
import { storeTokens, removeTokens, isAuthenticated } from "@/services/auth";
```

---

## ✅ Checklist for New Features

- [ ] Create page component in `src/pages/`
- [ ] Create feature folder in `src/components/`
- [ ] Add table component (native HTML table with overflow-x-auto)
- [ ] Add filters component
- [ ] Implement search with debouncing (700ms)
- [ ] Add pagination
- [ ] Add error handling with `handleErrorAlerts`
- [ ] Add loading states
- [ ] Add route in `appRoutes.tsx`
- [ ] Test RTL layout
- [ ] Test responsive design
- [ ] Ensure table overflow works correctly

---

## 🎯 Common Query Key Names

- `products` - Product list
- `product` - Single product
- `orders` - Order list
- `order` - Single order
- `users` - User list
- `categories` - Category list
- `units` - Unit list
- `discount-codes` - Discount code list
- `dashboard-stats` - Dashboard statistics
- `dashboard-revenue-trend` - Revenue trend chart
- `dashboard-active-users-trend` - Active users trend chart

---

## 🔄 Cache Invalidation Strategy

```typescript
// After mutation, queries are automatically invalidated
const { mutateAsync } = useCustomPost("products/", ["products"]);

// Manual invalidation if needed
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ["products"] });
```

---

## 📱 Responsive Patterns

```typescript
// Hide on mobile, show on desktop
<div className="hidden lg:block">
  <Table />
</div>

// Show on mobile, hide on desktop
<div className="lg:hidden">
  <Card />
</div>

// Responsive padding
<div className="p-4 sm:p-6">
  {/* Content */}
</div>
```

---

## 🌐 RTL Support

```typescript
// Always add dir="rtl" to main container
<div className="p-4" dir="rtl">
  {/* Content */}
</div>

// Use RTL-aware classes
className="pr-4 pl-2" // padding-right, padding-left
className="text-right" // text alignment
className="ml-auto" // margin-left auto (becomes margin-right in RTL)
```

---

## 🔗 Path Alias (@) Usage

The project uses `@` alias to reference the `src/` directory. Always use `@` instead of relative paths.

### Import Examples

```typescript
// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout/Layout";

// Pages
import { Dashboard } from "@/pages/Dashboard";
import { Products } from "@/pages/Products";

// API
import { get, post, patch, remove } from "@/api";

// Hooks
import { useCustomQuery } from "@/hooks/useQuery";
import { useCustomPost, useCustomPatch } from "@/hooks/useMutation";

// Utils
import formatDate from "@/utils/formatDate";
import { formatDateTimeSimple } from "@/utils/formatDateTime";
import { toLocalISOString } from "@/utils/toLocalISOString";
import handleErrorAlerts from "@/utils/showErrorMessages";

// Services
import { storeTokens, removeTokens } from "@/services/auth";

// Core Components
import Pagination from "@/core/Pagination";
import Spinner from "@/core/Spinner";
import ScrollToTop from "@/core/ScrollToTop";

// Styles
import "@/index.css";
```

### Quick Migration Guide

**Before (Relative Imports):**
```typescript
import { Card } from "../components/ui/card";
import { Dashboard } from "../pages/Dashboard";
import { get } from "../api";
```

**After (Alias Imports):**
```typescript
import { Card } from "@/components/ui/card";
import { Dashboard } from "@/pages/Dashboard";
import { get } from "@/api";
```

### Benefits

- ✅ No more `../../../` chains
- ✅ Easier to refactor and move files
- ✅ Better IDE autocomplete
- ✅ Clearer project structure
- ✅ Consistent across the codebase

---

## 🌍 Environment Variables

### Setup

Create `.env` file:
```env
VITE_API_BASE_URL=https://e-commerce-v2-7n8e6.ondigitalocean.app/api
```

### Usage

```typescript
const baseURL = import.meta.env.VITE_API_BASE_URL;
```

---

## 📊 Chart.js Setup

### Register Chart Components

```typescript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);
```

### Import Chart Components

```typescript
import { Line, Bar } from "react-chartjs-2";
```

---

## 📅 Date Picker Setup

### Required Imports

```typescript
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
```

### Basic Usage

```typescript
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  onChange={setDate}
  value={date}
  clearIcon={undefined}
  calendarIcon={undefined}
  className="w-full"
/>
```

---

## 🔔 Toast Setup

### App Setup

```typescript
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      {/* Rest of app */}
    </>
  );
}
```

### Usage

```typescript
import { toast } from "sonner";

toast.success("تم الحفظ بنجاح");
toast.error("حدث خطأ");
```

---

This quick reference should help you quickly implement common patterns in the project!
