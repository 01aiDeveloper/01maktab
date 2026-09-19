import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { catalogApi } from '@/services/react-query/catalog';
import type { CourseKind } from '@/services/react-query/course';
import type { ApiPresale } from '@/types/api';
import { useAuth } from '@/hooks/common/use-auth';

export interface CoursePaymentInfo {
  id: number | string;
  name: string;
  title: string;
  price: number;
  pricingType: 'FREE' | 'PAID';
  waitlistEnabled?: boolean;
  presalesEnabled?: boolean;
  preSales?: ApiPresale | null;
  photo?: string | null;
  icon?: string | null;
  decorImage?: string | null;
  description?: string;
}

function toCourseKind(courseType: string): CourseKind {
  if (courseType === 'skill') return 'skill';
  if (courseType === 'profession') return 'profession';
  return 'course';
}

function pickPaymentInfo(detail: Record<string, unknown>): CoursePaymentInfo {
  return {
    id: detail.id as number | string,
    name: String(detail.name ?? ''),
    title: String(detail.title ?? detail.name ?? ''),
    price: Number(detail.price ?? 0),
    pricingType: (detail.pricingType as CoursePaymentInfo['pricingType']) ?? 'PAID',
    waitlistEnabled: detail.waitlistEnabled as boolean | undefined,
    presalesEnabled: detail.presalesEnabled as boolean | undefined,
    preSales: (detail.preSales as ApiPresale | null | undefined) ?? null,
    photo: detail.photo as string | null | undefined,
    icon: detail.icon as string | null | undefined,
    decorImage: detail.decorImage as string | null | undefined,
    description: detail.description as string | undefined,
  };
}

export function isWaitlistOnlyPurchaseBlocked(info: CoursePaymentInfo): boolean {
  const hasActivePresale = !!info.preSales;
  return Boolean(info.waitlistEnabled) && !hasActivePresale && !info.presalesEnabled;
}

/** Price used for promocode check and payment (pre-sales first, then list price). */
export function getPaymentBasePrice(info: CoursePaymentInfo): number {
  if (info.preSales?.preSalesPrice != null) return info.preSales.preSalesPrice;
  return info.price ?? 0;
}

export function courseDetailBackPath(courseType: string, courseId: string): string {
  if (courseType === 'skill') return `/skills/${courseId}`;
  if (courseType === 'profession') return `/professions/${courseId}`;
  return `/courses/${courseId}`;
}

export function useCourseInfo(courseId: string | number | undefined, courseType: string = 'course') {
  const { accessToken } = useAuth();
  const kind = toCourseKind(courseType);
  const authenticated = Boolean(accessToken);

  return useQuery<CoursePaymentInfo>({
    queryKey: [...queryKeys.course.info(courseType, courseId ?? ''), authenticated ? 'client' : 'public'],
    queryFn: async () => {
      const detail = await catalogApi.getDetail(kind, courseId!, authenticated);
      return pickPaymentInfo(detail as Record<string, unknown>);
    },
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });
}
