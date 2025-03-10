import Multer from 'multer';
import { ServiceError } from '@/exceptions';

export function allowSheetExtensions(req, file, cb) {
  if (
    file.mimetype !== 'text/csv' &&
    file.mimetype !== 'application/vnd.ms-excel'
  ) {
    cb(new ServiceError('IMPORTED_FILE_EXTENSION_INVALID'));

    return;
  }
  cb(null, true);
}

export const uploadImportFile = Multer({
  dest: './public/imports',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: allowSheetExtensions,
});
