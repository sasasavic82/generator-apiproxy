/**
 * An enum that specificies the kinds of contact information and avoids "magic numbers" during interface adaption/transformation.
 *
 * @readonly
 * @alias cordova-contacts/cordovaContactType
 * @enum {number}
 * @property {number} CROWD_AROUND_PROFILE=1
 * @property {number} E_DIRECTORY_PROFILE=0
 * @property {number} MOBILE=1
 * @property {number} ONE_CONFLUENCE_PROFILE=3
 * @property {number} ONE_JIRA_PROFILE=2
 * @property {number} ONE_STASH_PROFILE=4
 * @property {number} VZEID_DIRECT_REPORTS=2
 * @property {number} VZEID_MANAGER=1
 * @property {number} VZEID=0
 * @property {number} VZID=0
 * @property {number} WORK_EXTERNAL=0
 * @property {number} WORK_INTERNAL=1
 * @property {number} WORK=0
 */
const cordovaContactType = {};
(function (cordovaContactType) {
  cordovaContactType[cordovaContactType.CROWD_AROUND_PROFILE = 1] = 'CROWD_AROUND_PROFILE'
  cordovaContactType[cordovaContactType.E_DIRECTORY_PROFILE = 0] = 'E_DIRECTORY_PROFILE'
  cordovaContactType[cordovaContactType.MOBILE = 1] = 'MOBILE'
  cordovaContactType[cordovaContactType.ONE_CONFLUENCE_PROFILE = 3] = 'ONE_CONFLUENCE_PROFILE'
  cordovaContactType[cordovaContactType.ONE_JIRA_PROFILE = 2] = 'ONE_JIRA_PROFILE'
  cordovaContactType[cordovaContactType.ONE_STASH_PROFILE = 4] = 'ONE_STASH_PROFILE'
  cordovaContactType[cordovaContactType.VZEID_DIRECT_REPORTS = 2] = 'VZEID_DIRECT_REPORTS'
  cordovaContactType[cordovaContactType.VZEID_MANAGER = 1] = 'VZEID_MANAGER'
  cordovaContactType[cordovaContactType.VZEID = 0] = 'VZEID'
  cordovaContactType[cordovaContactType.VZID = 0] = 'VZID'
  cordovaContactType[cordovaContactType.WORK_EXTERNAL = 0] = 'WORK_EXTERNAL'
  cordovaContactType[cordovaContactType.WORK_INTERNAL = 1] = 'WORK_INTERNAL'
  cordovaContactType[cordovaContactType.WORK = 0] = 'WORK'
}(cordovaContactType))

module.exports = cordovaContactType
