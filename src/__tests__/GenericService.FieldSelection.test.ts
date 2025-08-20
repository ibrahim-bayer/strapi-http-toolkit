import { beforeEach, describe, expect, it, vi } from "vitest";
import { BaseStrapiModel } from "../BaseStrapiModel";
import { FieldSelection, PrimitiveFieldNames } from "../FieldSelection";
import { GenericService } from "../GenericService";

declare const global: any;

interface Product extends BaseStrapiModel {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  price: number;
  product_status: "active" | "inactive" | "discontinued";
  category?: Category;
  variants?: ProductVariant[];
  externalId?: string;
}

interface Category extends BaseStrapiModel {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface ProductVariant extends BaseStrapiModel {
  id: number;
  documentId: string;
  sku: string;
  size?: string;
  color?: string;
  price: number;
}

describe("GenericService with FieldSelection", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("should include fields parameter in findMany request", async () => {
    const service = new GenericService<Product>("/products");
    const mockResponse = {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );
    global.fetch = mockFetch as any;

    const fields: FieldSelection<Product> = ["name", "price", "description"];

    await service.findMany(undefined, undefined, { fields });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("fields"),
      expect.any(Object)
    );
  });

  it("should include fields parameter in findOne request", async () => {
    const service = new GenericService<Product>("/products");
    const mockResponse = {
      data: {} as Product,
      meta: {
        pagination: {
          page: 1,
          pageSize: 1,
          pageCount: 1,
          total: 1,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );
    global.fetch = mockFetch as any;

    const fields: FieldSelection<Product> = "name";

    await service.findOne("doc-123", undefined, { fields });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("fields=name"),
      expect.any(Object)
    );
  });

  it("should combine fields with other parameters in findMany", async () => {
    const service = new GenericService<Product>("/products");
    const mockResponse = {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );
    global.fetch = mockFetch as any;

    const fields: FieldSelection<Product> = ["name", "price"];
    const pagination = { page: 1, pageSize: 10 };
    const filters = { product_status: { $eq: "active" as const } };
    const relations = { populate: { category: true } };

    await service.findMany(relations, filters, {
      fields,
      pagination,
      sort: ["name:asc"],
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/pagination.*populate.*sort.*filters.*fields/),
      expect.any(Object)
    );
  });

  it("should work with type-safe field selection using PrimitiveFieldNames", async () => {
    const service = new GenericService<Product>("/products");
    const mockResponse = {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );
    global.fetch = mockFetch as any;

    // Type-safe field selection
    const validFields: PrimitiveFieldNames<Product>[] = [
      "name",
      "price",
      "description",
      "product_status",
      "externalId",
    ];

    await service.findMany(undefined, undefined, { fields: validFields });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("fields"),
      expect.any(Object)
    );
  });

  it("should handle field selection with populate separately", async () => {
    const service = new GenericService<Product>("/products");
    const mockResponse = {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );
    global.fetch = mockFetch as any;

    const fields: FieldSelection<Product> = ["name", "price"];
    const relations = {
      populate: {
        category: true,
      },
    };

    await service.findMany(relations, undefined, { fields });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/populate.*fields/),
      expect.any(Object)
    );
  });

  it("should maintain backwards compatibility when fields is not provided", async () => {
    const service = new GenericService<Product>("/products");
    const mockResponse = {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 0,
        },
      },
    };

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        ok: true,
        status: 200,
      })
    );
    global.fetch = mockFetch as any;

    // Call without fields parameter (backwards compatibility)
    await service.findMany();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.not.stringContaining("fields"),
      expect.any(Object)
    );
  });
});
