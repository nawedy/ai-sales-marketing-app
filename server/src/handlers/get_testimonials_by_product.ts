
import { type Testimonial } from '../schema';

export declare function getTestimonialsByProduct(productId: number): Promise<Testimonial[]>;
