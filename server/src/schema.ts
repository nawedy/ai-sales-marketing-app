
import { z } from 'zod';

// User and Authentication schemas
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password_hash: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum(['admin', 'client']),
  avatar_url: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum(['admin', 'client']).default('client'),
  avatar_url: z.string().nullable().optional()
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

// Product schemas
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  short_description: z.string(),
  price: z.number(),
  features: z.array(z.string()),
  benefits: z.array(z.string()),
  hero_image_url: z.string().nullable(),
  gallery_images: z.array(z.string()),
  category: z.string(),
  tags: z.array(z.string()),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Product = z.infer<typeof productSchema>;

export const createProductInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  short_description: z.string(),
  price: z.number().positive(),
  features: z.array(z.string()),
  benefits: z.array(z.string()),
  hero_image_url: z.string().nullable().optional(),
  gallery_images: z.array(z.string()).default([]),
  category: z.string(),
  tags: z.array(z.string()).default([])
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

// Blog schemas
export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  featured_image_url: z.string().nullable(),
  author_id: z.number(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  is_published: z.boolean(),
  published_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export const createBlogPostInputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  featured_image_url: z.string().nullable().optional(),
  author_id: z.number(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  is_published: z.boolean().default(false)
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostInputSchema>;

// Case Study schemas
export const caseStudySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  client_name: z.string(),
  industry: z.string(),
  problem: z.string(),
  solution: z.string(),
  results: z.string(),
  featured_image_url: z.string().nullable(),
  gallery_images: z.array(z.string()),
  metrics: z.record(z.string(), z.number()),
  product_id: z.number(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

export const createCaseStudyInputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  client_name: z.string(),
  industry: z.string(),
  problem: z.string(),
  solution: z.string(),
  results: z.string(),
  featured_image_url: z.string().nullable().optional(),
  gallery_images: z.array(z.string()).default([]),
  metrics: z.record(z.string(), z.number()).default({}),
  product_id: z.number()
});

export type CreateCaseStudyInput = z.infer<typeof createCaseStudyInputSchema>;

// Testimonial schemas
export const testimonialSchema = z.object({
  id: z.number(),
  content: z.string(),
  author_name: z.string(),
  author_title: z.string(),
  author_company: z.string(),
  author_avatar_url: z.string().nullable(),
  rating: z.number().int().min(1).max(5),
  product_id: z.number(),
  is_featured: z.boolean(),
  created_at: z.coerce.date()
});

export type Testimonial = z.infer<typeof testimonialSchema>;

export const createTestimonialInputSchema = z.object({
  content: z.string(),
  author_name: z.string(),
  author_title: z.string(),
  author_company: z.string(),
  author_avatar_url: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5),
  product_id: z.number(),
  is_featured: z.boolean().default(false)
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialInputSchema>;

// Analytics schemas
export const analyticsEventSchema = z.object({
  id: z.number(),
  event_type: z.enum(['page_view', 'product_view', 'contact_form', 'download', 'signup']),
  entity_type: z.enum(['product', 'blog_post', 'case_study', 'landing_page']).nullable(),
  entity_id: z.number().nullable(),
  user_id: z.number().nullable(),
  session_id: z.string(),
  ip_address: z.string(),
  user_agent: z.string(),
  referrer: z.string().nullable(),
  metadata: z.record(z.string(), z.any()),
  created_at: z.coerce.date()
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export const createAnalyticsEventInputSchema = z.object({
  event_type: z.enum(['page_view', 'product_view', 'contact_form', 'download', 'signup']),
  entity_type: z.enum(['product', 'blog_post', 'case_study', 'landing_page']).nullable().optional(),
  entity_id: z.number().nullable().optional(),
  user_id: z.number().nullable().optional(),
  session_id: z.string(),
  ip_address: z.string(),
  user_agent: z.string(),
  referrer: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.any()).default({})
});

export type CreateAnalyticsEventInput = z.infer<typeof createAnalyticsEventInputSchema>;

// Contact and Communication schemas
export const contactSubmissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().nullable(),
  phone: z.string().nullable(),
  message: z.string(),
  product_id: z.number().nullable(),
  status: z.enum(['new', 'contacted', 'qualified', 'closed']),
  created_at: z.coerce.date()
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export const createContactSubmissionInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  message: z.string(),
  product_id: z.number().nullable().optional()
});

export type CreateContactSubmissionInput = z.infer<typeof createContactSubmissionInputSchema>;

// Documentation schemas
export const documentationSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  category: z.string(),
  product_id: z.number(),
  order_index: z.number().int(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Documentation = z.infer<typeof documentationSchema>;

export const createDocumentationInputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  category: z.string(),
  product_id: z.number(),
  order_index: z.number().int().default(0)
});

export type CreateDocumentationInput = z.infer<typeof createDocumentationInputSchema>;
