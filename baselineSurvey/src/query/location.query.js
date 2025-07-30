export default {

    GET_REGION_LIST_OF_USER: `select sm.state_master_id,sm.state_name,rm.region_master_id,rm.region_name 
    from user_master um 
    left join user_region_map urm on urm.user_master_id = um.user_master_id and urm.active_flag = 'A'
    left join region_master rm on rm.region_master_id = urm.region_master_id and rm.active_flag = 'A'
    left join state_master sm on sm.state_master_id = rm.state_master_id and sm.active_flag = 'A'
    where um.active_flag = 'A' and um.job_status = 'W' and um.user_master_id = %user_master_id%;`,

    GET_REGION_LIST: `select rm.region_master_id,rm.region_name from region_master rm where rm.active_flag = 'A';`,

    GET_BRANCH_LIST_BY_REGION_ID: `select branch_master_id,branch_name,branch_code,active_flag from branch_master 
    where region_master_id in(%region_master_id%) and active_flag in('A','PO');`,

    GET_STATE_LIST: `select state_master_id,state_name from state_master where active_flag = 'A';`,

    GET_REGION_BRANCH_LIST_BY_STATE_ID: `select sm.state_master_id,sm.state_name,dm.district_master_id,dm.district_name,
    rm.region_master_id,rm.region_name,bm.branch_master_id,bm.branch_name,bm.active_flag,pm.project_master_id,pm.project_code
    from state_master sm
    inner join region_master rm on rm.state_master_id = sm.state_master_id and rm.active_flag = 'A'
    left join branch_master bm on bm.region_master_id = rm.region_master_id and bm.active_flag in('A','PO')
    left join project_master pm on pm.project_master_id = bm.project_master_id and pm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = bm.block_master_id and blm.active_flag = 'A'
    left join district_master dm on dm.district_master_id = blm.district_master_id and dm.active_flag = 'A'
    where sm.active_flag = 'A' and sm.state_master_id = %state_master_id%;`,

    GET_PROJECT_LIST: `select * from project_master where active_flag = 'A';`,

    GET_DISTRICT_LIST_BY_STATE_ID: `select dm.district_master_id,dm.district_name,sm.state_master_id,sm.state_name,bm.block_master_id 
    from district_master dm
    left join state_master sm on sm.state_master_id = dm.state_master_id and sm.active_flag = 'A'
    left join block_master bm on bm.district_master_id = dm.district_master_id and bm.active_flag = 'A'
    where dm.active_flag = 'A' and dm.state_master_id = %state_master_id%
    group by dm.district_master_id;`,

    GET_BLOCK_LIST_BY_DISTRICT_ID: `select block_master_id,block_name from block_master 
    where active_flag = 'A' and district_master_id =%district_master_id%
    order by block_name;`,

    GET_BLOCK_GP_VILLAGE_LIST_BY_USER_ID: `select bvm.branch_master_id,bm.branch_name,bm.active_flag
    ,blm.block_master_id, blm.block_name
    ,gm.gp_master_id,gm.gp_name
    ,vm.village_master_id,vm.village_name
    from branch_village_map bvm
    left join branch_master bm on bm.branch_master_id = bvm.branch_master_id and bm.active_flag = 'A'
    left join village_master vm on vm.village_master_id = bvm.village_master_id and vm.active_flag = 'A'
    left join gp_master gm on gm.gp_master_id = vm.gp_master_id and gm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = gm.block_master_id and blm.active_flag = 'A'
    where bvm.branch_master_id = (select ubm.branch_master_id from user_master um 
    left join user_branch_map ubm on ubm.user_master_id= um.user_master_id and ubm.active_flag = 'A'
    where um.active_flag = 'A' and um.user_master_id = %user_master_id% ) order by blm.block_name, gm.gp_name, vm.village_name;`,

    GET_BLOCK_GP_VILLAGE_LIST_BY_BRANCH_ID: `select bvm.branch_master_id,bm.branch_name
    ,blm.block_master_id, blm.block_name
    ,gm.gp_master_id,gm.gp_name
    ,vm.village_master_id,vm.village_name
    from branch_village_map bvm
    left join branch_master bm on bm.branch_master_id = bvm.branch_master_id and bm.active_flag = 'A'
    left join village_master vm on vm.village_master_id = bvm.village_master_id and vm.active_flag = 'A'
    left join gp_master gm on gm.gp_master_id = vm.gp_master_id and gm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = gm.block_master_id and blm.active_flag = 'A'
    where bvm.branch_master_id = '%branch_master_id%' order by blm.block_name, gm.gp_name, vm.village_name;`,

    CHECK_DISTRICT_NAME_PRESENT: `select * from district_master 
    where active_flag = 'A' and state_master_id = %state_master_id% and district_name = '%district_name%';`,

    CREATE_DISTRICT: `INSERT INTO district_master
    (state_master_id,
    district_name,
    created_by)
    VALUES
    (%state_master_id% ,
    '%district_name%' ,
    %created_by% );`,

    BEFORE_EDIT_CHECK_DISTRICT_NAME_PRESENT: `select * from district_master 
    where active_flag = 'A' and state_master_id = %state_master_id% and district_name = '%district_name%' 
    and district_master_id <> %district_master_id%`,

    UPDATE_DISTRICT: `UPDATE district_master
    SET state_master_id = '%state_master_id%'
    , district_name = '%district_name%'
    , updated_by = %updated_by%
    , updated_on = '%updated_on%'
    WHERE district_master_id = %district_master_id%;`,

    DELETE_DISTRICT: `UPDATE district_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE district_master_id = %district_master_id%;`,

    GET_BLOCK_DETAILS: `select sm.state_master_id,sm.state_name,dm.district_master_id,dm.district_name,
    bm.block_master_id,bm.block_name,bm.block_pin_code,count(gm.gp_master_id) as gp_count,count(brm.branch_master_id) as branch_count
    from block_master bm
    left join district_master dm on dm.district_master_id = bm.district_master_id and dm.active_flag = 'A'
    left join state_master sm on sm.state_master_id = dm.state_master_id and sm.active_flag = 'A'
    left join gp_master gm on gm.block_master_id = bm.block_master_id and gm.active_flag = 'A'
    left join branch_master brm on brm.block_master_id = bm.block_master_id and brm.active_flag ='A'
    where bm.active_flag = 'A' and bm.block_master_id = %block_master_id%;`,

    CHECK_BLOCK_NAME_PRESENT: `select * from block_master 
    where active_flag = 'A' and district_master_id = %district_master_id% and block_name = '%block_name%';`,

    CREATE_BLOCK: `INSERT INTO block_master
    (district_master_id,
    block_name,
    block_pin_code,
    created_by)
    VALUES
    (%district_master_id% ,
    '%block_name%',
    '%block_pin_code%',
    %created_by% );`,

    BEFORE_EDIT_CHECK_BLOCK_NAME_PRESENT: `select * from block_master 
    where active_flag = 'A' and district_master_id = %district_master_id% and block_name = '%block_name%'
    and block_master_id <> %block_master_id%`,

    UPDATE_BLOCK: `UPDATE block_master
    SET district_master_id = '%district_master_id%'
    , block_name = '%block_name%'
    , block_pin_code = '%block_pin_code%'
    , updated_by = %updated_by%
    , updated_on = '%updated_on%'
    WHERE block_master_id = %block_master_id%;`,

    DELETE_BLOCK: `UPDATE block_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE block_master_id = %block_master_id%;`,

    GET_GP_LIST_BY_BLOCK_ID: `select gm.gp_master_id,gm.gp_name,gm.type,sm.state_master_id,sm.state_name,dm.district_master_id,dm.district_name,
    bm.block_master_id,bm.block_name,count(vm.village_master_id) as village_count
    from gp_master gm
    left join block_master bm on bm.block_master_id = gm.block_master_id and bm.active_flag = 'A'
    left join district_master dm on dm.district_master_id = bm.district_master_id and dm.active_flag ='A'
    left join state_master sm on sm.state_master_id = dm.state_master_id and sm.active_flag = 'A'
    left join village_master vm on vm.gp_master_id = gm.gp_master_id and vm.active_flag = 'A'
    where gm.active_flag = 'A' and gm.block_master_id = %block_master_id% 
    group by gm.gp_master_id
    order by gm.gp_name desc;`,

    CHECK_GP_MUNICIPALITY_NAME_PRESENT: `select * from gp_master 
    where active_flag = 'A' and block_master_id = %block_master_id% and gp_name = '%gp_name%';`,

    CREATE_GP_MUNICIPALITY: `INSERT INTO gp_master
    (block_master_id,
    gp_name,
    type,
    created_by)
    VALUES
    (%block_master_id% ,
    '%gp_name%',
    '%type%',
    %created_by% );`,

    BEFORE_EDIT_CHECK_GP_MUNICIPALITY_NAME_PRESENT: `select * from gp_master 
    where active_flag = 'A' and block_master_id = %block_master_id% and gp_name = '%gp_name%' and gp_master_id <> %gp_master_id%;`,

    UPDATE_GP_MUNICIPALITY: `UPDATE gp_master
    SET block_master_id = '%block_master_id%'
    , gp_name = '%gp_name%'
    , type = '%type%'
    , updated_by = %updated_by%
    , updated_on = '%updated_on%'
    WHERE gp_master_id = %gp_master_id%;`,

    DELETE_GP_MUNICIPALITY: `UPDATE gp_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE gp_master_id = %gp_master_id%;`,

    GET_VILLAGE_LIST_BY_GP_ID: `SELECT sm.state_master_id, sm.state_name,dm.district_master_id,dm.district_name,bm.block_master_id,bm.block_name
    ,gm.gp_master_id,gm.gp_name,vm.village_master_id,vm.village_name,brm.branch_master_id,brm.branch_name
    ,COUNT(pbs.participants_baseline_survey_id) AS participant_count
    FROM village_master vm
    LEFT JOIN gp_master gm ON gm.gp_master_id = vm.gp_master_id AND gm.active_flag = 'A'
    LEFT JOIN block_master bm ON bm.block_master_id = gm.block_master_id AND bm.active_flag = 'A'
    LEFT JOIN district_master dm ON dm.district_master_id = bm.district_master_id AND dm.active_flag ='A'
    LEFT JOIN state_master sm ON sm.state_master_id = dm.state_master_id AND sm.active_flag = 'A'
    LEFT JOIN branch_village_map bvm ON bvm.village_master_id = vm.village_master_id AND bvm.active_flag = 'A'
    LEFT JOIN branch_master brm ON brm.branch_master_id = bvm.branch_master_id AND brm.active_flag = 'A'
    LEFT JOIN participants_baseline_survey pbs ON pbs.branch_village_map_id = bvm.branch_village_map_id AND pbs.active_flag = 'A'
    WHERE vm.active_flag = 'A' AND vm.gp_master_id = %gp_master_id%
    GROUP BY vm.village_master_id
    ORDER BY vm.village_name ASC;`,

    CHECK_VILLAGE_NAME_PRESENT: `select * from village_master 
    where active_flag = 'A' and gp_master_id = %gp_master_id% and village_name = '%village_name%';`,

    CREATE_VILLAGE: `INSERT INTO village_master
    (gp_master_id,
    village_name,
    created_by)
    VALUES
    (%gp_master_id% ,
    '%village_name%',
    %created_by% );`,

    BEFORE_EDIT_CHECK_VILLAGE_NAME_PRESENT: `select * from village_master 
    where active_flag = 'A' and gp_master_id = %gp_master_id% and village_name = '%village_name%' and village_master_id <> %village_master_id%;`,

    UPDATE_VILLAGE: `UPDATE village_master
    SET gp_master_id = '%gp_master_id%'
    , village_name = '%village_name%'
    , updated_by = %updated_by%
    , updated_on = '%updated_on%'
    WHERE village_master_id = %village_master_id%;`,

    DELETE_VILLAGE: `UPDATE village_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE village_master_id = %village_master_id%;`,

    GET_VILLAGE_LIST_BY_BRANCH_ID: `select bvm.branch_master_id,bm.branch_name
    ,dm.district_master_id,dm.district_name
    ,blm.block_master_id, blm.block_name
    ,gm.gp_master_id,gm.gp_name
    ,vm.village_master_id,vm.village_name
    from branch_village_map bvm
    left join branch_master bm on bm.branch_master_id = bvm.branch_master_id and bm.active_flag <> 'D'
    left join village_master vm on vm.village_master_id = bvm.village_master_id and vm.active_flag = 'A'
    left join gp_master gm on gm.gp_master_id = vm.gp_master_id and gm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = gm.block_master_id and blm.active_flag = 'A'
    left join district_master dm on dm.district_master_id = blm.district_master_id and dm.active_flag = 'A'
    where bvm.branch_master_id = '%branch_master_id%' and bvm.active_flag = 'A' order by vm.village_name;`,

    GET_BLOCK_LIST_FOR_BRANCH_VILLAGE_MAP: `select * from block_master bm 
    where bm.active_flag = 'A'and bm.district_master_id = (SELECT blm.district_master_id FROM branch_master bm 
    left join block_master blm on blm.block_master_id = bm.block_master_id and blm.active_flag = 'A'
    WHERE bm.active_flag <> 'D' and bm.branch_master_id = %branch_master_id%);`,

    GET_UNMAPPED_VILLAGE_LIST_BY_GP_ID: `SELECT vm.village_master_id,vm.village_name,bvm.branch_village_map_id,
    dm.district_master_id,dm.district_name,blm.block_master_id,blm.block_name,gm.gp_master_id,gm.gp_name
    FROM village_master vm
    LEFT JOIN branch_village_map bvm ON vm.village_master_id = bvm.village_master_id and bvm.active_flag ='A'
    left join gp_master gm on gm.gp_master_id = vm.gp_master_id and gm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = gm.block_master_id and blm.active_flag = 'A'
    left join district_master dm on dm.district_master_id = blm.district_master_id and dm.active_flag = 'A'
    WHERE vm.active_flag = 'A' and bvm.branch_village_map_id IS NULL and vm.gp_master_id = %gp_master_id%; `,

    DELETE_MAP_UNMAP_BRANCH_VILLAGE: ``,

    MAP_BRANCH_VILLAGE: `INSERT INTO branch_village_map
    (branch_master_id,village_master_id,created_by)
    VALUES %selectedVillage%
    ON DUPLICATE KEY
        UPDATE active_flag = 'A'
			, updated_by = '%updated_by%'
			, updated_on = '%updated_on%';`,

    BEFORE_UNMAP_CHECK_PARICIPANTS_PRESENT: `select * from participants_baseline_survey 
    where active_flag = 'A' and branch_village_map_id = 
    (select branch_village_map_id from branch_village_map where branch_master_id = %branch_master_id% 
    and village_master_id = %village_master_id% and active_flag = 'A');`,

    UNMAP_BRANCH_VILLAGE: `UPDATE branch_village_map
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE branch_master_id = %branch_master_id% and village_master_id = %village_master_id%;`,

    GET_PROJECT_DONOR_LIST: `Select * from project_master pm
    left join donor_master dm on dm.donor_master_id = pm.donor_master_id and dm.active_flag = 'A'
    where pm.active_flag = 'A';`,

}