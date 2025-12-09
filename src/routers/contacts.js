import { Router } from 'express';
import {
  getContactsController,
  contactController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

import { authenticate } from '../middlewares/authenticate.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(contactController),
);

router.post(
  '/',
  validateBody(createContactSchema),
  upload.single('photo'),
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(deleteContactController),
);

export default router;
