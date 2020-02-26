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
  })
}

// for use when the user is pro, but might have a plan from before we tracked
export const getPlanWithDefault = function(plan_id) {
  return getPlan(plan_id) || subscriptionPlanJson.plans.find(p => p.id == 2)
}