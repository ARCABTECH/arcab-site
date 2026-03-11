type Primitive = string | number | boolean;
type EventPayload = Record<string, Primitive | undefined>;

const SESSION_ID_KEY = 'arcab_analytics_session_id';
const LEAD_JOURNEY_ID_KEY = 'arcab_analytics_lead_journey_id';
const LEAD_JOURNEY_STARTED_AT_KEY = 'arcab_analytics_lead_journey_started_at';
const ACQUISITION_PARAMS_KEY = 'arcab_analytics_acquisition_params';
const MAX_STRING_LENGTH = 300;
const ACQUISITION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

type AcquisitionParamKey = (typeof ACQUISITION_KEYS)[number];
type AcquisitionParams = Partial<Record<AcquisitionParamKey, string>>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const isBrowser = (): boolean => typeof window !== 'undefined';

const readStorage = (key: string): string | null => {
  if (!isBrowser()) {
    return null;
  }
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string): void => {
  if (!isBrowser()) {
    return;
  }
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // noop: unavailable storage should not block analytics
  }
};

const sanitizeValue = (value: Primitive): Primitive => {
  if (typeof value === 'string') {
    return value.slice(0, MAX_STRING_LENGTH);
  }
  return value;
};

const sanitizePayload = (payload: EventPayload): Record<string, Primitive> => {
  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);
  return entries.reduce<Record<string, Primitive>>((acc, [key, value]) => {
    if (value === undefined) {
      return acc;
    }
    acc[key] = sanitizeValue(value);
    return acc;
  }, {});
};

export const getSessionId = (): string => {
  const existing = readStorage(SESSION_ID_KEY);
  if (existing) {
    return existing;
  }
  const created = generateId();
  writeStorage(SESSION_ID_KEY, created);
  return created;
};

export const getLeadJourneyContext = (): { lead_journey_id?: string; journey_started_at?: number } => {
  const leadJourneyId = readStorage(LEAD_JOURNEY_ID_KEY) ?? undefined;
  const startedAtRaw = readStorage(LEAD_JOURNEY_STARTED_AT_KEY);
  const journeyStartedAt = startedAtRaw ? Number(startedAtRaw) : undefined;
  if (!leadJourneyId || !journeyStartedAt || Number.isNaN(journeyStartedAt)) {
    return {};
  }
  return { lead_journey_id: leadJourneyId, journey_started_at: journeyStartedAt };
};

export const startLeadJourney = (source?: string): { lead_journey_id: string; journey_started_at: number } => {
  const now = Date.now();
  const leadJourneyId = generateId();
  writeStorage(LEAD_JOURNEY_ID_KEY, leadJourneyId);
  writeStorage(LEAD_JOURNEY_STARTED_AT_KEY, String(now));
  if (source) {
    writeStorage('arcab_analytics_lead_journey_source', source);
  }
  return { lead_journey_id: leadJourneyId, journey_started_at: now };
};

export const ensureLeadJourney = (source?: string): { lead_journey_id: string; journey_started_at: number } => {
  const existing = getLeadJourneyContext();
  if (existing.lead_journey_id && existing.journey_started_at) {
    return {
      lead_journey_id: existing.lead_journey_id,
      journey_started_at: existing.journey_started_at,
    };
  }
  return startLeadJourney(source);
};

export const getJourneyElapsedMs = (): number | undefined => {
  const { journey_started_at: journeyStartedAt } = getLeadJourneyContext();
  if (!journeyStartedAt) {
    return undefined;
  }
  const elapsed = Date.now() - journeyStartedAt;
  return elapsed >= 0 ? elapsed : undefined;
};

export const getStoredAcquisitionParams = (): AcquisitionParams => {
  const raw = readStorage(ACQUISITION_PARAMS_KEY);
  if (!raw) {
    return {};
  }
  try {
    const parsed = JSON.parse(raw) as AcquisitionParams;
    return parsed ?? {};
  } catch {
    return {};
  }
};

export const captureAcquisitionParamsFromUrl = (): AcquisitionParams => {
  if (!isBrowser()) {
    return {};
  }

  const existing = getStoredAcquisitionParams();
  const searchParams = new URLSearchParams(window.location.search);
  const merged: AcquisitionParams = { ...existing };

  ACQUISITION_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      merged[key] = value;
    }
  });

  writeStorage(ACQUISITION_PARAMS_KEY, JSON.stringify(merged));
  return merged;
};

export const trackEvent = (eventName: string, payload: EventPayload = {}): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const acquisition = captureAcquisitionParamsFromUrl();
  const sessionId = getSessionId();
  const journey = getLeadJourneyContext();
  const mergedPayload = sanitizePayload({
    ...payload,
    ...acquisition,
    arcab_session_id: sessionId,
    ...journey,
  });

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...mergedPayload,
    });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, mergedPayload);
  }

  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true') {
    console.info(`[analytics] ${eventName}`, mergedPayload);
  }
};
