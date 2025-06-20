import { describe, expect, it } from "vitest";
import type { FilterCondition, FilterOptions } from "../FilterOptions";
import qs from "qs";

interface Product {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  price: number;
  product_status: "active" | "inactive" | "discontinued";
  category?: Category;
  tags?: string[];
  createdAt: Date;
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  children?: Category[];
  products?: Product[];
  isActive: boolean;
}

describe("FilterOptions", () => {
  describe("FilterCondition basic operations", () => {
    it("should allow equality filters for string fields", () => {
      const filter: FilterCondition<string> = {
        $eq: "test",
        $ne: "other",
        $contains: "substring",
        $startsWith: "prefix",
        $endsWith: "suffix",
      };
      expect(filter).toBeDefined();
    });

    it("should allow numeric comparison filters", () => {
      const filter: FilterCondition<number> = {
        $eq: 100,
        $gt: 50,
        $gte: 50,
        $lt: 200,
        $lte: 200,
        $between: [50, 200],
        $in: [10, 20, 30],
        $notIn: [5, 15],
      };
      expect(filter).toBeDefined();
    });

    it("should allow date filters", () => {
      const startDate = new Date("2023-01-01");
      const endDate = new Date("2023-12-31");

      const filter: FilterCondition<Date> = {
        $eq: startDate,
        $gt: startDate,
        $lt: endDate,
        $between: [startDate, endDate],
      };
      expect(filter).toBeDefined();
      expect(filter.$between).toEqual([startDate, endDate]);
      expect(filter.$gt).toEqual(startDate);
      expect(filter.$lt).toEqual(endDate);
    });
  });

  describe("Product FilterOptions", () => {
    it("should filter products by name", () => {
      const filter: FilterOptions<Product> = {
        name: {
          $contains: "laptop",
          $startsWith: "Mac",
        },
      };
      expect(filter).toBeDefined();
      expect(filter.name?.$contains).toBe("laptop");
      expect(filter.name?.$startsWith).toBe("Mac");
      expect(filter.name?.$eq).toBeUndefined();
      expect(filter.name?.$endsWith).toBeUndefined();
    });

    it("should filter products by status", () => {
      const filter: FilterOptions<Product> = {
        product_status: {
          $eq: "active",
          $in: ["active", "inactive"],
        },
      };
      expect(filter).toBeDefined();
      expect(filter.product_status?.$eq).toBe("active");
      expect(filter.product_status?.$in).toEqual(["active", "inactive"]);
    });

    it("should filter products by price range", () => {
      const filter: FilterOptions<Product> = {
        price: {
          $between: [100, 1000],
          $gte: 50,
        },
      };
      expect(filter).toBeDefined();
      expect(filter.price?.$between).toEqual([100, 1000]);
      expect(filter.price?.$gte).toBe(50);
    });

    it("should filter products by tags array", () => {
      const filter: FilterOptions<Product> = {
        tags: {
          $contains: "electronics",
        },
      };
      expect(filter).toBeDefined();
    });

    it("should filter products by category properties", () => {
      const filter: FilterOptions<Product> = {
        category: {
          name: {
            $eq: "Electronics",
          },
          isActive: {
            $eq: true,
          },
        },
      };
      console.log("Filter:", qs.stringify(filter));
      expect(filter).toBeDefined();
      expect(qs.stringify(filter)).toContain(encodeURIComponent("category[name]"));
      expect(qs.stringify(filter)).toContain(encodeURIComponent("category[isActive]"));
    });

    it("should filter products by category documentId", () => {
      const filter: FilterOptions<Product> = {
        category: {
          documentId: {
            $eq: "cat-123-doc-id",
          }
        },
      };
      expect(filter).toBeDefined();
      expect(qs.stringify(filter)).toContain(encodeURIComponent("category"));
      expect(qs.stringify(filter)).toContain(encodeURIComponent("category[documentId]"));
    });

    it("should use complex AND/OR filters for products", () => {
      const filter: FilterOptions<Product> = {
        $and: [
          {
            product_status: { $eq: "active" },
          },
          {
            price: { $gte: 100 },
          },
        ],
        $or: [
          {
            name: { $contains: "laptop" },
          },
          {
            name: { $contains: "desktop" },
          },
        ],
      };
      expect(filter).toBeDefined();
    });
  });

  describe("Category FilterOptions", () => {
    it("should filter categories by name", () => {
      const filter: FilterOptions<Category> = {
        name: {
          $eq: "Electronics",
          $containsi: "electron",
        },
      };
      expect(filter).toBeDefined();
    });

    it("should filter categories by active status", () => {
      const filter: FilterOptions<Category> = {
        isActive: {
          $eq: true,
        },
      };
      expect(filter).toBeDefined();
    });

    it("should filter categories by children existence", () => {
      const filter: FilterOptions<Category> = {
        children: {
          $null: false,
        },
      };
      expect(filter).toBeDefined();
    });

    it("should filter categories by child category properties", () => {
      const filter: FilterOptions<Category> = {
        children: {
          name: {
            $eq: "Subcategory",
          },
          isActive: {
            $eq: true,
          },
        },
      };
      expect(filter).toBeDefined();
    });

    it("should filter categories by products count", () => {
      const filter: FilterOptions<Category> = {
        products: {
          $notNull: true,
        },
      };
      expect(filter).toBeDefined();
    });

    it("should filter categories by product properties", () => {
      const filter: FilterOptions<Category> = {
        products: {
          product_status: {
            $eq: "active",
          },
          price: {
            $gte: 100,
          },
        },
      };
      expect(filter).toBeDefined();
    });
  });

  describe("Complex nested filters", () => {
    it("should handle deeply nested product-category relationships", () => {
      const filter: FilterOptions<Product> = {
        category: {
          children: {
            name: {
              $contains: "Mobile",
            },
            products: {
              product_status: {
                $eq: "active",
              },
            },
          },
        },
      };
      expect(filter).toBeDefined();
    });

    it("should combine multiple filter conditions with logical operators", () => {
      const filter: FilterOptions<Product> = {
        $and: [
          {
            product_status: { $in: ["active", "inactive"] },
          },
          {
            $or: [
              {
                price: { $between: [100, 500] },
              },
              {
                name: { $contains: "premium" },
              },
            ],
          },
        ],
        not: [
          {
            tags: { $contains: "deprecated" },
          },
        ],
      };
      expect(filter).toBeDefined();
    });

    it("should filter by date ranges and null checks", () => {
      const filter: FilterOptions<Product> = {
        createdAt: {
          $between: [new Date("2023-01-01"), new Date("2023-12-31")],
        },
        description: {
          $notNull: true,
        },
        category: {
          $null: false,
        },
      };
      expect(filter).toBeDefined();
    });
  });
});
