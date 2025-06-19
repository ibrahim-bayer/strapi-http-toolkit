# FilterOptions Examples

This directory contains comprehensive examples demonstrating the capabilities of the `FilterOptions` type for filtering Strapi REST API calls.

## Overview

The `FilterOptions` type provides a powerful and type-safe way to construct complex filters for Strapi API requests. It supports:

- Basic comparison operators (`$eq`, `$ne`, `$lt`, `$gt`, etc.)
- String operations (`$contains`, `$startsWith`, `$endsWith`, etc.)
- Array operations (`$in`, `$notIn`)
- Null checks (`$null`, `$notNull`)
- Range queries (`$between`)
- Logical operators (`$and`, `$or`, `not`)
- Nested filtering across relationships

## Models

The examples use the following related models:

- **ProductModel**: Main product entity with name, description, price
- **CategoryModel**: Product categories with hierarchical relationships
- **ProductVariantModel**: Product variants (sizes, colors, etc.)
- **ProductVariantTranslationModel**: Localized descriptions for variants

## Examples

### 1. Basic Filtering

```typescript
// Filter by exact match
const filter = { name: { $eq: "Smartphone" } };

// Case-insensitive contains
const filter = { name: { $containsi: "phone" } };

// Price range
const filter = { price: { $between: [100, 500] } };
```

### 2. Relationship Filtering

```typescript
// Filter products by category
const filter = {
  categories: {
    name: { $eq: "Electronics" }
  }
};

// Filter by variant properties
const filter = {
  variants: {
    name: { $containsi: "Pro" }
  }
};
```

### 3. Complex Logical Operations

```typescript
// AND conditions
const filter = {
  $and: [
    { price: { $gte: 50 } },
    { categories: { name: { $eq: "Electronics" } } }
  ]
};

// OR conditions
const filter = {
  $or: [
    { categories: { name: { $eq: "Electronics" } } },
    { categories: { name: { $eq: "Clothing" } } }
  ]
};
```

### 4. Deep Nested Filtering

```typescript
// Filter products by variant translation text
const filter = {
  variants: {
    translations: {
      text: { $containsi: "camera features" }
    }
  }
};
```

## Query String Serialization

All examples demonstrate how to serialize the filter objects into query strings using the `qs` library:

```typescript
import qs from 'qs';

const queryString = qs.stringify({ filters: filter });
// Result: "filters[name][$eq]=Smartphone"
```

## Mock Data

The `mockup/mockData.ts` file contains realistic sample data for all models, including:

- 6 products across different categories
- 4 categories (Electronics, Clothing, Books, Home & Garden)
- 6 product variants with translations
- Proper circular relationships between models

## Running the Examples

To see all examples in action:

```bash
# Install dependencies
npm install

# Run the demo (if you have ts-node)
npx ts-node src/examples/filter/demo.ts

# Or compile and run
npx tsc && node dist/examples/filter/demo.js
```

## Filter Operators Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `$eq` | Equal | `{ name: { $eq: "value" } }` |
| `$eqi` | Equal (case-insensitive) | `{ name: { $eqi: "VALUE" } }` |
| `$ne` | Not equal | `{ price: { $ne: 0 } }` |
| `$nei` | Not equal (case-insensitive) | `{ name: { $nei: "VALUE" } }` |
| `$lt` | Less than | `{ price: { $lt: 100 } }` |
| `$lte` | Less than or equal | `{ price: { $lte: 100 } }` |
| `$gt` | Greater than | `{ price: { $gt: 50 } }` |
| `$gte` | Greater than or equal | `{ price: { $gte: 50 } }` |
| `$in` | In array | `{ id: { $in: [1, 2, 3] } }` |
| `$notIn` | Not in array | `{ id: { $notIn: [1, 2] } }` |
| `$contains` | Contains substring | `{ name: { $contains: "phone" } }` |
| `$ncontains` | Not contains | `{ name: { $ncontains: "phone" } }` |
| `$containsi` | Contains (case-insensitive) | `{ name: { $containsi: "PHONE" } }` |
| `$ncontainsi` | Not contains (case-insensitive) | `{ name: { $ncontainsi: "PHONE" } }` |
| `$null` | Is null | `{ description: { $null: true } }` |
| `$notNull` | Is not null | `{ description: { $notNull: true } }` |
| `$between` | Between values | `{ price: { $between: [10, 100] } }` |
| `$startsWith` | Starts with | `{ name: { $startsWith: "Smart" } }` |
| `$startsWithi` | Starts with (case-insensitive) | `{ name: { $startsWithi: "smart" } }` |
| `$endsWith` | Ends with | `{ name: { $endsWith: "phone" } }` |
| `$endsWithi` | Ends with (case-insensitive) | `{ name: { $endsWithi: "PHONE" } }` |

## Type Safety

The `FilterOptions` type provides full TypeScript intellisense and type checking:

- Autocomplete for available fields
- Type-specific operators (e.g., string operators only for string fields)
- Nested relationship typing
- Prevention of invalid filter combinations
