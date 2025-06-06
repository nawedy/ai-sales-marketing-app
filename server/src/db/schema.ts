
import { 
  serial, 
  text, 
  pgTable, 
  timestamp, 
  numeric, 
  integer, 
  boolean, 
  jsonb, 
  varchar,
  pgEnum
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'client']);
export const eventTypeEnum = pgEnum('event_type', ['page_view', 'product_view', 'contact_form', 'download', 'signup']);
export const entityTypeEnum = pgEnum('entity_type', ['product', 'blog_post', 'case_study', 'landing_page']);
export const contactStatusEnum = pgEnum('contact_status', ['new', 'contacted', 'qualified', 'closed']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: text('password_hash').notNull(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  role: userRoleEnum('role').notNull().default('client'),
  avatar_url: text('avatar_url'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Products table
export const productsTable = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  short_description: text('short_description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  features: jsonb('features').notNull().default([]),
  benefits: jsonb('benefits').notNull().default([]),
  hero_image_url: text('hero_image_url'),
  gallery_images: jsonb('gallery_images').notNull().default([]),
  category: varchar('category', { length: 100 }).notNull(),
  tags: jsonb('tags').notNull().default([]),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Blog posts table
export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt').notNull(),
  featured_image_url: text('featured_image_url'),
  author_id: integer('author_id').notNull().references(() => usersTable.id),
  categories: jsonb('categories').notNull().default([]),
  tags: jsonb('tags').notNull().default([]),
  is_published: boolean('is_published').notNull().default(false),
  published_at: timestamp('published_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Case studies table
export const caseStudiesTable = pgTable('case_studies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  client_name: varchar('client_name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 100 }).notNull(),
  problem: text('problem').notNull(),
  solution: text('solution').notNull(),
  results: text('results').notNull(),
  featured_image_url: text('featured_image_url'),
  gallery_images: jsonb('gallery_images').notNull().default([]),
  metrics: jsonb('metrics').notNull().default({}),
  product_id: integer('product_id').notNull().references(() => productsTable.id),
  is_published: boolean('is_published').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Testimonials table
export const testimonialsTable = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  author_name: varchar('author_name', { length: 255 }).notNull(),
  author_title: varchar('author_title', { length: 255 }).notNull(),
  author_company: varchar('author_company', { length: 255 }).notNull(),
  author_avatar_url: text('author_avatar_url'),
  rating: integer('rating').notNull(),
  product_id: integer('product_id').notNull().references(() => productsTable.id),
  is_featured: boolean('is_featured').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Analytics events table
export const analyticsEventsTable = pgTable('analytics_events', {
  id: serial('id').primaryKey(),
  event_type: eventTypeEnum('event_type').notNull(),
  entity_type: entityTypeEnum('entity_type'),
  entity_id: integer('entity_id'),
  user_id: integer('user_id').references(() => usersTable.id),
  session_id: varchar('session_id', { length: 255 }).notNull(),
  ip_address: varchar('ip_address', { length: 45 }).notNull(),
  user_agent: text('user_agent').notNull(),
  referrer: text('referrer'),
  metadata: jsonb('metadata').notNull().default({}),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Contact submissions table
export const contactSubmissionsTable = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  product_id: integer('product_id').references(() => productsTable.id),
  status: contactStatusEnum('status').notNull().default('new'),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Documentation table
export const documentationTable = pgTable('documentation', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  product_id: integer('product_id').notNull().references(() => productsTable.id),
  order_index: integer('order_index').notNull().default(0),
  is_published: boolean('is_published').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  blogPosts: many(blogPostsTable),
  analyticsEvents: many(analyticsEventsTable)
}));

export const productsRelations = relations(productsTable, ({ many }) => ({
  caseStudies: many(caseStudiesTable),
  testimonials: many(testimonialsTable),
  contactSubmissions: many(contactSubmissionsTable),
  documentation: many(documentationTable)
}));

export const blogPostsRelations = relations(blogPostsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [blogPostsTable.author_id],
    references: [usersTable.id]
  })
}));

export const caseStudiesRelations = relations(caseStudiesTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [caseStudiesTable.product_id],
    references: [productsTable.id]
  })
}));

export const testimonialsRelations = relations(testimonialsTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [testimonialsTable.product_id],
    references: [productsTable.id]
  })
}));

export const contactSubmissionsRelations = relations(contactSubmissionsTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [contactSubmissionsTable.product_id],
    references: [productsTable.id]
  })
}));

export const documentationRelations = relations(documentationTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [documentationTable.product_id],
    references: [productsTable.id]
  })
}));

export const analyticsEventsRelations = relations(analyticsEventsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [analyticsEventsTable.user_id],
    references: [usersTable.id]
  })
}));

// Export all tables for proper query building
export const tables = {
  users: usersTable,
  products: productsTable,
  blogPosts: blogPostsTable,
  caseStudies: caseStudiesTable,
  testimonials: testimonialsTable,
  analyticsEvents: analyticsEventsTable,
  contactSubmissions: contactSubmissionsTable,
  documentation: documentationTable
};
