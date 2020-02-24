import subscriptionPlanJson from '@/utils/subscription-plan-data.json';

export const getPlan = function(plan_id){
  let plans = subscriptionPlanJson.plans;

  return plans.find(p => {
    let planIds = [
      p.month && p.month.stripeId.dev,
      p.month && p.month.stripeId.prod,
      p.year && p.year.stripeId.dev,
      p.year && p.year.stripeId.prod
    ]

    return planIds.includes(plan_id)
  }) || {}
}