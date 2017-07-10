/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "Contact[Address|Field|Organization]?" }]*/
const nullCordovaContact = require('./null-cordova-contact.json')

/**
 * The `ContactAddress` object stores the properties of a single address of a
 * contact. A Contact object may include more than one address in a
 * `ContactAddress[]` array.
 *
 * @kind ContactAddress
 * @property {string} country The country name.
 * @property {string} formatted The full address formatted for display.
 * @property {string} locality The city or locality.
 * @property {string} postalCode The zip or postal code.
 * @property {boolean} pref Set to true if this ContactAddress contains the user's preferred value.
 * @property {string} region The state or region.
 * @property {string} streetAddress The full street address.
 * @property {string} type A string indicating what type of field this is, e.g., "work".
 * @protected
 * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#contactaddress
 */
const ContactAddress = {}

/**
 * The `ContactField` object is a reusable component that represents contact
 * fields generically. Each `ContactField` object contains a `value`, `type`,
 * and `pref` property. A Contact object stores several properties in
 * `ContactField[]` arrays, such as phone numbers and email addresses.
 *
 * In most instances, there are no pre-determined values for a ContactField
 * object's type attribute. For example, a phone number can specify type values
 * of home, work, mobile, iPhone, or any other value that is supported by a
 * particular device platform's contact database. However, for the `Contact`
 * photos field, the type field indicates the format of the returned image: url
 * when the value attribute contains a URL to the photo image, or base64 when
 * the value contains a base64-encoded image string.
 *
 * @kind ContactField
 * @property {boolean} pref Set to `true` if this `ContactField` contains the user's preferred value.
 * @property {string} type A string that indicates what type of field this is, e.g., "work".
 * @property {string} value The value of the field, such as a phone number or email address.
 * @protected
 * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#contactfield
 */
const ContactField = {}

/**
 * Contains different kinds of information about a `Contact` object's name.
 *
 * @kind ContactName
 * @property {string} familyName The contact's last name/surname.
 * @property {string} formatted The complete name of the contact.
 * @property {string} givenName The contact's first name/forename.
 * @property {string} honorificPrefix The contact's prefix (example _Ms._ or _Dr._).
 * @property {string} honorificSuffix The contact's suffix (example Esq. or _III_).
 * @property {string} middleName The contact's middle name.
 * @protected
 * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#contactname
 */
const ContactName = {}

/**
 * The `ContactOrganization` object stores a contact's organization properties.
 * A `Contact` object stores one or more `ContactOrganization` objects in an
 * array.
 *
 * @kind ContactOrganization
 * @property {string} department The department the contract works for.
 * @property {string} name The name of the organization.
 * @property {boolean} pref Set to true if this ContactOrganization contains the user's preferred value.
 * @property {string} title The contact's title at the organization.
 * @property {string} type A string that indicates what type of field this is, e.g., "work".
 * @protected
 * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#contactorganization
 */
const ContactOrganization = {}

/**
 * The `Contact` object represents a user's contact in a form that
 * [`cordova-plugin-contacts`](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html)
 * can immediately use to _create_, _store_, or _remove_
 * from a mobile device's native contacts database.
 *
 * @const
 * @alias cordova-contacts/Contact
 * @property {string} id A globally unique identifier set by a mobile device.
 * <br>
 * <br>
 * **:warning: Do not use `id` to store user-defined values.**
 * The `id` property should _never_ by used to store a value, as each mobile device overwrites it with a UUID.
 * @property {array.<ContactAddress>} addresses An array of all the contact's addresses.
 * @property {string} birthday The Contact's birth month/date.
 * <br>
 * <br>
 * **:warning: `birthday` does not include the birth year.**
 * @property {array.<ContactField>} categories An array of all the user-defined categories associated with the contact. The Verizon implementation displays the Verizon Enterprise ID of the:
 * <br>
 * <ul>
 * <li> `Contact` itself;
 * <li> `Contact`'s direct reports (if any); and
 * <li> `Contact`'s supervisor.
 * <br>
 * <br>
 * @property {string} displayName The name of this Contact, suitable for display to end users.
 * @property {array.<ContactField>} emails An array of all the contact's email addresses.
 * @property {array.<ContactField>} ims An array of all the contact's Instant Message (IM) addresses.
 * @property {ContactName} name An object containing all components of a persons name.
 * @property {string} nickname A casual name by which to address the contact.
 * @property {string} note A note/bio about the contact.
 * @property {array.<ContactOrganization>} organizations An array of all the contact's organizations.
 * @property {array.<ContactField>} phoneNumbers An array of all the contact's phone numbers.
 * @property {array.<ContactField>} urls An array of web pages associated with the contact.
 * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#contact
 */
const Contact = {}
module.exports = nullCordovaContact
