export default {

  CHECK_REGION_NAME_PRESENT: `select * from region_master
    where active_flag = 'A' and region_name = '%region_name%';`,

  BEFORE_EDIT_CHECK_REGION_NAME_PRESENT: `select * from region_master
    where active_flag = 'A' and region_name = '%region_name%' and region_master_id <> '%region_master_id%' ;`,

  CREATE_REGION: `INSERT INTO region_master
    (state_master_id,
    region_name,
    created_by,
    created_on)
    VALUES
    (%state_master_id% ,
    '%region_name%' ,
    %created_by% ,
    '%created_on%' );`,

  UPDATE_REGION: `UPDATE region_master
    SET state_master_id = %state_master_id%
    , region_name = '%region_name%' 
    , updated_by = %updated_by%
    , updated_on = '%updated_on%'
    WHERE region_master_id = %region_master_id%;`,

  DELETE_REGION: `UPDATE region_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE region_master_id = %region_master_id%;`,

  CHECK_BRANCH_NAME_PRESENT: `select * from branch_master
    where active_flag = 'A' and branch_name = '%branch_name%';`,

  CHECK_BRANCH_CODE_PRESENT: `select * from branch_master
    where active_flag = 'A' and branch_code = '%branch_code%';`,

  BEFORE_EDIT_CHECK_BRANCH_NAME_PRESENT: `select * from branch_master
    where active_flag = 'A' and branch_name = '%branch_name%' and branch_master_id <> '%branch_master_id%' ;`,

  BEFORE_EDIT_CHECK_BRANCH_CODE_PRESENT: `select * from branch_master
    where active_flag = 'A' and branch_code = '%branch_code%' and branch_master_id <> '%branch_master_id%' ;`,

  CREATE_BRANCH: `INSERT INTO branch_master
    (project_master_id
    ,region_master_id
    ,block_master_id
    ,branch_name
    ,branch_code
    ,branch_open_date
    ,address
    ,village_town
    ,police_station
    ,post_office
    ,landmark
    ,pincode
    ,contact_person_name
    ,contact_person_number
    ,contact_person_email
    ,created_by
    ,created_on)
    VALUES
    (%project_master_id% ,
    %region_master_id% ,
    %block_master_id% ,
    '%branch_name%' ,
    '%branch_code%',
    '%branch_open_date%' ,
    '%address%' ,
    '%village_town%' ,
    '%police_station%' ,
    '%post_office%' ,
    '%landmark%' ,
    '%pincode%' ,
    '%contact_person_name%' ,
    '%contact_person_number%' ,
    '%contact_person_email%' ,
    %created_by% ,
    '%created_on%' );`,

  UPDATE_BRANCH: `UPDATE branch_master
    SET project_master_id = %project_master_id%
    , region_master_id = %region_master_id%
    , block_master_id = %block_master_id%
    , branch_name = '%branch_name%'
    , branch_code = '%branch_code%'
    , branch_open_date = '%branch_open_date%'
    , address = '%address%'
    , village_town = '%village_town%'
    , police_station = '%police_station%'
    , post_office = '%post_office%'
    , landmark = '%landmark%'
    , pincode = '%pincode%'
    , contact_person_name = '%contact_person_name%'
    , contact_person_number = '%contact_person_number%'
    , contact_person_email = '%contact_person_email%'
    , updated_by = %updated_by%
    , updated_on = '%updated_on%'
    WHERE branch_master_id = %branch_master_id%;`,

  DELETE_BRNCH: `UPDATE branch_master
    SET active_flag = 'D'
    , deleted_by = '%deleted_by%'
    , deleted_on = '%deleted_on%'
    WHERE branch_master_id = %branch_master_id% ;`,

  GET_BRANCH_DETAILS: `select *,rm.state_master_id,blm.district_master_id from branch_master bm
    left join region_master rm on rm.region_master_id = bm.region_master_id and rm.active_flag = 'A'
    left join block_master blm on blm.block_master_id = bm.block_master_id and blm.active_flag = 'A'
    where bm.active_flag = 'A' and bm.branch_master_id = '%branch_master_id%';`,

  VILLAGE_EDUCATOR_ROUND_SURVEY_COUNT: `SELECT bm.branch_master_id,
      COUNT(DISTINCT bvm.branch_village_map_id) AS village_count,
       (SELECT COUNT(DISTINCT em.educator_master_id)
        FROM educator_master em
        WHERE em.branch_master_id = bm.branch_master_id
          AND em.active_flag = 'A') AS educator_count,
       (SELECT COUNT(DISTINCT rm.round_master_id)
        FROM round_master rm
        WHERE rm.branch_master_id = bm.branch_master_id
          AND rm.active_flag = 'A') AS round_count,
       (SELECT COUNT(DISTINCT pbs.participants_baseline_survey_id)
        FROM branch_village_map bvm
        LEFT JOIN participants_baseline_survey pbs ON pbs.branch_village_map_id = bvm.branch_village_map_id
        WHERE bvm.branch_master_id = bm.branch_master_id
          AND bvm.active_flag = 'A'
          AND pbs.active_flag = 'A') AS baseline_survey_count
    FROM branch_master bm
    LEFT JOIN branch_village_map bvm ON bvm.branch_master_id = bm.branch_master_id
    AND bvm.active_flag = 'A'
    WHERE bm.active_flag <> 'D'
    AND bm.branch_master_id = '%branch_master_id%'
    GROUP BY bm.branch_master_id;`,
}