import express from 'express';

import * as oAuthgoogleControllers from '../controller/oAuth.google.controller.js';

const router = express.Router();

router.get('/authorization/url', oAuthgoogleControllers.getAuthorizationUrlFromGoogle);

router.get('/google/auth/callback', oAuthgoogleControllers.getTokensFromGoogle);

export default router;