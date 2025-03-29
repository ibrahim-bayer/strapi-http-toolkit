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

## Resulting

Much less complex code, classes to create update fetch data, reducing development time, reducing compatibility issues in time as your product evolves and there are discrepancy between BE and FE
or mobile application.

## Installation

```bash
npm install @ibrahimbayer/strapi-http-toolkit
# or
yarn add @ibrahimbayer/strapi-http-toolkit
```

## Usage

To use this module effectively, you need to define interfaces for your Strapi data models.

### 1. Define your Strapi interfaces

```typescript
// Define your Strapi entity interfaces
interface Author extends BaseStrapiModel {
  id: number;
  documentId: string;
  name: string;
  books?: Book[];
}

interface Book extends BaseStrapiModel {
  id: number;
  documentId: string;
  title: string;
  author?: Author;
  categories?: Category[];
}

interface Category extends BaseStrapiModel {
  id: number;
  documentId: string;
  name: string;
  books?: Book[];
}
```

### 2. Basic API calls

```typescript
import { GenericService } from "@ibrahimbayer/strapi-http-toolkit";

// Generate service class
const api = new GenericService<Book>("/books");

// Get all books
const books = await api.findMany();

// Get a list of books filtered with populate option
const populateOptions: PopulateOptions<Book> = {
  author: true,
  categories: {
    populate: {
      books: true,
    },
  },
};

// Define filter options
const filterOptions: FilterOptions = {
  title: { $null: true },
};
const books = await api.findMany(populateOptions, filterOptions);

// Get a single book
const book = await api.findOne("documentid");

// Create a new book, check author & category instead of object reference we are able to send documentid
const newBook = await api.create({
  title: "New Book Title",
  author: "documentid",
  category: "documentid",
});

// Update a book
const updatedBook = await api.update("documentid", {
  title: "Updated Book Title",
  author: "documentid",
  category: "documentid",
});

// Delete a book
await api.deleteOne("documentid");
```

### 3. Using PopulateOptions for relationships

```typescript
import { GenericService, PopulateOptions } from "strapi-http-toolkit";

const api = new GenericService<Book>("https://your-strapi-api.com");

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
const books = await api.get("/books", {
  relations: bookPopulate,
});
```

### 4. Using FilterOptions for queries

```typescript
import { GenericService, FilterOptions } from "strapi-http-toolkit";

const api = new GenericService<Book>("https://your-strapi-api.com");

// Define filter options with type safety
const bookFilters: FilterOptions = {
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
const filteredBooks = await api.get("/books", bookFilters);
```

### You don't need to create model for create update thanks to CrudRequestModel

### 5. Using `CrudRequestModel` for simplified create/update operations

The `CrudRequestModel` allows you to create or update entities without defining the full model structure. This is particularly useful for operations where only a subset of fields is required. Keep in mind to use
documentid(s) of references

```typescript
import {
  GenericService,
  CrudRequestModel,
} from "@ibrahimbayer/strapi-http-toolkit";

// Define a minimal data model for creating/updating a book
const bookData: CrudRequestModel<Book> = {
  data: {
    title: "Minimal Book Title",
    author: "author-documentid",
    categories: ["category-documentid1", "category-documentid2"],
  },
};

// Create a new book
const createdBook = await api.create(bookData);

// Update an existing book
const updatedBook = await api.update("book-documentid", {
  data: {
    title: "Updated Minimal Book Title",
  },
});
```

## For more

For technical support and more get in touch with me [ibgroup.dev](https://ibgroup.dev?utm_source=social&utm_medium=githsocub&utm_campaign=strapi-http-toolkit).

My linkedin [Linkedin](https://www.linkedin.com/in/ibrahimbayer/).

## License

MIT
