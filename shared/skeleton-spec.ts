// Shared skeleton spec for the SSR LCP-lock skeleton (CAL-152) and the
// post-hydration React calculator <section> min-height (CAL-182). Keeping
// both values in one place prevents the two from drifting apart and
// re-introducing the wrapper-height-mismatch CLS shift.
export interface SkeletonSpec {
  heading: string;
  subtitle: string;
  minHeight: number;
}

export const SKELETON_SPEC: Record<string, SkeletonSpec> = {
  doelspaarcalculator: {
    heading: 'Doelspaarcalculator — Beheer al uw spaardoelen',
    subtitle:
      'Plan en beheer meerdere spaardoelen tegelijk. Krijg inzicht in benodigde maandelijkse bedragen, prioriteiten en realistische tijdslijnen voor al uw financiële doelen.',
    minHeight: 1300,
  },
  'noodfonds-calculator': {
    heading: 'Noodfonds Calculator — Bereken uw financiële buffer',
    subtitle:
      'Bereken hoeveel u moet sparen als noodfonds gebaseerd op uw uitgaven, inkomensituatie en persoonlijke omstandigheden.',
    minHeight: 1500,
  },
};
