import type {
  RiskAssessment,
} from './riskAssessment.js';

import type {
  RiskContext,
} from './riskContext.js';

import type {
  RiskEvaluator,
} from './riskEvaluator.js';

export class RiskEngine {

  constructor(
    private readonly evaluators:
      readonly RiskEvaluator[],
  ) {}

  async evaluate(
    context: RiskContext,
  ): Promise<RiskAssessment> {

    let score = 0;

    const reasons: string[] = [];

    for (const evaluator of this.evaluators) {

      const result =
        await evaluator.evaluate(
          context,
        );

      score += result.score;

      reasons.push(
        ...result.reasons,
      );
    }

    return {
      score,
      reasons,
    };
  }
}