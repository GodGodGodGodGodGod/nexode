export interface RiskAssessment {
  readonly score: number;

  readonly reasons: readonly string[];
}