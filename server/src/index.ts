
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createUserInputSchema,
  createProductInputSchema,
  createBlogPostInputSchema,
  createCaseStudyInputSchema,
  createTestimonialInputSchema,
  createAnalyticsEventInputSchema,
  createContactSubmissionInputSchema,
  createDocumentationInputSchema
} from './schema';

// Import handlers
import { createUser } from './handlers/create_user';
import { getUsers } from './handlers/get_users';
import { createProduct } from './handlers/create_product';
import { getProducts } from './handlers/get_products';
import { getProductById } from './handlers/get_product_by_id';
import { createBlogPost } from './handlers/create_blog_post';
import { getBlogPosts } from './handlers/get_blog_posts';
import { getPublishedBlogPosts } from './handlers/get_published_blog_posts';
import { createCaseStudy } from './handlers/create_case_study';
import { getCaseStudies } from './handlers/get_case_studies';
import { getCaseStudiesByProduct } from './handlers/get_case_studies_by_product';
import { createTestimonial } from './handlers/create_testimonial';
import { getTestimonialsByProduct } from './handlers/get_testimonials_by_product';
import { getFeaturedTestimonials } from './handlers/get_featured_testimonials';
import { createAnalyticsEvent } from './handlers/create_analytics_event';
import { getAnalyticsSummary } from './handlers/get_analytics_summary';
import { createContactSubmission } from './handlers/create_contact_submission';
import { getContactSubmissions } from './handlers/get_contact_submissions';
import { createDocumentation } from './handlers/create_documentation';
import { getDocumentationByProduct } from './handlers/get_documentation_by_product';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // User management
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),
  
  getUsers: publicProcedure
    .query(() => getUsers()),

  // Product management
  createProduct: publicProcedure
    .input(createProductInputSchema)
    .mutation(({ input }) => createProduct(input)),
  
  getProducts: publicProcedure
    .query(() => getProducts()),
  
  getProductById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getProductById(input.id)),

  // Blog management
  createBlogPost: publicProcedure
    .input(createBlogPostInputSchema)
    .mutation(({ input }) => createBlogPost(input)),
  
  getBlogPosts: publicProcedure
    .query(() => getBlogPosts()),
  
  getPublishedBlogPosts: publicProcedure
    .query(() => getPublishedBlogPosts()),

  // Case studies
  createCaseStudy: publicProcedure
    .input(createCaseStudyInputSchema)
    .mutation(({ input }) => createCaseStudy(input)),
  
  getCaseStudies: publicProcedure
    .query(() => getCaseStudies()),
  
  getCaseStudiesByProduct: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(({ input }) => getCaseStudiesByProduct(input.productId)),

  // Testimonials
  createTestimonial: publicProcedure
    .input(createTestimonialInputSchema)
    .mutation(({ input }) => createTestimonial(input)),
  
  getTestimonialsByProduct: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(({ input }) => getTestimonialsByProduct(input.productId)),
  
  getFeaturedTestimonials: publicProcedure
    .query(() => getFeaturedTestimonials()),

  // Analytics
  createAnalyticsEvent: publicProcedure
    .input(createAnalyticsEventInputSchema)
    .mutation(({ input }) => createAnalyticsEvent(input)),
  
  getAnalyticsSummary: publicProcedure
    .input(z.object({ days: z.number().optional() }))
    .query(({ input }) => getAnalyticsSummary(input.days)),

  // Contact and communication
  createContactSubmission: publicProcedure
    .input(createContactSubmissionInputSchema)
    .mutation(({ input }) => createContactSubmission(input)),
  
  getContactSubmissions: publicProcedure
    .query(() => getContactSubmissions()),

  // Documentation
  createDocumentation: publicProcedure
    .input(createDocumentationInputSchema)
    .mutation(({ input }) => createDocumentation(input)),
  
  getDocumentationByProduct: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(({ input }) => getDocumentationByProduct(input.productId)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
