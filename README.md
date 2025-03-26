# strapi-http-toolkit

Strapi 5 compatible module to ease http operations like relationship building, populating relations etc..

## Problem

Working with Strapi 5's REST API can be challenging when dealing with complex populate operations, filtering, and relationship management. Developers often face issues with:

- Creating type-safe queries for nested relationships
- Building complex filter expressions with proper syntax
- Managing relationships between entities while maintaining type safety
- Writing error-prone, string-based query parameters by hand
- Update in data structure and relations will be identified in runtime hopefully during development.

## Solution

This toolkit provides a TypeScript-first approach to interacting with Strapi 5's REST API, offering:

- Fully typed interfaces for populate options, filters, and pagination
- Compile-time validation of query structures
- Helper functions for building relationship connections
- Automatic conversion of typed objects to Strapi's expected format
- Simplified HTTP operations with proper error handling
- Generic servicing object will reduce code complexity and boiler plate code size.

## Installation

```bash
npm install strapi-http-toolkit
# or
yarn add strapi-http-toolkit
```

## Usage

To use this module effectively, you need to define interfaces for your Strapi data models.

### 1. Define your Strapi interfaces

```typescript
// Define your Strapi entity interfaces
interface Author {
  id: number;
  documentId: string;
  name: string;
  books?: Book[];
}

interface Book {
  id: number;
  documentId: string;
  title: string;
  author?: Author;
  categories?: Category[];
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  books?: Book[];
}
```

### 2. Basic API calls

```typescript
import api from "strapi-http-toolkit";

// Get a list of books
const books = await api.findMany<Book>("/books");

// Get a single book
const book = await api.findOne<Book>("/books", "documentid");

// Create a new book, check author & category instead of object reference we are able to send documentid
const newBook = await api.create<Book>("/books", {
  title: "New Book Title",
  author: "documentid",
  category: "documentid",
});

// Update a book
const updatedBook = await api.update<Book>("/books", "documentid", {
  title: "Updated Book Title",
  author: "documentid",
  category: "documentid",
});

// Delete a book
await api.deleteOne("/books", "documentid");
```

### 3. Using PopulateOptions for relationships

```typescript
import { StrapiHttp, PopulateOptions } from "strapi-http-toolkit";

const api = new StrapiHttp("https://your-strapi-api.com");

// Define populate options with type safety
const bookPopulate: PopulateOptions<Book> = {
  author: true,
  categories: {
    populate: {
      books: true,
    },
  },
};

// Get books with related data
const books = await api.get<Book[]>("/books", {
  relations: bookPopulate,
});
```

### 4. Using FilterOptions for queries

```typescript
import { StrapiHttp, FilterOptions } from "strapi-http-toolkit";

const api = new StrapiHttp("https://your-strapi-api.com");

// Define filter options with type safety
const bookFilters: FilterOptions<Book> = {
  filters: {
    title: {
      $contains: "Adventure",
    },
    author: {
      name: {
        $eq: "J.K. Rowling",
      },
    },
  },
  sort: ["title:asc"],
  pagination: {
    page: 1,
    pageSize: 10,
  },
};

// Get filtered books
const filteredBooks = await api.get<Book[]>("/books", bookFilters);
```

### 5. Building relationships

```typescript
import { StrapiHttp, relationBuilder } from "strapi-http-toolkit";

// Create a new book and connect it to an existing author and categories
const bookData = relationBuilder<Book>({
  title: "My New Book",
  author: { connect: [1] }, // Connect to author with ID 1
  categories: { connect: [2, 3, 4] }, // Connect to multiple categories
});

const api = new StrapiHttp("https://your-strapi-api.com");
const newBook = await api.post<Book>("/books", { data: bookData });
```

## Advanced Examples

For more advanced usage and examples, check out the [ibgroup.dev](https://ibgroup.dev?utm_source=social&utm_medium=githsocub&utm_campaign=strapi-http-toolkit).

## License

MIT
