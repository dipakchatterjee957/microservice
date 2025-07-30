export default {

    GET_PREREQUISITE_BY_CATAGORY_SELECTION_ID: `select cs.category_section_id,cs.category_section_name, mc.main_category_id,mc.main_category_name,
    sc.sub_category_id,sc.sub_category_name from category_section cs
    inner join main_category mc on mc.category_section_id = cs.category_section_id and mc.active_flag = 'A'
    inner join sub_category sc on sc.main_category_id = mc.main_category_id and sc.active_flag = 'A'
    where cs.active_flag = 'A' and cs.category_section_id = %category_section_id%;`,

    GET_EDUCATOR_BY_USER_ID: `select em.educator_master_id,em.educator_name from educator_master em 
    left join educator_user_map eum on eum.educator_master_id = em.educator_master_id and eum.active_flag = 'A'
    where em.active_flag = 'A' and em.educator_type = 'A' and eum.user_master_id = %user_master_id%;`,

    GET_BASELINE_SURVEY_REPORT_BY_BRANCH_ID: `SELECT 
    pbs.participants_baseline_survey_id, 
    pbs.branch_village_map_id,
    pm.project_master_id,
    pm.project_code,
    rem.region_master_id,
    rem.region_name,
    bvm.branch_master_id,
    brm.branch_name,
    sm.state_master_id,
    sm.state_name,
    dm.district_master_id,
    dm.district_name,
    blm.block_master_id, 
    blm.block_name,
    gm.gp_master_id,gm.gp_name,
    vm.village_master_id,
    vm.village_name,
    pbs.educator_master_id AS survey_educator_master_id, 
    em.educator_name AS survey_educator_name, 
    um.user_master_id AS survey_user_master_id,
    um.user_name AS survey_user_name,
    bpm.batch_master_id, 
    bem.educator_master_id AS batch_educator_master_id,
    em1.educator_name AS batch_educator_name, 
    um1.user_master_id AS batch_user_master_id,
    um1.user_name AS batch_user_name,
    pbs.participants_name, 
    pbs.participant_code, 
    pbs.husband_or_guardian_name,
    pbs.mobile_number,
    pbs.participants_age, 
    sc7.sub_category_name AS educational_qualification,
    sc8.sub_category_name AS occupation, 
    if(pbs.married = 'Y', 'Yes' , 'No') AS married,
    sc9.sub_category_name AS family_monthly_income,
    sc10.sub_category_name AS religion, 
    sc11.sub_category_name AS caste,
	if(pbs.bank_or_po_account = 'Y', 'Yes' , 'No') AS bank_or_po_account,
	if(pbs.deposited_money_bank_or_po_last_3_month = 'Y', 'Yes' , 'No') AS deposited_money_bank_or_po_last_3_month,
	if(pbs.atm_or_debit_card_withdraw_money = 'Y', 'Yes' , 'No') AS atm_or_debit_card_withdraw_money,
    
    -- Fetch Investment Account Names
    GROUP_CONCAT(DISTINCT sc1.sub_category_name) AS type_of_investment_accounts, 
    
    -- Fetch Life Insurance Names
    GROUP_CONCAT(DISTINCT sc2.sub_category_name) AS life_insurances,
	if(pbs.health_insurance = 'Y', 'Yes' , 'No') AS health_insurance,
	if(pbs.money_spend_as_family_budget = 'Y', 'Yes' , 'No') AS money_spend_as_family_budget,
    GROUP_CONCAT(DISTINCT sc3.sub_category_name) AS loans,
    GROUP_CONCAT(DISTINCT sc4.sub_category_name) AS purpose_of_loan,
    GROUP_CONCAT(DISTINCT sc5.sub_category_name) AS use_digital_transaction_application,
    GROUP_CONCAT(DISTINCT sc6.sub_category_name) AS type_of_digital_transaction,
	if(pbs.government_financial_allowance = 'Y', 'Yes' , 'No') AS government_financial_allowance,
    pbs.active_flag, 
    pbs.created_by, 
    pbs.created_on,
    bm.batch_name, 
    rm.round_master_id, 
    rm.round_name
    FROM participants_baseline_survey pbs 
    -- Branch Village
    LEFT JOIN branch_village_map bvm on bvm.branch_village_map_id = pbs.branch_village_map_id and bvm.active_flag = 'A'
    left join branch_master brm on brm.branch_master_id = bvm.branch_master_id and brm.active_flag in('A','PO')
    left join project_master pm on pm.project_master_id = brm.project_master_id and pm.active_flag = 'A'
    left join region_master rem on rem.region_master_id = brm.region_master_id and rem.active_flag = 'A'
    left join state_master sm on sm.state_master_id = rem.state_master_id and sm.active_flag = 'A'
    left join village_master vm on vm.village_master_id = bvm.village_master_id and vm.active_flag = 'A'
    left join gp_master gm on gm.gp_master_id = vm.gp_master_id and gm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = gm.block_master_id and blm.active_flag = 'A'
    left join district_master dm on dm.district_master_id = blm.district_master_id and dm.active_flag = 'A'


    -- Joins for educator and user information
    LEFT JOIN educator_master em ON em.educator_master_id = pbs.educator_master_id AND em.active_flag = 'A'
    LEFT JOIN educator_user_map eum ON eum.educator_master_id = em.educator_master_id AND eum.active_flag = 'A'
    LEFT JOIN user_master um ON um.user_master_id = eum.user_master_id AND um.active_flag = 'A'

    -- Joins for batch and round details
    LEFT JOIN batch_participants_map bpm ON bpm.participants_baseline_survey_id = pbs.participants_baseline_survey_id AND bpm.active_flag = 'A'
    LEFT JOIN batch_master bm ON bm.batch_master_id = bpm.batch_master_id AND bm.active_flag = 'A'
    LEFT JOIN round_master rm ON rm.round_master_id = bm.round_master_id AND rm.active_flag = 'A'

    -- Joins for batch educators
    LEFT JOIN batch_educator_map bem ON bem.batch_master_id = bpm.batch_master_id AND bem.active_flag = 'A'
    LEFT JOIN educator_master em1 ON em1.educator_master_id = bem.educator_master_id AND em1.active_flag = 'A'
    LEFT JOIN educator_user_map eum1 ON eum1.educator_master_id = em1.educator_master_id AND eum1.active_flag = 'A'
    LEFT JOIN user_master um1 ON um1.user_master_id = eum1.user_master_id AND um1.active_flag = 'A'

    -- Joins for Investment Account & Life Insurance Names
    LEFT JOIN sub_category sc1 ON FIND_IN_SET(sc1.sub_category_id, pbs.type_of_investment_account) > 0
    LEFT JOIN sub_category sc2 ON FIND_IN_SET(sc2.sub_category_id, pbs.life_insurance) > 0
    LEFT JOIN sub_category sc3 ON FIND_IN_SET(sc3.sub_category_id, pbs.loans) > 0
    LEFT JOIN sub_category sc4 ON FIND_IN_SET(sc4.sub_category_id, pbs.purpose_of_loan) > 0
    LEFT JOIN sub_category sc5 ON FIND_IN_SET(sc5.sub_category_id, pbs.use_digital_transaction_application) > 0
    LEFT JOIN sub_category sc6 ON FIND_IN_SET(sc6.sub_category_id, pbs.type_of_digital_transaction) > 0
    -- /////
    LEFT JOIN sub_category sc7 ON pbs.educational_qualification = sc7.sub_category_id and sc7.active_flag = 'A'
    LEFT JOIN sub_category sc8 ON pbs.occupation = sc8.sub_category_id and sc8.active_flag = 'A'
    LEFT JOIN sub_category sc9 ON pbs.family_monthly_income = sc9.sub_category_id and sc9.active_flag = 'A'
    LEFT JOIN sub_category sc10 ON pbs.religion = sc10.sub_category_id and sc10.active_flag = 'A'
    LEFT JOIN sub_category sc11 ON pbs.caste = sc11.sub_category_id and sc11.active_flag = 'A'


    WHERE 
        pbs.active_flag = 'A' 
        AND pbs.branch_village_map_id in(
            SELECT branch_village_map_id  
            FROM branch_village_map 
            WHERE branch_master_id = %branch_master_id% 
            AND active_flag = 'A'
        )
    GROUP BY 
        pbs.participants_baseline_survey_id;`,

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

    CHECK_BASELINE_SURVEY_STATUS: `SELECT * FROM round_master WHERE branch_master_id = %branch_master_id% AND active_flag = 'A' 
    AND is_locked = 'N' AND baseline_survey_status = 'O' 
    AND round_start_date IS NOT NULL AND round_end_date IS NULL;`,

    BEFORE_CREATE_FIND_BRANCH_VILLAGE_MAP_ID: `select  branch_village_map_id  from branch_village_map 
    where village_master_id = %village_master_id% and active_flag = 'A';`,

    CREATE_BASELINE_SURVEY: `INSERT INTO participants_baseline_survey
    (branch_village_map_id,
    educator_master_id,
    participants_name,
    husband_or_guardian_name,
    mobile_number,
    participants_age,
    educational_qualification,
    occupation,
    married,
    family_monthly_income,
    religion,
    caste,
    bank_or_po_account,
    deposited_money_bank_or_po_last_3_month,
    atm_or_debit_card_withdraw_money,
    type_of_investment_account,
    life_insurance,
    health_insurance,
    money_spend_as_family_budget,
    loans,
    purpose_of_loan,
    use_digital_transaction_application,
    type_of_digital_transaction,
    government_financial_allowance,
    created_by)
    VALUES
    (%branch_village_map_id%,
    %educator_master_id% ,
    '%participants_name%' ,
    '%husband_or_guardian_name%' ,
    %mobile_number% ,
    '%participants_age%' ,
    '%educational_qualification%' ,
    '%occupation%' ,
    '%married%' ,
    '%family_monthly_income%' ,
    '%religion%' ,
    '%caste%' ,
    '%bank_or_po_account%' ,
    '%deposited_money_bank_or_po_last_3_month%' ,
    '%atm_or_debit_card_withdraw_money%' ,
    '%type_of_investment_account%' ,
    '%life_insurance%' ,
    '%health_insurance%' ,
    '%money_spend_as_family_budget%' ,
    '%loans%' ,
    %purpose_of_loan% ,
    '%use_digital_transaction_application%' ,
    %type_of_digital_transaction% ,
    '%government_financial_allowance%' ,
    '%created_by%' );`,

    UPDATE_BASELINE_SURVEY: `UPDATE participants_baseline_survey
    SET educator_master_id = '%educator_master_id%'
    , participants_name = '%participants_name%'
    , husband_or_guardian_name = '%husband_or_guardian_name%'
    , mobile_number = %mobile_number%
    , participants_age = '%participants_age%'
    , educational_qualification = '%educational_qualification%'
    , occupation = '%occupation%'
    , married = '%married%'
    , family_monthly_income = '%family_monthly_income%'
    , religion = '%religion%'
    , caste = '%caste%'
    , bank_or_po_account = '%bank_or_po_account%'
    , deposited_money_bank_or_po_last_3_month = '%deposited_money_bank_or_po_last_3_month%'
    , atm_or_debit_card_withdraw_money = '%atm_or_debit_card_withdraw_money%'
    , type_of_investment_account = '%type_of_investment_account%'
    , life_insurance = '%life_insurance%'
    , health_insurance = '%health_insurance%'
    , money_spend_as_family_budget = '%money_spend_as_family_budget%'
    , loans = '%loans%'
    , purpose_of_loan = %purpose_of_loan%
    , use_digital_transaction_application = '%use_digital_transaction_application%'
    , type_of_digital_transaction = %type_of_digital_transaction%
    , government_financial_allowance = '%government_financial_allowance%'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE participants_baseline_survey_id = %participants_baseline_survey_id%;`,

    DELETE_BASELINE_SURVEY: `UPDATE participants_baseline_survey
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE participants_baseline_survey_id = %participants_baseline_survey_id%;`,

    GET_BASELINE_SURVEY_REPORT_BY_REGION_ID: `SELECT 
    pbs.participants_baseline_survey_id, 
    pbs.branch_village_map_id,
    pm.project_master_id,
    pm.project_code,
    rem.region_master_id,
    rem.region_name,
    bvm.branch_master_id,
    brm.branch_name,
    sm.state_master_id,
    sm.state_name,
    dm.district_master_id,
    dm.district_name,
    blm.block_master_id, 
    blm.block_name,
    gm.gp_master_id,gm.gp_name,
    vm.village_master_id,
    vm.village_name,
    pbs.educator_master_id AS survey_educator_master_id, 
    em.educator_name AS survey_educator_name, 
    um.user_master_id AS survey_user_master_id,
    um.user_name AS survey_user_name,
    bpm.batch_master_id, 
    bem.educator_master_id AS batch_educator_master_id,
    em1.educator_name AS batch_educator_name, 
    um1.user_master_id AS batch_user_master_id,
    um1.user_name AS batch_user_name,
    pbs.participants_name, 
    pbs.participant_code, 
    pbs.husband_or_guardian_name,
    pbs.mobile_number,
    pbs.participants_age, 
    sc7.sub_category_name AS educational_qualification,
    sc8.sub_category_name AS occupation, 
    if(pbs.married = 'Y', 'Yes' , 'No') AS married,
    sc9.sub_category_name AS family_monthly_income,
    sc10.sub_category_name AS religion, 
    sc11.sub_category_name AS caste,
	if(pbs.bank_or_po_account = 'Y', 'Yes' , 'No') AS bank_or_po_account,
	if(pbs.deposited_money_bank_or_po_last_3_month = 'Y', 'Yes' , 'No') AS deposited_money_bank_or_po_last_3_month,
	if(pbs.atm_or_debit_card_withdraw_money = 'Y', 'Yes' , 'No') AS atm_or_debit_card_withdraw_money,
    
    -- Fetch Investment Account Names
    GROUP_CONCAT(DISTINCT sc1.sub_category_name) AS type_of_investment_accounts, 
    
    -- Fetch Life Insurance Names
    GROUP_CONCAT(DISTINCT sc2.sub_category_name) AS life_insurances,
	if(pbs.health_insurance = 'Y', 'Yes' , 'No') AS health_insurance,
	if(pbs.money_spend_as_family_budget = 'Y', 'Yes' , 'No') AS money_spend_as_family_budget,
    GROUP_CONCAT(DISTINCT sc3.sub_category_name) AS loans,
    GROUP_CONCAT(DISTINCT sc4.sub_category_name) AS purpose_of_loan,
    GROUP_CONCAT(DISTINCT sc5.sub_category_name) AS use_digital_transaction_application,
    GROUP_CONCAT(DISTINCT sc6.sub_category_name) AS type_of_digital_transaction,
	if(pbs.government_financial_allowance = 'Y', 'Yes' , 'No') AS government_financial_allowance,
    pbs.active_flag, 
    pbs.created_by, 
    pbs.created_on,
    bm.batch_name, 
    rm.round_master_id, 
    rm.round_name
    FROM participants_baseline_survey pbs 
    -- Branch Village
    LEFT JOIN branch_village_map bvm on bvm.branch_village_map_id = pbs.branch_village_map_id and bvm.active_flag = 'A'
    left join branch_master brm on brm.branch_master_id = bvm.branch_master_id and brm.active_flag in('A','PO')
    left join project_master pm on pm.project_master_id = brm.project_master_id and pm.active_flag = 'A'
    left join region_master rem on rem.region_master_id = brm.region_master_id and rem.active_flag = 'A'
    left join state_master sm on sm.state_master_id = rem.state_master_id and sm.active_flag = 'A'
    left join village_master vm on vm.village_master_id = bvm.village_master_id and vm.active_flag = 'A'
    left join gp_master gm on gm.gp_master_id = vm.gp_master_id and gm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = gm.block_master_id and blm.active_flag = 'A'
    left join district_master dm on dm.district_master_id = blm.district_master_id and dm.active_flag = 'A'


    -- Joins for educator and user information
    LEFT JOIN educator_master em ON em.educator_master_id = pbs.educator_master_id AND em.active_flag = 'A'
    LEFT JOIN educator_user_map eum ON eum.educator_master_id = em.educator_master_id AND eum.active_flag = 'A'
    LEFT JOIN user_master um ON um.user_master_id = eum.user_master_id AND um.active_flag = 'A'

    -- Joins for batch and round details
    LEFT JOIN batch_participants_map bpm ON bpm.participants_baseline_survey_id = pbs.participants_baseline_survey_id AND bpm.active_flag = 'A'
    LEFT JOIN batch_master bm ON bm.batch_master_id = bpm.batch_master_id AND bm.active_flag = 'A'
    LEFT JOIN round_master rm ON rm.round_master_id = bm.round_master_id AND rm.active_flag = 'A'

    -- Joins for batch educators
    LEFT JOIN batch_educator_map bem ON bem.batch_master_id = bpm.batch_master_id AND bem.active_flag = 'A'
    LEFT JOIN educator_master em1 ON em1.educator_master_id = bem.educator_master_id AND em1.active_flag = 'A'
    LEFT JOIN educator_user_map eum1 ON eum1.educator_master_id = em1.educator_master_id AND eum1.active_flag = 'A'
    LEFT JOIN user_master um1 ON um1.user_master_id = eum1.user_master_id AND um1.active_flag = 'A'

    -- Joins for Investment Account & Life Insurance Names
    LEFT JOIN sub_category sc1 ON FIND_IN_SET(sc1.sub_category_id, pbs.type_of_investment_account) > 0
    LEFT JOIN sub_category sc2 ON FIND_IN_SET(sc2.sub_category_id, pbs.life_insurance) > 0
    LEFT JOIN sub_category sc3 ON FIND_IN_SET(sc3.sub_category_id, pbs.loans) > 0
    LEFT JOIN sub_category sc4 ON FIND_IN_SET(sc4.sub_category_id, pbs.purpose_of_loan) > 0
    LEFT JOIN sub_category sc5 ON FIND_IN_SET(sc5.sub_category_id, pbs.use_digital_transaction_application) > 0
    LEFT JOIN sub_category sc6 ON FIND_IN_SET(sc6.sub_category_id, pbs.type_of_digital_transaction) > 0
    -- /////
    LEFT JOIN sub_category sc7 ON pbs.educational_qualification = sc7.sub_category_id and sc7.active_flag = 'A'
    LEFT JOIN sub_category sc8 ON pbs.occupation = sc8.sub_category_id and sc8.active_flag = 'A'
    LEFT JOIN sub_category sc9 ON pbs.family_monthly_income = sc9.sub_category_id and sc9.active_flag = 'A'
    LEFT JOIN sub_category sc10 ON pbs.religion = sc10.sub_category_id and sc10.active_flag = 'A'
    LEFT JOIN sub_category sc11 ON pbs.caste = sc11.sub_category_id and sc11.active_flag = 'A'

    WHERE 
        pbs.active_flag = 'A' 
        AND pbs.branch_village_map_id in(
            select bvm.branch_village_map_id from branch_master bm
    inner join branch_village_map bvm on bm.branch_master_id = bvm.branch_master_id and bvm.active_flag = 'A'
    where bm.active_flag = 'A' and bm.region_master_id = %region_master_id%
        )
    GROUP BY 
        pbs.participants_baseline_survey_id;`
}