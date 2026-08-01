import type {
  RiskAssessment,
} from './riskAssessment.js';

import type {
  RiskContext,
} from './riskContext.js';

export interface RiskEvaluator {
  evaluate(
    context: RiskContext,
  ): Promise<RiskAssessment>;
}