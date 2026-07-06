import { getPrisma, refreshAnalyticsSummaries } from '../packages/db/src/index';

const today = new Date('2026-04-03T00:00:00.000Z');

const products = [
  {
    name: 'BPC-157',
    slug: 'bpc-157',
    canonicalUrl: 'https://elitebiotechpeptides.com/products/bpc-157',
    collection: 'recovery',
    status: 'active' as const
  },
  {
    name: 'TB-500',
    slug: 'tb-500',
    canonicalUrl: 'https://elitebiotechpeptides.com/products/tb-500',
    collection: 'recovery',
    status: 'active' as const
  },
  {
    name: 'CJC-1295',
    slug: 'cjc-1295',
    canonicalUrl: 'https://elitebiotechpeptides.com/products/cjc-1295',
    collection: 'performance',
    status: 'active' as const
  },
  {
    name: 'Ipamorelin',
    slug: 'ipamorelin',
    canonicalUrl: 'https://elitebiotechpeptides.com/products/ipamorelin',
    collection: 'performance',
    status: 'active' as const
  },
  {
    name: 'Weight Loss Collection',
    slug: 'weight-loss',
    canonicalUrl: 'https://elitebiotechpeptides.com/collections/weight-loss',
    collection: 'fat-loss',
    status: 'active' as const
  },
  {
    name: 'Recovery Collection',
    slug: 'recovery',
    canonicalUrl: 'https://elitebiotechpeptides.com/collections/recovery',
    collection: 'recovery',
    status: 'active' as const
  },
  {
    name: 'Performance Collection',
    slug: 'performance',
    canonicalUrl: 'https://elitebiotechpeptides.com/collections/performance',
    collection: 'performance',
    status: 'active' as const
  },
  {
    name: 'Sleep / Recovery Collection',
    slug: 'sleep-recovery',
    canonicalUrl: 'https://elitebiotechpeptides.com/collections/sleep-recovery',
    collection: 'sleep',
    status: 'active' as const
  }
];

const contentIdeas = [
  {
    title: 'Why recovery feels slower after 30',
    angle: 'age-related recovery curiosity',
    targetAudience: 'men-30-plus-fitness',
    funnelStage: 'top',
    mappedProductSlug: 'bpc-157',
    priority: 10,
    status: 'approved' as const,
    source: 'manual',
    platform: 'instagram' as const
  },
  {
    title: 'What people are quietly researching for recovery',
    angle: 'insider curiosity',
    targetAudience: 'biohackers',
    funnelStage: 'top',
    mappedProductSlug: 'recovery',
    priority: 10,
    status: 'approved' as const,
    source: 'manual',
    platform: 'tiktok' as const
  },
  {
    title: 'The reason gym progress stalls',
    angle: 'performance plateau',
    targetAudience: 'gym-goers',
    funnelStage: 'top',
    mappedProductSlug: 'performance',
    priority: 9,
    status: 'approved' as const,
    source: 'manual',
    platform: 'youtube' as const
  },
  {
    title: 'This is why bounce-back matters more than intensity',
    angle: 'training recovery',
    targetAudience: 'fitness-recovery',
    funnelStage: 'middle',
    mappedProductSlug: 'tb-500',
    priority: 9,
    status: 'approved' as const,
    source: 'manual',
    platform: 'instagram' as const
  },
  {
    title: 'Why sleep ruins everything when it slips',
    angle: 'sleep-performance link',
    targetAudience: 'sleep-optimization',
    funnelStage: 'top',
    mappedProductSlug: 'sleep-recovery',
    priority: 8,
    status: 'approved' as const,
    source: 'manual',
    platform: 'youtube' as const
  },
  {
    title: 'What high-performers pay attention to that others miss',
    angle: 'performance mindset',
    targetAudience: 'entrepreneurs-fitness',
    funnelStage: 'top',
    mappedProductSlug: 'performance',
    priority: 8,
    status: 'approved' as const,
    source: 'manual',
    platform: 'linkedin' as const
  },
  {
    title: 'Why fat loss gets harder when recovery is poor',
    angle: 'fat loss and stress',
    targetAudience: 'fat-loss-audience',
    funnelStage: 'top',
    mappedProductSlug: 'weight-loss',
    priority: 8,
    status: 'approved' as const,
    source: 'manual',
    platform: 'tiktok' as const
  },
  {
    title: 'The mistake people make when they only train harder',
    angle: 'overtraining curiosity',
    targetAudience: 'gym-goers',
    funnelStage: 'middle',
    mappedProductSlug: 'recovery',
    priority: 8,
    status: 'approved' as const,
    source: 'manual',
    platform: 'instagram' as const
  }
];

const promptVersions = [
  {
    agentName: 'content_planner' as const,
    versionLabel: 'v1',
    content:
      'Generate high-intent short-form content ideas for EliteBiotechPeptides.com mapped to specific products or collections. Focus on curiosity, performance, recovery, and wellness interest. Avoid risky claims.',
    active: true
  },
  {
    agentName: 'script_writer' as const,
    versionLabel: 'v1',
    content:
      'Write short-form scripts for EliteBiotechPeptides.com using mapped products or collections. Output hook, 20-second script, caption, CTA, hashtags, and platform variations. Avoid risky claims.',
    active: true
  },
  {
    agentName: 'product_mapper' as const,
    versionLabel: 'v1',
    content:
      'Map each content idea to the best-fitting product or collection page on EliteBiotechPeptides.com based on angle, audience, and funnel stage.',
    active: true
  },
  {
    agentName: 'analytics_summarizer' as const,
    versionLabel: 'v1',
    content:
      'Summarize daily and weekly content performance, top hooks, top products, top platforms, CTR, and next content recommendations for EliteBiotechPeptides.com.',
    active: true
  },
  {
    agentName: 'compliance_checker' as const,
    versionLabel: 'v1',
    content:
      'Review content, captions, engagement drafts, and CTAs for risky wording, prohibited claims, or platform-risky behavior before approval.',
    active: true
  }
];

async function upsertPromptVersion(entry: (typeof promptVersions)[number]) {
  const prisma = await getPrisma();
  const existing = await prisma.promptVersion.findFirst({
    where: {
      agentName: entry.agentName,
      versionLabel: entry.versionLabel
    }
  });

  if (existing) {
    return prisma.promptVersion.update({
      where: { id: existing.id },
      data: entry
    });
  }

  return prisma.promptVersion.create({ data: entry });
}

async function main() {
  const prisma = await getPrisma();
  const productRecords = new Map<
    string,
    {
      id: string;
      name: string;
      slug: string;
      canonicalUrl: string;
      collection: string | null;
    }
  >();
  for (const product of products) {
    const record = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
    productRecords.set(product.slug, record);
  }

  const promptRecords = new Map<string, { id: string }>();
  for (const promptVersion of promptVersions) {
    const record = await upsertPromptVersion(promptVersion);
    promptRecords.set(promptVersion.agentName, record);
  }

  const ideaRecords = new Map<string, string>();
  for (const [index, idea] of contentIdeas.entries()) {
    const product = productRecords.get(idea.mappedProductSlug);
    if (!product) {
      throw new Error(`Missing product for slug ${idea.mappedProductSlug}`);
    }

    const existing = await prisma.contentIdea.findFirst({
      where: { title: idea.title }
    });

    const data = {
      title: idea.title,
      angle: idea.angle,
      platform: idea.platform,
      status: idea.status,
      riskScore: idea.priority >= 9 ? 2 : 3,
      productName: product.name,
      productSlug: product.slug,
      collection: product.collection,
      contentCategory: idea.funnelStage,
      collectionCanonicalUrl: product.canonicalUrl.includes('/collections/')
        ? product.canonicalUrl
        : undefined,
      approvalRequired: true,
      approvalDecision: 'approved' as const,
      approvedBy: 'seed@elitebiotechpeptides.com',
      approvedAt: today,
      complianceCheckPassed: true,
      humanNotes: `Audience=${idea.targetAudience}; source=${idea.source}; priority=${idea.priority}`,
      productCanonicalUrl: product.canonicalUrl,
      product: { connect: { id: product.id } },
      promptVersion:
        index % 2 === 0
          ? { connect: { id: promptRecords.get('content_planner')!.id } }
          : { connect: { id: promptRecords.get('product_mapper')!.id } }
    };

    const record = existing
      ? await prisma.contentIdea.update({
          where: { id: existing.id },
          data
        })
      : await prisma.contentIdea.create({ data });

    ideaRecords.set(idea.title, record.id);
  }

  const assetSeeds = contentIdeas.slice(0, 5).map((idea, index) => ({
    mediaType: index % 2 === 0 ? 'short-form-video' : 'caption-pack',
    copy: `${idea.title} :: ${idea.angle}`,
    angle: idea.angle,
    platform: idea.platform,
    canonicalUrl: `https://elitebiotechpeptides.com/internal/assets/${idea.mappedProductSlug}-${index + 1}`,
    assetVersion: `v${index + 1}`,
    confidenceScore: 80 + index,
    agentNotes: `Mapped to ${idea.mappedProductSlug} for ${idea.targetAudience}`,
    product: { connect: { id: productRecords.get(idea.mappedProductSlug)!.id } },
    contentIdea: { connect: { id: ideaRecords.get(idea.title)! } }
  }));

  for (const asset of assetSeeds) {
    const existing = await prisma.contentAsset.findFirst({
      where: { canonicalUrl: asset.canonicalUrl }
    });

    if (existing) {
      await prisma.contentAsset.update({
        where: { id: existing.id },
        data: asset
      });
    } else {
      await prisma.contentAsset.create({ data: asset });
    }
  }

  const assets = await prisma.contentAsset.findMany({
    orderBy: { createdAt: 'asc' },
    take: 5
  });

  const queueSeeds = [
    {
      platform: 'instagram' as const,
      scheduledAt: new Date('2026-04-04T14:00:00.000Z'),
      status: 'scheduled' as const,
      approvalRequired: true,
      approvalDecision: 'approved' as const,
      approvedBy: 'seed@elitebiotechpeptides.com',
      approvedAt: today,
      complianceCheckPassed: true,
      retryCount: 0,
      failureReason: null as string | null,
      failurePayload: undefined,
      lastFailureAt: null,
      externalId: 'ig_ebp_001',
      externalUrl: 'https://www.instagram.com/p/elite-growth-os-1/',
      attemptDetails: { mode: 'stub', attempts: 1 },
      contentAsset: { connect: { id: assets[0]?.id ?? '' } }
    },
    {
      platform: 'tiktok' as const,
      scheduledAt: new Date('2026-04-04T18:00:00.000Z'),
      status: 'pending' as const,
      approvalRequired: true,
      approvalDecision: 'pending' as const,
      approvedBy: null,
      approvedAt: null,
      complianceCheckPassed: false,
      retryCount: 1,
      failureReason: 'Awaiting final human approval',
      failurePayload: { reason: 'approval_hold' },
      lastFailureAt: today,
      externalId: null,
      externalUrl: null,
      attemptDetails: { mode: 'stub', attempts: 1 },
      contentAsset: { connect: { id: assets[1]?.id ?? '' } }
    },
    {
      platform: 'youtube' as const,
      scheduledAt: new Date('2026-04-05T16:30:00.000Z'),
      status: 'failed' as const,
      approvalRequired: true,
      approvalDecision: 'approved' as const,
      approvedBy: 'seed@elitebiotechpeptides.com',
      approvedAt: today,
      complianceCheckPassed: true,
      retryCount: 2,
      failureReason: 'Platform adapter not configured',
      failurePayload: { reason: 'stubbed_platform_client' },
      lastFailureAt: today,
      externalId: null,
      externalUrl: null,
      attemptDetails: { mode: 'stub', attempts: 2 },
      contentAsset: { connect: { id: assets[2]?.id ?? '' } }
    }
  ].filter((entry) => entry.contentAsset?.connect.id);

  for (const job of queueSeeds) {
    const existing = await prisma.publishQueue.findFirst({
      where: {
        contentAssetId: job.contentAsset.connect.id,
        platform: job.platform,
        scheduledAt: job.scheduledAt
      }
    });

    if (existing) {
      await prisma.publishQueue.update({
        where: { id: existing.id },
        data: job
      });
    } else {
      await prisma.publishQueue.create({ data: job });
    }
  }

  const engagementSeeds = [
    {
      inboundThreadId: 'ig-inbound-384',
      type: 'reply' as const,
      status: 'pending' as const,
      draftCopy: 'Thanks for reaching out. We can point you to our recovery collection so you can review options directly.',
      riskScore: 2,
      approvalRequired: true,
      approvalDecision: 'pending' as const,
      approvedBy: null,
      approvedAt: null,
      complianceCheckPassed: false,
      complianceNotes: 'Waiting for manual review before sending.',
      responseChannel: 'instagram',
      promptVersion: { connect: { id: promptRecords.get('compliance_checker')!.id } },
      completedAt: null
    },
    {
      inboundThreadId: 'tt-inbound-388',
      type: 'dm' as const,
      status: 'approved' as const,
      draftCopy: 'Happy to help. Our performance collection is the cleanest place to browse depending on your training goals.',
      riskScore: 3,
      approvalRequired: true,
      approvalDecision: 'approved' as const,
      approvedBy: 'seed@elitebiotechpeptides.com',
      approvedAt: today,
      complianceCheckPassed: true,
      complianceNotes: 'Inbound only and soft CTA preserved.',
      responseChannel: 'tiktok',
      promptVersion: { connect: { id: promptRecords.get('compliance_checker')!.id } },
      completedAt: null
    },
    {
      inboundThreadId: 'yt-inbound-401',
      type: 'comment' as const,
      status: 'completed' as const,
      draftCopy: 'We focus on educational content first. You can browse the mapped collection in the profile links for more context.',
      riskScore: 1,
      approvalRequired: false,
      approvalDecision: 'approved' as const,
      approvedBy: 'seed@elitebiotechpeptides.com',
      approvedAt: today,
      complianceCheckPassed: true,
      complianceNotes: 'Approved and completed.',
      responseChannel: 'youtube',
      promptVersion: { connect: { id: promptRecords.get('compliance_checker')!.id } },
      completedAt: today
    }
  ];

  for (const task of engagementSeeds) {
    const existing = await prisma.engagementTask.findFirst({
      where: { inboundThreadId: task.inboundThreadId }
    });

    if (existing) {
      await prisma.engagementTask.update({
        where: { id: existing.id },
        data: task
      });
    } else {
      await prisma.engagementTask.create({ data: task });
    }
  }

  const analyticsSeeds = [
    {
      title: 'Why recovery feels slower after 30',
      platform: 'instagram' as const,
      views: 18420,
      likes: 922,
      comments: 118,
      shares: 84,
      profileVisits: 351,
      linkClicks: 164,
      ctr: 8.9,
      conversions: 16,
      revenue: 2480
    },
    {
      title: 'What people are quietly researching for recovery',
      platform: 'tiktok' as const,
      views: 13880,
      likes: 746,
      comments: 91,
      shares: 66,
      profileVisits: 280,
      linkClicks: 142,
      ctr: 7.4,
      conversions: 12,
      revenue: 1710
    },
    {
      title: 'The reason gym progress stalls',
      platform: 'youtube' as const,
      views: 9720,
      likes: 384,
      comments: 37,
      shares: 22,
      profileVisits: 126,
      linkClicks: 51,
      ctr: 3.2,
      conversions: 4,
      revenue: 610
    },
    {
      title: 'This is why bounce-back matters more than intensity',
      platform: 'instagram' as const,
      views: 15510,
      likes: 811,
      comments: 96,
      shares: 63,
      profileVisits: 302,
      linkClicks: 131,
      ctr: 6.4,
      conversions: 11,
      revenue: 1940
    },
    {
      title: 'Why sleep ruins everything when it slips',
      platform: 'youtube' as const,
      views: 6240,
      likes: 215,
      comments: 19,
      shares: 15,
      profileVisits: 80,
      linkClicks: 24,
      ctr: 2.1,
      conversions: 2,
      revenue: 260
    }
  ];

  for (const analytics of analyticsSeeds) {
    const contentIdeaId = ideaRecords.get(analytics.title);
    if (!contentIdeaId) {
      continue;
    }

    const existing = await prisma.analyticsDaily.findFirst({
      where: {
        date: today,
        contentIdeaId,
        platform: analytics.platform
      }
    });

    const data = {
      date: today,
      platform: analytics.platform,
      contentIdea: { connect: { id: contentIdeaId } },
      views: analytics.views,
      likes: analytics.likes,
      comments: analytics.comments,
      shares: analytics.shares,
      profileVisits: analytics.profileVisits,
      linkClicks: analytics.linkClicks,
      ctr: analytics.ctr,
      conversions: analytics.conversions,
      revenue: analytics.revenue
    };

    if (existing) {
      await prisma.analyticsDaily.update({
        where: { id: existing.id },
        data
      });
    } else {
      await prisma.analyticsDaily.create({ data });
    }
  }

  const agentRunSeeds = [
    {
      agentName: 'content_planner' as const,
      promptVersion: { connect: { id: promptRecords.get('content_planner')!.id } },
      payload: { source: 'seed', dryRun: true },
      output: { ideasCreated: 8 },
      summary: 'Seeded high-intent recovery and performance ideas.',
      dryRun: true,
      riskScore: 2,
      artifacts: { contentIdeaCount: 8 },
      status: 'completed',
      source: 'seed-script'
    },
    {
      agentName: 'product_mapper' as const,
      promptVersion: { connect: { id: promptRecords.get('product_mapper')!.id } },
      payload: { source: 'seed', dryRun: true },
      output: { mappedProducts: 8 },
      summary: 'Attached canonical URLs for seeded content ideas.',
      dryRun: true,
      riskScore: 1,
      artifacts: { mappings: 8 },
      status: 'completed',
      source: 'seed-script'
    },
    {
      agentName: 'script_writer' as const,
      promptVersion: { connect: { id: promptRecords.get('script_writer')!.id } },
      payload: { source: 'seed', dryRun: true },
      output: { assetsPrepared: 5 },
      summary: 'Prepared initial short-form script assets for the queue.',
      dryRun: true,
      riskScore: 2,
      artifacts: { assets: 5 },
      status: 'completed',
      source: 'seed-script'
    },
    {
      agentName: 'compliance_checker' as const,
      promptVersion: { connect: { id: promptRecords.get('compliance_checker')!.id } },
      payload: { source: 'seed', dryRun: true },
      output: { approved: 2, pending: 1 },
      summary: 'Reviewed engagement drafts and queue entries for risky wording.',
      dryRun: true,
      riskScore: 3,
      artifacts: { reviewedItems: 3 },
      status: 'completed',
      source: 'seed-script'
    },
    {
      agentName: 'analytics_summarizer' as const,
      promptVersion: { connect: { id: promptRecords.get('analytics_summarizer')!.id } },
      payload: { source: 'seed', date: today.toISOString() },
      output: { refreshed: true },
      summary: 'Rolled up daily analytics and generated report tables.',
      dryRun: false,
      riskScore: 1,
      artifacts: { date: today.toISOString() },
      status: 'completed',
      source: 'seed-script'
    }
  ];

  for (const run of agentRunSeeds) {
    const existing = await prisma.agentRun.findFirst({
      where: {
        agentName: run.agentName,
        summary: run.summary
      }
    });

    if (existing) {
      await prisma.agentRun.update({
        where: { id: existing.id },
        data: run
      });
    } else {
      await prisma.agentRun.create({ data: run });
    }
  }

  await refreshAnalyticsSummaries(today);

  console.log('Elite Growth OS seed complete');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = await getPrisma();
    await prisma.$disconnect();
  });
