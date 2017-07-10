const {
  clone,
  map,
  startCase,
  toLower
} = require('lodash')
const cordovaContactType = require('./cordova-contact-type')
const nullCordovaContact = require('./null-cordova-contact')
const WORK = 'work'
const contactUrls = require('./contact-urls')

/**
 * Assign ContactAddresses.
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignAddresses = (contact, profilePantry) => {
  contact.addresses[cordovaContactType.WORK].type = WORK
  contact.addresses[cordovaContactType.WORK].country = profilePantry.workCountry
  contact.addresses[cordovaContactType.WORK].formatted = `${profilePantry.workStreet} ${profilePantry.mailCode}, ${profilePantry.workCity}, ${profilePantry.workState} ${profilePantry.workPostalCode} ${profilePantry.workCountry}`
  contact.addresses[cordovaContactType.WORK].locality = profilePantry.workCity
  contact.addresses[cordovaContactType.WORK].postalCode = profilePantry.workPostalCode
  contact.addresses[cordovaContactType.WORK].pref = true
  contact.addresses[cordovaContactType.WORK].region = profilePantry.workState
  contact.addresses[cordovaContactType.WORK].streetAddress = `${profilePantry.workStreet} ${profilePantry.mailCode}`
}

/**
 * Assign Verizon identifiers.
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignCategories = (contact, profilePantry) => {
  contact.categories[cordovaContactType.VZEID].pref = true
  contact.categories[cordovaContactType.VZEID].type = 'id:vzeid'
  contact.categories[cordovaContactType.VZEID].value = profilePantry.vzeid
  contact.categories[cordovaContactType.VZEID_MANAGER].type = 'id:vzeid:manager'
  contact.categories[cordovaContactType.VZEID_MANAGER].value = profilePantry.managerEid
  contact.categories[cordovaContactType.VZEID_DIRECT_REPORTS].type = 'id:vzeid:direct-reports'
  contact.categories[cordovaContactType.VZEID_DIRECT_REPORTS].value = profilePantry.directReportsEIDs
}

/**
 * Assign Verizon work emails.
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignEmails = (contact, profilePantry) => {
  contact.emails[cordovaContactType.WORK_INTERNAL].type = 'work:internal'
  contact.emails[cordovaContactType.WORK_INTERNAL].value = profilePantry.internalEmail
  contact.emails[cordovaContactType.WORK_EXTERNAL].pref = true
  contact.emails[cordovaContactType.WORK_EXTERNAL].type = 'work:external'
  contact.emails[cordovaContactType.WORK_EXTERNAL].value = profilePantry.externalEmail
}

/**
 * Assign a ContactName
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignName = (contact, profilePantry) => {
  contact.name.familyName = profilePantry.lastName
  contact.name.formatted = profilePantry.fullName
  contact.name.givenName = profilePantry.firstName
}

/**
 * Assign a Verizon organization
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignOrganizations = (contact, profilePantry) => {
  contact.organizations[cordovaContactType.WORK].department = startCase(toLower(profilePantry.financeLobName))
  contact.organizations[cordovaContactType.WORK].name = `${profilePantry.treeLobName}, ${profilePantry.organization}`
  contact.organizations[cordovaContactType.WORK].pref = true
  contact.organizations[cordovaContactType.WORK].title = profilePantry.jobTitle
  contact.organizations[cordovaContactType.WORK].type = WORK
}

/**
 * Assign work and mobile phone numbers
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignPhoneNumbers = (contact, profilePantry) => {
  contact.phoneNumbers[cordovaContactType.WORK].pref = true
  contact.phoneNumbers[cordovaContactType.WORK].type = WORK
  contact.phoneNumbers[cordovaContactType.WORK].value = profilePantry.officePhoneNumber
  contact.phoneNumbers[cordovaContactType.MOBILE].type = 'mobile'
  contact.phoneNumbers[cordovaContactType.MOBILE].value = profilePantry.mobile
}

/**
 * Assign employee profile URLs:
 * 1. eDirectory
 * 2. CrowdAround
 * 3. OneJIRA
 * 4. OneConfluence
 * 5. OneStash
 *
 * @private
 * @param {Contact} contact       Cordova Contact
 * @param {object} profilePantry Profile Pantry
 *
 * @returns {void}
 */
const assignUrls = (contact, profilePantry) => {
  contact.urls = map(contactUrls, (url) => {
    url.value = url.value
      .replace('{VZEID}', profilePantry.vzeid)
      .replace('{VZID}', profilePantry.vzid)
    return url
  })
}

/**
 * Adapts Profile Pantry attributes to the Cordova `Contact` interface.
 * @const
 * @alias cordova-contacts/profilePantryToCordovaContact
 * @requires cordova-contacts/cordovaContactType
 */
const profilePantryToCordovaContact = {

  /**
     * Transform profile pantry `JSON` to a Cordova `Contact` object.
     *
     * @param {object} profilePantry={} Profile Pantry attributes.
     * @param {string=} [profilePantry.birthday=null] The contact's birth month/date, without year.
     * @param {string=} [profilePantry.company=null] The Verizon company code.
     * @param {string=} [profilePantry.directReportsEIDs=null] A comma-delimited string of the contact's direct reports' Enterprise IDs
     * @param {string=} [profilePantry.externalEmail=null] The contact's Verizon external email address.
     * @param {string=} [profilePantry.financeLobName=null] A Verizon Line Of Business name.
     * @param {string=} [profilePantry.firstName=null] The contact's given name.
     * @param {string=} [profilePantry.fullName=null] The contact's fully formatted name.
     * @param {string=} [profilePantry.internalEmail=null] The contact's Verizon-internal email address.
     * @param {string=} [profilePantry.jobTitle=null] The contact's job title.
     * @param {string=} [profilePantry.lastName=null] The contact's family name.
     * @param {string=} [profilePantry.mailCode=null] The contact's mail box.
     * @param {string=} [profilePantry.managerEid=null] The contact's supervisor's Enterprise ID.
     * @param {string=} [profilePantry.mobile=null] The contact's mobile phone number.
     * @param {string=} [profilePantry.nickname=null] The contact's preferred name.
     * @param {string=} [profilePantry.officePhoneNumber=null] The contact's work phone number.
     * @param {string=} [profilePantry.organization=null] The name of the organization in which the contact works.
     * @param {string=} [profilePantry.treeHierarchy=null] The Verizon Enterprise IDs of the contact's supervisor up to the CEO.
     * @param {string=} [profilePantry.treeLobName=null] The contact's Line Of Business abbreviation.
     * @param {string=} [profilePantry.treeLobNumber=null] The contact's Line Of Business's identifier.
     * @param {string=} [profilePantry.vzeid=null] The contact's unique Enterprise ID.
     * @param {string=} [profilePantry.vzid=null] The contact's unique Verizon ID.
     * @param {string=} [profilePantry.workCity=null] The locality in which the contact works.
     * @param {string=} [profilePantry.workCountry=null] The country in which the contact works.
     * @param {string=} [profilePantry.workPostalCode=null] The alphanumeric code that categorizes the contact's geographic area, institution, agency, or company.
     * @param {string=} [profilePantry.workState=null] The region in which the contact works.
     * @param {string=} [profilePantry.workStreet=null] The street on which the contact works.
     * @static
     * @returns {cordova-contacts/Contact} A Cordova `Contact` object.
     */
  adapt: (profilePantry) => {
    const contact = clone(nullCordovaContact)
    contact.birthday = profilePantry.birthday
    assignAddresses(contact, profilePantry)
    assignCategories(contact, profilePantry)
    contact.displayName = profilePantry.fullName
    assignEmails(contact, profilePantry)
    assignName(contact, profilePantry)
    contact.nickname = profilePantry.nickname
    assignOrganizations(contact, profilePantry)
    assignPhoneNumbers(contact, profilePantry)
    assignUrls(contact, profilePantry)
    return contact
  }
}

module.exports = profilePantryToCordovaContact
