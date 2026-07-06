import type {
  AgentName,
  Platform,
  ProductStatus,
} from '../../../node_modules/.prisma/client/enums';
import type { Prisma } from '../../../node_modules/.prisma/client/client';

export { getPrisma } from './client';

export interface ProductMapping {
  id?: string;
  name: string;
  slug: string;
  canonicalUrl: string;
  collection?: string;
  status?: ProductStatus;
}

export interface ContentIdeaSeed {
  title: string;
  angle: string;
  productSlug: string;
  productName: string;
  platform: Platform;
  riskScore: number;
}

export interface ContentIdeaMapping {
  ideaId: string;
  productId?: string;
  productName: string;
  productSlug: string;
  canonicalUrl: string;
  collection?: string;
  collectionUrl?: string;
}

export interface AgentRunPayload {
  agentName: AgentName | string;
  promptVersionId?: string;
  payload: Record<string, unknown>;
  output: Record<string, unknown>;
  summary: string;
  dryRun?: boolean;
  riskScore?: number;
  source?: string;
  status?: string;
  artifacts?: Record<string, unknown>;
}

export async function seedProducts(products: ProductMapping[]) {
  const { getPrisma } = await import('./client');
  const prisma = await getPrisma();
  await Promise.all(
    products.map((product) =>
      prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product
      })
    )
  );
}

export async function seedContentIdeas(ideas: ContentIdeaSeed[]) {
  const { getPrisma } = await import('./client');
  const prisma = await getPrisma();
  await Promise.all(
    ideas.map(async (idea) => {
      const existing = await prisma.contentIdea.findFirst({
        where: { title: idea.title }
      });

      if (existing) {
        return prisma.contentIdea.update({
          where: { id: existing.id },
          data: idea
        });
      }

      return prisma.contentIdea.create({
        data: idea
      });
    })
  );
}

export async function mapContentIdeaToProduct(mapping: ContentIdeaMapping) {
  const { getPrisma } = await import('./client');
  const prisma = await getPrisma();
  return prisma.contentIdea.update({
    where: { id: mapping.ideaId },
    data: {
      productId: mapping.productId,
      productName: mapping.productName,
      productSlug: mapping.productSlug,
      productCanonicalUrl: mapping.canonicalUrl,
      collection: mapping.collection ?? undefined,
      collectionCanonicalUrl: mapping.collectionUrl ?? undefined
    }
  });
}

export async function recordAgentRun(run: AgentRunPayload) {
  const { getPrisma } = await import('./client');
  const prisma = await getPrisma();
  return prisma.agentRun.create({
    data: {
      agentName: normalizeAgentName(run.agentName),
      promptVersionId: run.promptVersionId,
      payload: run.payload as Prisma.InputJsonValue,
      output: run.output as Prisma.InputJsonValue,
      summary: run.summary,
      dryRun: run.dryRun ?? false,
      riskScore: run.riskScore,
      source: run.source,
      status: run.status,
      artifacts: run.artifacts as Prisma.InputJsonValue | undefined
    }
  });
}

function normalizeAgentName(agentName: AgentRunPayload['agentName']): AgentName {
  return agentName.replaceAll('-', '_') as AgentName;
}

export * from './analytics';
