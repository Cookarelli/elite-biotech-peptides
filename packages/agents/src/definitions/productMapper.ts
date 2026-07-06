import type { AgentDefinition } from '../types';
import type { ProductMapping } from '@elite-biotech/db';
import { mapContentIdeaToProduct } from '@elite-biotech/db';

export interface ProductMapperInputPayload {
  ideaTitle: string;
  targetSlug: string;
  catalog: ProductMapping[];
  ideaId?: string;
  collectionUrl?: string;
}

export interface ProductMapperOutput {
  productName: string;
  productSlug: string;
  canonicalUrl: string;
  collection?: string;
  angle: string;
}

export const productMapperDefinition: AgentDefinition<ProductMapperInputPayload, ProductMapperOutput> = {
  agentName: 'product-mapper',
  description: 'Links content ideas to specific products/collections with canonical URLs.',
  run: async ({ input }) => {
    const { ideaTitle, targetSlug, catalog } = input.payload;
    const candidate = catalog.find((entry) => entry.slug === targetSlug) ?? catalog[0];
    const productName = candidate?.name ?? 'Unmapped Product';
    const productSlug = candidate?.slug ?? targetSlug;
    const canonicalUrl = candidate?.canonicalUrl ?? `https://elitebiotechpeptides.com/collections/${targetSlug}`;
    const collection = candidate?.collection;
    const angle = `${ideaTitle} drills into why ${productName} works for ${collection ?? 'elite performance'}`;

    if (input.payload.ideaId) {
      await mapContentIdeaToProduct({
        ideaId: input.payload.ideaId,
        productId: candidate?.id,
        productName,
        productSlug,
        canonicalUrl,
        collection,
        collectionUrl: input.payload.collectionUrl
      });
    }

    return {
      summary: `Mapped ${ideaTitle} to ${productName}`,
      artifacts: { productName, productSlug, canonicalUrl, collection, angle },
      riskScore: 2,
      status: 'mapped'
    };
  },
  fixtures: [
    {
      id: 'map-performance',
      description: 'Maps idea to modular stack',
      input: {
        payload: {
          ideaTitle: 'Performance stacking',
          targetSlug: 'modular-peptide-stack',
          catalog: [
            {
              name: 'Modular Peptide Stack',
              slug: 'modular-peptide-stack',
              canonicalUrl: 'https://elitebiotechpeptides.com/products/modular-peptide-stack',
              collection: 'Performance',
              status: 'active'
            }
          ]
        }
      },
      expected: {
        summary: 'Mapped Performance stacking to Modular Peptide Stack'
      }
    }
  ]
};
