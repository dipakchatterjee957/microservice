import express from 'express';
const router = express.Router();
import locationRouter from './location.router.js';
import regionBranchRouter from './regionBranch.router.js';
import baselineSurveyRouter from './baselineSurvey.router.js';

router.use('/location', locationRouter);
router.use('/regionBranch', regionBranchRouter);
router.use('/baselineSurvey', baselineSurveyRouter);

export default router;