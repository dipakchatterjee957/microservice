export default {
    GET_USER_LIST: `select um.user_master_id,um.user_name,um.branch_master_id,bm.branch_name,um.user_designation_master_id,udm.designation_code,
    urma.user_role_master_id,urma.role_code,um.login_id,um.mobile_primary,um.mobile_secondary,
    um.email_primary,um.email_secondary,um.job_status,um.active_flag
    from user_master um 
    inner join user_designation_master udm on udm.user_designation_master_id = um.user_designation_master_id and udm.active_flag = 'A'
    inner join user_role_map urm on urm.user_master_id = um.user_master_id and urm.active_flag = 'A'
    inner join user_role_master urma on urma.user_role_master_id = urm.user_role_master_id and urma.active_flag = 'A'
    inner join user_region_map urem on urem.user_master_id = um.user_master_id and urm.active_flag = 'A'
    left join branch_master bm on bm.branch_master_id = um.branch_master_id and bm.active_flag = 'A'
    where um.active_flag in('A','DI') and urem.region_master_id = %region_master_id% 
    union
    select um.user_master_id,um.user_name,um.branch_master_id,bm.branch_name,um.user_designation_master_id,udm.designation_code,
    urma.user_role_master_id,urma.role_code,um.login_id,um.mobile_primary,um.mobile_secondary,
    um.email_primary,um.email_secondary,um.job_status,um.active_flag
    from user_master um
    inner join user_designation_master udm on udm.user_designation_master_id = um.user_designation_master_id and udm.active_flag = 'A'
    inner join user_role_map urm on urm.user_master_id = um.user_master_id and urm.active_flag = 'A'
    inner join user_role_master urma on urma.user_role_master_id = urm.user_role_master_id and urma.active_flag = 'A'
    inner join user_branch_map ubm on ubm.user_master_id = um.user_master_id and ubm.active_flag = 'A'
    left join branch_master bm on bm.branch_master_id = um.branch_master_id and bm.active_flag = 'A'
    where um.active_flag in('A','DI') and ubm.branch_master_id = %branch_master_id%;`
}