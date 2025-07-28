export default {
    GET_BASELINE_SURVEY_LIST_BY_VILLAGE_ID: `select pbs.participants_baseline_survey_id, pbs.branch_village_map_id,
	pbs.educator_master_id as survey_educator_master_id, em.educator_name as survey_educator_name,um.user_master_id as survey_user_master_id,um.user_name as survey_user_name,
    bpm.batch_master_id, bem.educator_master_id as batch_educator_master_id,em1.educator_name as batch_educator_name, um1.user_master_id as batch_user_master_id,um1.user_name as batch_user_name,
	pbs.participants_name,pbs.participant_code, pbs.husband_or_guardian_name,pbs.mobile_number,
    pbs.participants_age,pbs.educational_qualification,pbs.occupation,pbs.married, pbs.family_monthly_income,pbs.religion,pbs.caste,
    pbs.bank_or_po_account,pbs.deposited_money_bank_or_po_last_3_month,pbs.atm_or_debit_card_withdraw_money,pbs.type_of_investment_account,
    pbs.life_insurance,pbs.health_insurance, pbs.money_spend_as_family_budget,pbs.loans,pbs.purpose_of_loan,pbs.use_digital_transaction_application,
    pbs.type_of_digital_transaction,pbs.government_financial_allowance,pbs.active_flag,pbs.created_by,pbs.created_on,
    bm.batch_name,rm.round_master_id,rm.round_name
    from participants_baseline_survey pbs 
    left join educator_master em on em.educator_master_id = pbs.educator_master_id and em.active_flag = 'A'
    left join educator_user_map eum on eum.educator_master_id = em.educator_master_id and eum.active_flag = 'A'
    left join user_master um on um.user_master_id = eum.user_master_id and um.active_flag = 'A'
    left join batch_participants_map bpm on bpm.participants_baseline_survey_id = pbs.participants_baseline_survey_id and bpm.active_flag = 'A'
    left join batch_master bm on bm.batch_master_id = bpm.batch_master_id and bm.active_flag = 'A'
    left join round_master rm on rm.round_master_id = bm.round_master_id and rm.active_flag = 'A'
    left join batch_educator_map bem on bem.batch_master_id = bpm.batch_master_id and bem.active_flag = 'A'
    left join educator_master em1 on em1.educator_master_id = bem.educator_master_id and em1.active_flag = 'A'
    left join educator_user_map eum1 on eum1.educator_master_id = em1.educator_master_id and eum1.active_flag = 'A'
    left join user_master um1 on um1.user_master_id = eum1.user_master_id and um1.active_flag = 'A'
    where pbs.active_flag = 'A' and pbs.branch_village_map_id = 
    (select  branch_village_map_id  from branch_village_map where village_master_id = %village_master_id% and 
    branch_master_id = %branch_master_id% and active_flag = 'A')
    order by pbs.participant_code;`,
}