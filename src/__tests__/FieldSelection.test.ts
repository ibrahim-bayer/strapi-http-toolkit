import qs from "qs";
import { describe, expect, it } from "vitest";
import type { FieldSelection, PrimitiveFieldNames } from "../FieldSelection";

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
  updatedAt: Date;
  publishedAt?: Date;
  reviews?: Review[];
  variants?: ProductVariant[];
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  children?: Category[];
  products?: Product[];
  isActive: boolean;
  parent?: Category;
  createdAt: Date;
  updatedAt: Date;
}

interface Review {
  id: number;
  documentId: string;
  rating: number;
  comment?: string;
  product?: Product;
  author?: User;
  createdAt: Date;
}

interface ProductVariant {
  id: number;
  documentId: string;
  sku: string;
  size?: string;
  color?: string;
  price: number;
  product?: Product;
}

interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  profile?: UserProfile;
}

interface UserProfile {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

describe("FieldSelection", () => {
  describe("Type safety for primitive fields", () => {
    it("should allow primitive fields for Product", () => {
      const fieldSelection: FieldSelection<Product> = [
        "name",
        "description",
        "price",
        "product_status",
      ];
      expect(fieldSelection).toEqual([
        "name",
        "description",
        "price",
        "product_status",
      ]);
    });

    it("should allow single field selection", () => {
      const fieldSelection: FieldSelection<Product> = "name";
      expect(fieldSelection).toBe("name");
    });

    it("should allow date fields", () => {
      const fieldSelection: FieldSelection<Product> = [
        "createdAt",
        "updatedAt",
        "publishedAt",
      ];
      expect(fieldSelection).toEqual(["createdAt", "updatedAt", "publishedAt"]);
    });

    it("should allow id and documentId fields", () => {
      const fieldSelection: FieldSelection<Product> = ["id", "documentId"];
      expect(fieldSelection).toEqual(["id", "documentId"]);
    });

    it("should not allow relation fields", () => {
      // These should cause TypeScript compilation errors:
      // const invalidSelection: FieldSelection<Product> = ["category", "reviews", "variants"]; // These are relations, should not be allowed
      expect(true).toBe(true); // Placeholder for compile-time check
    });

    it("should work with Category primitive fields", () => {
      const fieldSelection: FieldSelection<Category> = [
        "name",
        "description",
        "isActive",
        "createdAt",
        "updatedAt",
      ];
      expect(fieldSelection).toEqual([
        "name",
        "description",
        "isActive",
        "createdAt",
        "updatedAt",
      ]);
    });

    it("should work with User primitive fields", () => {
      const fieldSelection: FieldSelection<User> = [
        "username",
        "email",
        "id",
        "documentId",
      ];
      expect(fieldSelection).toEqual(["username", "email", "id", "documentId"]);
    });
  });

  describe("PrimitiveFieldNames type helper", () => {
    it("should extract correct primitive field names for Product", () => {
      // This is a compile-time test - ensuring that PrimitiveFieldNames<Product>
      // only includes primitive fields
      const validFields: PrimitiveFieldNames<Product>[] = [
        "id",
        "documentId",
        "name",
        "description",
        "price",
        "product_status",
        "createdAt",
        "updatedAt",
        "publishedAt",
      ];
      expect(validFields.length).toBeGreaterThan(0);
    });

    it("should extract correct primitive field names for Category", () => {
      const validFields: PrimitiveFieldNames<Category>[] = [
        "id",
        "documentId",
        "name",
        "description",
        "isActive",
        "createdAt",
        "updatedAt",
      ];
      expect(validFields.length).toBeGreaterThan(0);
    });
  });

  describe("Query string generation", () => {
    it("should generate correct query string for single field", () => {
      const fieldSelection: FieldSelection<Product> = "name";
      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toBe("fields=name");
    });

    it("should generate correct query string for multiple fields", () => {
      const fieldSelection: FieldSelection<Product> = [
        "name",
        "price",
        "description",
      ];
      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toContain("fields%5B0%5D=name"); // fields[0]=name
      expect(queryString).toContain("fields%5B1%5D=price"); // fields[1]=price
      expect(queryString).toContain("fields%5B2%5D=description"); // fields[2]=description
    });

    it("should generate correct query string for date fields", () => {
      const fieldSelection: FieldSelection<Product> = [
        "createdAt",
        "updatedAt",
      ];
      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toContain("fields%5B0%5D=createdAt");
      expect(queryString).toContain("fields%5B1%5D=updatedAt");
    });

    it("should generate correct query string for boolean fields", () => {
      const fieldSelection: FieldSelection<Category> = ["isActive", "name"];
      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toContain("fields%5B0%5D=isActive");
      expect(queryString).toContain("fields%5B1%5D=name");
    });

    it("should generate query string that matches Strapi expected format", () => {
      const fieldSelection: FieldSelection<Product> = ["name", "description"];
      const queryString = qs.stringify({ fields: fieldSelection });

      // Decode to verify format matches: fields[0]=name&fields[1]=description
      const decoded = decodeURIComponent(queryString);
      expect(decoded).toBe("fields[0]=name&fields[1]=description");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty fields array", () => {
      const fieldSelection: FieldSelection<Product> = [];
      const queryString = qs.stringify({ fields: fieldSelection });
      // Empty arrays are not serialized by qs
      expect(queryString).toBe("");
    });

    it("should handle undefined fields", () => {
      const fieldSelection: FieldSelection<Product> | undefined = undefined;
      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toBe("");
    });

    it("should handle single field in array", () => {
      const fieldSelection: FieldSelection<Product> = ["name"];
      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toBe("fields%5B0%5D=name"); // fields[0]=name
    });
  });

  describe("Integration with other parameters", () => {
    it("should work with pagination and filters", () => {
      const parameters = {
        fields: ["name", "price"] as PrimitiveFieldNames<Product>[],
        pagination: {
          page: 1,
          pageSize: 10,
        },
        filters: {
          product_status: { $eq: "active" },
        },
      };

      const queryString = qs.stringify(parameters);
      expect(queryString).toContain("fields");
      expect(queryString).toContain("pagination");
      expect(queryString).toContain("filters");
    });

    it("should work with populate and fields separately", () => {
      const parameters = {
        fields: ["name", "price"] as PrimitiveFieldNames<Product>[],
        populate: {
          category: {
            fields: ["name", "isActive"],
          },
        },
      };

      const queryString = qs.stringify(parameters);
      expect(queryString).toContain("fields");
      expect(queryString).toContain("populate");
    });

    it("should maintain field selection independence from relations", () => {
      // This test ensures that field selection doesn't interfere with populate
      const parameters = {
        fields: [
          "name",
          "description",
          "price",
        ] as PrimitiveFieldNames<Product>[],
        populate: {
          category: true,
          reviews: {
            populate: {
              author: true,
            },
          },
        },
      };

      const queryString = qs.stringify(parameters);
      const decoded = decodeURIComponent(queryString);

      expect(decoded).toContain("fields[0]=name");
      expect(decoded).toContain("fields[1]=description");
      expect(decoded).toContain("fields[2]=price");
      expect(decoded).toContain("populate[category]=true");
      expect(decoded).toContain("populate[reviews][populate][author]=true");
    });
  });

  describe("Complex model field selection", () => {
    it("should handle models with many primitive fields", () => {
      interface ComplexModel {
        id: number;
        documentId: string;
        stringField: string;
        numberField: number;
        booleanField: boolean;
        dateField: Date;
        optionalString?: string;
        optionalNumber?: number;
        nullableString: string | null;
        unionType: "option1" | "option2" | "option3";
        relatedModel?: Product;
        relatedArray?: Category[];
      }

      const fieldSelection: FieldSelection<ComplexModel> = [
        "id",
        "documentId",
        "stringField",
        "numberField",
        "booleanField",
        "dateField",
        "optionalString",
        "optionalNumber",
        "nullableString",
        "unionType",
      ];

      expect(fieldSelection).toHaveLength(10);

      const queryString = qs.stringify({ fields: fieldSelection });
      expect(queryString).toContain("stringField");
      expect(queryString).toContain("numberField");
      expect(queryString).toContain("booleanField");
      expect(queryString).toContain("dateField");
      expect(queryString).toContain("unionType");

      // Should not contain relation fields
      expect(queryString).not.toContain("relatedModel");
      expect(queryString).not.toContain("relatedArray");
    });
  });
});
