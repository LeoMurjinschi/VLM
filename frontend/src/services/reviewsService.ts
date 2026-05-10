import { MOCK_REVIEWS, MOCK_DONOR_PROFILES, type Review, type ReviewAggregate, type ReviewTargetType } from '../_mock/reviews';

const SIMULATED_LATENCY_MS = 300;

const delay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const reviewStore: Review[] = [...MOCK_REVIEWS];

export const fetchReviews = async (
  targetType: ReviewTargetType,
  targetId: string
): Promise<Review[]> => {
  await delay();
  return reviewStore
    .filter(
      (r) =>
        r.targetType === targetType &&
        r.targetId === targetId &&
        r.status !== 'deleted'
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const fetchAggregate = async (
  targetType: ReviewTargetType,
  targetId: string
): Promise<ReviewAggregate> => {
  await delay(150);
  return computeAggregate(targetType, targetId);
};

export const computeAggregate = (
  targetType: ReviewTargetType,
  targetId: string
): ReviewAggregate => {
  const items = reviewStore.filter(
    (r) =>
      r.targetType === targetType &&
      r.targetId === targetId &&
      r.status === 'approved'
  );

  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;
  for (const r of items) {
    sum += r.rating;
    const key = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[key] += 1;
  }

  return {
    average: items.length === 0 ? 0 : sum / items.length,
    total: items.length,
    distribution,
  };
};

export const submitReview = async (
  input: Omit<Review, 'id' | 'date' | 'status'>
): Promise<Review> => {
  await delay(400);
  const created: Review = {
    ...input,
    id: `r_${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    status: 'approved',
  };
  reviewStore.unshift(created);
  return created;
};

export const fetchDonorProfile = async (donorId: string) => {
  await delay(200);
  return MOCK_DONOR_PROFILES.find((d) => d.id === donorId) || null;
};

export const fetchAllDonorProfiles = async () => {
  await delay(200);
  return MOCK_DONOR_PROFILES;
};
