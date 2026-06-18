"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const dataFile = path.join(process.cwd(), "data.json");

// Define types based on what we had for Supabase
export type Product = {
  id: string;
  nama: string;
  harga: number;
  gambar: string;
  stok: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  komen: string;
  created_at: string;
};

export type SiteContent = {
  id: string;
  section: string;
  value: string;
};

type DbData = {
  products: Product[];
  testimonials: Testimonial[];
  site_content: SiteContent[];
};

// Helper to read DB
async function readDb(): Promise<DbData> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw) as DbData;
  } catch (error) {
    console.error("Failed to read DB", error);
    return { products: [], testimonials: [], site_content: [] };
  }
}

// Helper to write DB
async function writeDb(data: DbData): Promise<void> {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

// ════════════════════════════════════════
//  PRODUCTS
// ════════════════════════════════════════
export async function getProducts(): Promise<Product[]> {
  const db = await readDb();
  return db.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function saveProduct(product: Partial<Product> & { id?: string }): Promise<void> {
  const db = await readDb();
  if (product.id) {
    // Update
    const idx = db.products.findIndex(p => p.id === product.id);
    if (idx !== -1) {
      db.products[idx] = { ...db.products[idx], ...product } as Product;
    }
  } else {
    // Insert
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
      created_at: new Date().toISOString(),
    } as Product;
    db.products.push(newProduct);
  }
  await writeDb(db);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await readDb();
  db.products = db.products.filter(p => p.id !== id);
  await writeDb(db);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

// ════════════════════════════════════════
//  TESTIMONIALS
// ════════════════════════════════════════
export async function getTestimonials(): Promise<Testimonial[]> {
  const db = await readDb();
  return db.testimonials.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function saveTestimonial(testi: Partial<Testimonial> & { id?: string }): Promise<void> {
  const db = await readDb();
  if (testi.id) {
    // Update
    const idx = db.testimonials.findIndex(t => t.id === testi.id);
    if (idx !== -1) {
      db.testimonials[idx] = { ...db.testimonials[idx], ...testi } as Testimonial;
    }
  } else {
    // Insert
    const newTesti: Testimonial = {
      ...testi,
      id: `t${Date.now()}`,
      created_at: new Date().toISOString(),
    } as Testimonial;
    db.testimonials.push(newTesti);
  }
  await writeDb(db);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function deleteTestimonial(id: string): Promise<void> {
  const db = await readDb();
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  await writeDb(db);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

// ════════════════════════════════════════
//  SITE CONTENT
// ════════════════════════════════════════
export async function getSiteContent(): Promise<SiteContent[]> {
  const db = await readDb();
  return db.site_content;
}

export async function saveSiteContent(id: string, value: string): Promise<void> {
  const db = await readDb();
  const idx = db.site_content.findIndex(c => c.id === id);
  if (idx !== -1) {
    db.site_content[idx].value = value;
    await writeDb(db);
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
  }
}
