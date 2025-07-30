export default {
    CHECK_USER_AUTHENTICATION_QUERY: `select * from user_master where job_status = 'W' and active_flag = 'A' and user_master_id = %user_master_id% ;`,

    CHECK_EDUCATOR_AUTHENTICATION_QUERY: `SELECT * FROM educator_master where educator_master_id = %educator_master_id% and active_flag= 'A'and is_locked = 'N';`,

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
    where um.active_flag in('A','DI') and ubm.branch_master_id = %branch_master_id%; `,

    GET_USER_DETAILS: `select um.user_master_id,um.user_name,um.branch_master_id as base_branch_master_id,bm.branch_name as base_branch_name
    ,um.user_designation_master_id,udm.designation_code,
    urma.user_role_master_id,urma.role_code,um.login_id,um.mobile_primary,um.mobile_secondary,
    um.email_primary,um.email_secondary,um.job_status,um.active_flag, urem.region_master_id,rm.region_name,
    ubm.branch_master_id,bm1.branch_name,rm1.region_master_id as region_master_id_1 ,rm1.region_name as region_name_1
    from user_master um 
    inner join user_designation_master udm on udm.user_designation_master_id = um.user_designation_master_id and udm.active_flag = 'A'
    inner join user_role_map urm on urm.user_master_id = um.user_master_id and urm.active_flag = 'A'
    inner join user_role_master urma on urma.user_role_master_id = urm.user_role_master_id and urma.active_flag = 'A'
    left join user_region_map urem on urem.user_master_id = um.user_master_id and urm.active_flag = 'A'
    left join region_master rm on rm.region_master_id = urem.region_master_id and rm.active_flag = 'A'
    left join user_branch_map ubm on ubm.user_master_id = um.user_master_id and ubm.active_flag = 'A'
    left join branch_master bm1 on bm1.branch_master_id = ubm.branch_master_id and bm1.active_flag = 'A'
    left join region_master rm1 on rm1.region_master_id = bm1.region_master_id and rm1.active_flag = 'A'
    left join branch_master bm on bm.branch_master_id = um.branch_master_id and bm.active_flag = 'A'
    where um.active_flag in('A','DI') and um.user_master_id = '%user_master_id%';`,

    GET_EDUCATOR_COUNT_BRANCH_STATUS: `SELECT um.user_master_id,
    COUNT(DISTINCT eum.educator_user_map_id) AS educator_count, bm.active_flag as branch_active_flag
    FROM user_master um
    left join educator_user_map eum on eum.user_master_id = um.user_master_id and eum.active_flag = 'A'
    left join user_branch_map ubm on ubm.user_master_id = um.user_master_id and ubm.active_flag = 'A'
    left join branch_master bm on bm.branch_master_id = ubm.branch_master_id 
    WHERE um.user_master_id = '%user_master_id%';`,

    GET_USER: `select um.user_master_id,um.branch_master_id,um.user_designation_master_id,udm.designation_code,um.user_name,um.login_id, 
    um.password,um.salt,urm.user_role_master_id,urma.role_code,urma.role_description from user_master um
    left join user_role_map urm on urm.user_master_id = um.user_master_id
    left join user_role_master urma on urm.user_role_master_id = urma.user_role_master_id
    left join user_designation_master udm on udm.user_designation_master_id = um.user_designation_master_id
    where um.job_status = 'W' and um.active_flag = 'A' and um.login_id = '%login_id%';`,

    GET_SUB_MENU_LIST: `select mmm.main_menu_master_id,mmm.main_menu_name,rsmm.sub_menu_id,sm.sub_menu_name,sm.access_type
        from user_master um
        inner join user_role_map urm on urm.user_master_id = um.user_master_id and urm.active_flag = 'A'
        inner join user_role_master urma on urm.user_role_master_id = urma.user_role_master_id and urma.active_flag = 'A'
        inner join role_sub_menu_map rsmm on rsmm.user_role_master_id = urm.user_role_master_id and rsmm.active_flag = 'A'
        inner join sub_menu sm on sm.sub_menu_id = rsmm.sub_menu_id and sm.active_flag = 'A'
        inner join main_menu_master mmm on  mmm.main_menu_master_id = sm.main_menu_master_id and mmm.active_flag = 'A'
        where um.active_flag = 'A' and um.job_status = 'W' and um.login_id = '%login_id%' order by mmm.main_menu_master_id;`,

    GET_SUB_MENU_LIST_FOR_EDUCATOR: `select mmm.main_menu_master_id,mmm.main_menu_name,sm.sub_menu_id,sm.sub_menu_name,sm.access_type
        from sub_menu sm 
        inner join main_menu_master mmm on  mmm.main_menu_master_id = sm.main_menu_master_id and mmm.active_flag = 'A'
        where sm.educator_access = 'Y' and sm.active_flag = 'A' order by mmm.main_menu_master_id;`,

    GET_USER_PREREQUISITE_1: `select user_designation_master_id,designation_code,designation_name from user_designation_master where active_flag = 'A';`,
    GET_USER_PREREQUISITE_2: `select user_role_master_id,role_code,role_description from user_role_master where active_flag = 'A' and role_code <> 'SystemAdmin';`,

    CHECK_LOGIN_ID_PRESENT: `select * from user_master where login_id = '%login_id%' and active_flag = 'A';`,
    CHECK_LOGIN_ID_PRESENT_ON_UPDATE: `select * from user_master where login_id = '%login_id%' and user_master_id <> '%user_master_id%' and active_flag = 'A';`,

    CREATE_USER: `INSERT INTO user_master
    (branch_master_id,
    user_designation_master_id,
    user_name,
    login_id,
    password,
    salt,
    mobile_primary,
    email_primary,
    job_status,
    active_flag,
    created_by,
    created_on)
    VALUES
    (%branch_master_id% ,
    %user_designation_master_id% ,
    '%user_name%' ,
    '%login_id%' ,
    '%password%' ,
    '%salt%',
    '%mobile_primary%' ,
    '%email_primary%',
    '%job_status%' ,
    '%active_flag%' ,
    %created_by% ,
    '%created_on%' );`,

    USER_ROLE_MAP: `INSERT INTO 
    user_role_map (user_master_id, user_role_master_id, created_by, created_on)
    VALUES ('%user_master_id%', '%user_role_master_id%', '%created_by%', '%created_on%');`,

    USER_REGION_MAP: `INSERT INTO 
    user_region_map(user_master_id, region_master_id, created_by, created_on)
        VALUES %region_map_str% 
    ON DUPLICATE KEY
    UPDATE active_flag = 'A'
        , updated_by = '%updated_by%'
        , updated_on = '%updated_on%';`,

    USER_BRANCH_MAP: `INSERT INTO
    user_branch_map (user_master_id, branch_master_id, created_by, created_on)
    VALUES ('%user_master_id%', '%branch_master_id%', '%created_by%', '%created_on%')
    ON DUPLICATE KEY
        UPDATE active_flag = 'A'
			, updated_by = '%updated_by%'
			, updated_on = '%updated_on%';`,

    UPDATE_USER: `UPDATE user_master
    SET branch_master_id = %branch_master_id%
    , user_designation_master_id = '%user_designation_master_id%'
    , user_name = '%user_name%' 
    , login_id = '%login_id%'
    , mobile_primary = '%mobile_primary%'
    , email_primary = '%email_primary%'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,

    UPDATE_USER_ROLE_MAP: `UPDATE user_role_map
    SET user_role_master_id = '%user_role_master_id%'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,

    UPDATE_USER_REGION_MAP: `UPDATE user_region_map
    SET active_flag = 'D'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,

    UPDATE_USER_BRANCH_MAP: `UPDATE user_branch_map
    SET active_flag = 'D'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,

    DELETE_USER: `UPDATE user_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE user_master_id = '%user_master_id%';`,

    DELETE_USER_ROLE_MAP: `UPDATE user_role_map
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE user_master_id = '%user_master_id%';`,

    DELETE_USER_BRANCH_MAP: `UPDATE user_branch_map
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE user_master_id = '%user_master_id%';`,

    DELETE_USER_REGION_MAP: `UPDATE user_region_map
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE user_master_id = '%user_master_id%';`,

    CHANGE_PASSWOARD: `UPDATE user_master 
        SET password = '%password%'
        , salt = '%salt%'
    WHERE login_id = '%login_id%';`,

    UPDATE_USER_JOB_STATUS: `UPDATE user_master
    SET job_status = '%job_status%'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,

    UPDATE_USER_ENABLE_DISABLE: `UPDATE user_master
    SET active_flag = '%active_flag%'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,

    USER_RESET_PASSWOARD: `UPDATE user_master
    SET password = '%password%'
    , salt = '%salt%'
    , updated_by = '%updated_by%'
    , updated_on = '%updated_on%'
    WHERE user_master_id = '%user_master_id%';`,
}