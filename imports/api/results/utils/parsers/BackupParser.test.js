import parseBackup from './BackupParser';

it('Parses a successful backup', () => {
  const backupJSON = 'Duplicati Backup report for Clete MacBook Pro (IL)\n\nDeletedFiles: 0\nDeletedFolders: 0\nModifiedFiles: 42\nExaminedFiles: 379431\nOpenedFiles: 2733\nAddedFiles: 2691\nSizeOfModifiedFiles: 329208669\nSizeOfAddedFiles: 27441938\nSizeOfExaminedFiles: 383365106814\nSizeOfOpenedFiles: 717256360\nNotProcessedFiles: 0\nAddedFolders: 575\nTooLargeFiles: 0\nFilesWithError: 0\nModifiedFolders: 0\nModifiedSymlinks: 0\nAddedSymlinks: 0\nDeletedSymlinks: 0\nPartialBackup: False\nDryrun: False\nMainOperation: Backup\nParsedResult: Success\nVerboseOutput: False\nVerboseErrors: False\nEndTime: 10/14/2017 8:09:58 PM\nBeginTime: 10/14/2017 8:04:09 PM\nDuration: 00:05:49.3856480\nMessages: [\n    No remote filesets were deleted\n]\nWarnings: []\nErrors: []';

  console.log(parseBackup(backupJSON));
});
