import locationQuery from '../query/location.query.js';
import connection from '../../../common_services/mysql.controller.js';
import utils from '../../../common_services/utils.js';

export default new class Locationservice {

    getRegionList = async (req) => {
        try {
            const queryString = req.user.user_master_id == 1 ? locationQuery.GET_REGION_LIST : locationQuery.GET_REGION_LIST_OF_USER.replace('%user_master_id%', req.user.user_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getBranchList = async (req) => {
        try {
            const queryString = locationQuery.GET_BRANCH_LIST_BY_REGION_ID.replace('%region_master_id%', req.body.region_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getStateList = async (req) => {
        try {
            const queryString = locationQuery.GET_STATE_LIST;
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getStateWiseRegionBranchList = async (req) => {
        try {
            const queryString = locationQuery.GET_REGION_BRANCH_LIST_BY_STATE_ID.replace('%state_master_id%', req.body.state_master_id);
            const data = await connection.query(queryString);

            // const transformedData = Array.from(data.response.reduce((acc, item) => {
            //     const { region_master_id, region_name, ...branchData } = item;
            //     const existingRegion = acc.get(region_master_id);
            //     if (existingRegion) {
            //         existingRegion.branch_list.push(branchData);
            //     } else {
            //         acc.set(region_master_id, {
            //             region_master_id,
            //             region_name,
            //             branch_list: [branchData]
            //         });
            //     }
            //     return acc;
            // }, new Map()).values());

            const transformedData = Object.values(data.response.reduce((acc, item) => {
                const { state_master_id, state_name, region_master_id, region_name, ...branchData } = item;
                acc[region_master_id] = acc[region_master_id] || { state_master_id, state_name, region_master_id, region_name, branch_list: [] };
                if (branchData.branch_master_id) { acc[region_master_id].branch_list.push(branchData) };
                return acc;
            }, {}));

            return transformedData;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getProjectList = async (req) => {
        try {
            const queryString = locationQuery.GET_PROJECT_LIST;
            const data = await connection.query(queryString);
            utils.convertArrayDateField(data.response, 'project_start_date', 'project_end_date');
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getDistrictList = async (req) => {
        try {
            const queryString = locationQuery.GET_DISTRICT_LIST_BY_STATE_ID.replace('%state_master_id%', req.body.state_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getBlockList = async (req) => {
        try {
            const queryString = locationQuery.GET_BLOCK_LIST_BY_DISTRICT_ID.replace('%district_master_id%', req.body.district_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getBlockGpVillageList = async (req, user) => {
        try {
            const queryString = locationQuery.GET_BLOCK_GP_VILLAGE_LIST_BY_USER_ID.replace('%user_master_id%', user.user_master_id);
            const data = await connection.query(queryString);

            const transformedData = Object.values(data.response.reduce((acc, item) => {
                const { branch_master_id, branch_name, active_flag, block_master_id, block_name, gp_master_id, gp_name, village_master_id, village_name, ...rest } = item;
                acc[block_master_id] = acc[block_master_id] || { branch_master_id, branch_name, active_flag, block_master_id, block_name, gp_list: [] };
                const gpIndex = acc[block_master_id].gp_list.findIndex(gp => gp.gp_master_id === gp_master_id);
                if (gpIndex === -1) {
                    acc[block_master_id].gp_list.push({ gp_master_id, gp_name, village_list: [{ village_master_id, village_name }] });
                } else {
                    acc[block_master_id].gp_list[gpIndex].village_list.push({ village_master_id, village_name });
                }
                return acc;
            }, {}));

            return (transformedData);
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getBlockGpVillageListByBranchId = async (req, user) => {
        try {
            const queryString = locationQuery.GET_BLOCK_GP_VILLAGE_LIST_BY_BRANCH_ID.replace('%branch_master_id%', req.branch_master_id);
            const data = await connection.query(queryString);

            const transformedData = Object.values(data.response.reduce((acc, item) => {
                const { branch_master_id, branch_name, block_master_id, block_name, gp_master_id, gp_name, village_master_id, village_name, ...rest } = item;
                acc[block_master_id] = acc[block_master_id] || { branch_master_id, branch_name, block_master_id, block_name, gp_list: [] };
                const gpIndex = acc[block_master_id].gp_list.findIndex(gp => gp.gp_master_id === gp_master_id);
                if (gpIndex === -1) {
                    acc[block_master_id].gp_list.push({ gp_master_id, gp_name, village_list: [{ village_master_id, village_name }] });
                } else {
                    acc[block_master_id].gp_list[gpIndex].village_list.push({ village_master_id, village_name });
                }
                return acc;
            }, {}));

            return (transformedData);
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    saveDistrict = async (req, user) => {
        try {
            // Check if district name already exists
            let checkDistrictNameQuery = locationQuery.CHECK_DISTRICT_NAME_PRESENT
                .replace('%state_master_id%', req.state_master_id)
                .replace('%district_name%', req.district_name);
            const districtNamePresent = await connection.query(checkDistrictNameQuery);

            if (districtNamePresent.response.length) {
                throw new Error('Duplicate District Name, Use Different District Name');
            }
            // Create a new district
            let createDistrictQuery = locationQuery.CREATE_DISTRICT
                .replace('%state_master_id%', req.state_master_id)
                .replace('%district_name%', req.district_name)
                .replace('%created_by%', user.user_master_id);
            const districtCreationResult = await connection.query(createDistrictQuery);

            if (!districtCreationResult || districtCreationResult.length === 0 || districtCreationResult.response.affectedRows === 0) {
                throw new Error('Failed to Create District');
            }
            return 'District Successfully Created';

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    updateDistrict = async (req, user) => {
        try {
            let queryString = locationQuery.BEFORE_EDIT_CHECK_DISTRICT_NAME_PRESENT
                .replace('%state_master_id%', req.state_master_id)
                .replace('%district_name%', req.district_name)
                .replace('%district_master_id%', req.district_master_id);
            const district_name_present = await connection.query(queryString);
            if (district_name_present.response.length) {
                throw new Error('Duplicate District Name, Use Different District Name');
            } else {
                let queryString = locationQuery.UPDATE_DISTRICT
                    .replace('%state_master_id%', req.state_master_id)
                    .replace('%district_name%', req.district_name)
                    .replace('%updated_by%', user.user_master_id)
                    .replace('%updated_on%', utils.getCurrentDateTime())
                    .replace('%district_master_id%', req.district_master_id);

                const data = await connection.transactionalQuery(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update District');
                }
                return 'District Successfully Updated';
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    deleteDistrict = async (req, user) => {
        try {
            let queryString = locationQuery.DELETE_DISTRICT
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%district_master_id%', req.district_master_id);
            const data = await connection.transactionalQuery(queryString);

            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete District');
            }
            return 'District Successfully Deleted';
        } catch (error) {
            throw error;
        }
    }

    getBlockDetails = async (req) => {
        try {
            const queryString = locationQuery.GET_BLOCK_DETAILS.replace('%block_master_id%', req.body.block_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    saveBlock = async (req, user) => {
        try {
            // Check if Block name already exists
            let checkBlockNameQuery = locationQuery.CHECK_BLOCK_NAME_PRESENT
                .replace('%district_master_id%', req.district_master_id)
                .replace('%block_name%', req.block_name);
            const blockNamePresent = await connection.query(checkBlockNameQuery);

            if (blockNamePresent.response.length) {
                throw new Error('Duplicate Block Name, Use Different Block Name');
            }
            // Create a new Block
            let createBlockQuery = locationQuery.CREATE_BLOCK
                .replace('%district_master_id%', req.district_master_id)
                .replace('%block_name%', req.block_name)
                .replace('%block_pin_code%', req.block_pin_code)
                .replace('%created_by%', user.user_master_id);
            const blockCreationResult = await connection.query(createBlockQuery);

            if (!blockCreationResult || blockCreationResult.length === 0 || blockCreationResult.response.affectedRows === 0) {
                throw new Error('Failed to Create Block');
            }
            return 'Block Successfully Created';

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    updateBlock = async (req, user) => {
        try {
            let queryString = locationQuery.BEFORE_EDIT_CHECK_BLOCK_NAME_PRESENT
                .replace('%district_master_id%', req.district_master_id)
                .replace('%block_name%', req.block_name)
                .replace('%block_master_id%', req.block_master_id);
            const block_name_present = await connection.query(queryString);
            if (block_name_present.response.length) {
                throw new Error('Duplicate Block Name, Use Different Block Name');
            } else {
                let queryString = locationQuery.UPDATE_BLOCK
                    .replace('%district_master_id%', req.district_master_id)
                    .replace('%block_name%', req.block_name)
                    .replace('%block_pin_code%', req.block_pin_code)
                    .replace('%updated_by%', user.user_master_id)
                    .replace('%updated_on%', utils.getCurrentDateTime())
                    .replace('%block_master_id%', req.block_master_id);

                const data = await connection.transactionalQuery(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update Block');
                }
                return 'Block Successfully Updated';
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    deleteBlock = async (req, user) => {
        try {
            let queryString = locationQuery.DELETE_BLOCK
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%block_master_id%', req.block_master_id);
            const data = await connection.transactionalQuery(queryString);

            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete Block');
            }
            return 'Block Successfully Deleted';
        } catch (error) {
            throw error;
        }
    }

    getGpListByBlockId = async (req) => {
        try {
            const queryString = locationQuery.GET_GP_LIST_BY_BLOCK_ID.replace('%block_master_id%', req.block_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    saveGpMunicipality = async (req, user) => {
        try {
            // Check if GP/ MUNICIPALITY name already exists
            let checkGpMunicipalityNameQuery = locationQuery.CHECK_GP_MUNICIPALITY_NAME_PRESENT
                .replace('%block_master_id%', req.block_master_id)
                .replace('%gp_name%', req.gp_name);
            const gpMunicipalityNamePresent = await connection.query(checkGpMunicipalityNameQuery);

            if (gpMunicipalityNamePresent.response.length) {
                throw new Error('Duplicate GP/ Municipality Name, Use Different GpMunicipality Name');
            }
            // Create a new Gp/ Municipality
            let createGpMunicipalityQuery = locationQuery.CREATE_GP_MUNICIPALITY
                .replace('%block_master_id%', req.block_master_id)
                .replace('%gp_name%', req.gp_name)
                .replace('%type%', req.type)
                .replace('%created_by%', user.user_master_id);
            const gpMunicipalityCreationResult = await connection.query(createGpMunicipalityQuery);

            if (!gpMunicipalityCreationResult || gpMunicipalityCreationResult.length === 0 || gpMunicipalityCreationResult.response.affectedRows === 0) {
                throw new Error('Failed to Create GP/ Municipality');
            }
            return 'GP/ Municipality Successfully Created';

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    updateGpMunicipality = async (req, user) => {
        try {
            let queryString = locationQuery.BEFORE_EDIT_CHECK_GP_MUNICIPALITY_NAME_PRESENT
                .replace('%block_master_id%', req.block_master_id)
                .replace('%gp_name%', req.gp_name)
                .replace('%gp_master_id%', req.gp_master_id);
            const gpMunicipality_name_present = await connection.query(queryString);
            if (gpMunicipality_name_present.response.length) {
                throw new Error('Duplicate GP/ Municipality Name, Use Different GP/ Municipality Name');
            } else {
                let queryString = locationQuery.UPDATE_GP_MUNICIPALITY
                    .replace('%block_master_id%', req.block_master_id)
                    .replace('%gp_name%', req.gp_name)
                    .replace('%type%', req.type)
                    .replace('%updated_by%', user.user_master_id)
                    .replace('%updated_on%', utils.getCurrentDateTime())
                    .replace('%gp_master_id%', req.gp_master_id);

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update GP/ Municipality');
                }
                return 'GP/ Municipality Successfully Updated';
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    deleteGpMunicipality = async (req, user) => {
        try {
            let queryString = locationQuery.DELETE_GP_MUNICIPALITY
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%gp_master_id%', req.gp_master_id);
            const data = await connection.query(queryString);

            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete GP/ Municipality');
            }
            return 'GP/ Municipality Successfully Deleted';
        } catch (error) {
            throw error;
        }
    }

    getVillageListByGpId = async (req) => {
        try {
            const queryString = locationQuery.GET_VILLAGE_LIST_BY_GP_ID.replace('%gp_master_id%', req.gp_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    saveVillage = async (req, user) => {
        try {
            // Check if Village name already exists
            let checkVillageNameQuery = locationQuery.CHECK_VILLAGE_NAME_PRESENT
                .replace('%gp_master_id%', req.gp_master_id)
                .replace('%village_name%', req.village_name);
            const villageNamePresent = await connection.query(checkVillageNameQuery);

            if (villageNamePresent.response.length) {
                throw new Error('Duplicate Village Name, Use Different Village Name');
            }
            // Create a new Village
            let createVillageQuery = locationQuery.CREATE_VILLAGE
                .replace('%gp_master_id%', req.gp_master_id)
                .replace('%village_name%', req.village_name)
                .replace('%created_by%', user.user_master_id);
            const villageCreationResult = await connection.query(createVillageQuery);

            if (!villageCreationResult || villageCreationResult.length === 0 || villageCreationResult.response.affectedRows === 0) {
                throw new Error('Failed to Create Village');
            }
            return 'Village Successfully Created';

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    updateVillage = async (req, user) => {
        try {
            let queryString = locationQuery.BEFORE_EDIT_CHECK_VILLAGE_NAME_PRESENT
                .replace('%gp_master_id%', req.gp_master_id)
                .replace('%village_name%', req.village_name)
                .replace('%village_master_id%', req.village_master_id);
            const village_name_present = await connection.query(queryString);
            if (village_name_present.response.length) {
                throw new Error('Duplicate Village Name, Use Different Village Name');
            } else {
                let queryString = locationQuery.UPDATE_VILLAGE
                    .replace('%gp_master_id%', req.gp_master_id)
                    .replace('%village_name%', req.village_name)
                    .replace('%updated_by%', user.user_master_id)
                    .replace('%updated_on%', utils.getCurrentDateTime())
                    .replace('%village_master_id%', req.village_master_id);

                const data = await connection.query(queryString);
                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update Village');
                }
                return 'Village Successfully Updated';
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    deleteVillage = async (req, user) => {
        try {
            let queryString = locationQuery.DELETE_VILLAGE
                .replace('%deleted_by%', user.user_master_id)
                .replace('%deleted_on%', utils.getCurrentDateTime())
                .replace('%village_master_id%', req.village_master_id);
            const data = await connection.query(queryString);

            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Delete Village');
            }
            return 'Village Successfully Deleted';
        } catch (error) {
            throw error;
        }
    }

    getVillageListByBranchId = async (req, user) => {
        try {
            const queryString = locationQuery.GET_VILLAGE_LIST_BY_BRANCH_ID.replace('%branch_master_id%', req.branch_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getBlockListForBranchVillageMap = async (req, user) => {
        try {
            const queryString = locationQuery.GET_BLOCK_LIST_FOR_BRANCH_VILLAGE_MAP.replace('%branch_master_id%', req.branch_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    getUnmappedVillageByGpId = async (req, user) => {
        try {
            const queryString = locationQuery.GET_UNMAPPED_VILLAGE_LIST_BY_GP_ID.replace('%gp_master_id%', req.gp_master_id);
            const data = await connection.query(queryString);
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    mapBranchVillage = async (req, user) => {
        try {
            let str = '';
            req.selectedVillage.forEach((id) => {
                str += `( ${req.branch_master_id}, ${id} , ${user.user_master_id} ),`
            })
            let queryString = locationQuery.MAP_BRANCH_VILLAGE
                .replace('%selectedVillage%', str.slice(0, -1))
                .replace('%updated_by%', user.user_master_id)
                .replace('%updated_on%', utils.getCurrentDateTime());

            const data = await connection.query(queryString);

            if (!data || data.length === 0 || data.response.affectedRows === 0) {
                throw new Error('Failed to Update Map Branch Village');
            }
            return 'Map Branch Village Successfully Updated';
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    unmapBranchVillage = async (req, user) => {
        try {
            let queryString = locationQuery.BEFORE_UNMAP_CHECK_PARICIPANTS_PRESENT
                .replace('%branch_master_id%', req.branch_master_id)
                .replace('%village_master_id%', req.selectedVillage);
            const participants_present = await connection.query(queryString);
            if (participants_present.response.length) {
                throw new Error('Participants is mapped with the village and the branch');
            } else {
                let queryString = locationQuery.UNMAP_BRANCH_VILLAGE
                    .replace('%deleted_by%', user.user_master_id)
                    .replace('%deleted_on%', utils.getCurrentDateTime())
                    .replace('%branch_master_id%', req.branch_master_id)
                    .replace('%village_master_id%', req.selectedVillage);
                const data = await connection.query(queryString);

                if (!data || data.length === 0 || data.response.affectedRows === 0) {
                    throw new Error('Failed to Update Unmap Branch Village');
                }
                return 'Unmap Branch Village Successfully Updated';
            }
        } catch (error) {
            throw error;
        }
    }

    getProjectDonorList = async (req) => {
        try {
            const queryString = locationQuery.GET_PROJECT_DONOR_LIST;
            const data = await connection.query(queryString);
            utils.convertArrayDateField(data.response, 'project_start_date', 'project_end_date');
            return data.response;
        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

}