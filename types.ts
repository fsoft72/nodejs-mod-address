/* Types file generated by flow2code */

/*=== f2c_start __file ===*/

/*=== f2c_end __file ===*/

/** Address */
export interface Address {
	/** the main id field */
	id?: string;
	/** domain */
	domain?: string;
	/** The user id */
	id_user?: string;
	/** Address type [ 'personal', 'company', 'invoice' ] */
	type?: string;
	/** Main name (if any) */
	name?: string;
	/** The address */
	address?: string;
	/** The address number */
	nr?: string;
	/** The address post code */
	zip?: string;
	/** The address city */
	city?: string;
	/** The state or province */
	state?: string;
	/** The country */
	country?: string;
	/** Company name for invoicing */
	company_name?: string;
	/** Fiscal code */
	fiscal_code?: string;
	/** VAT number */
	vat_number?: string;
	/** SDI code */
	sdi?: string;
	/** PEC email */
	pec?: string;
}

export const AddressKeys = {
	'id': { type: 'string', priv: false },
	'domain': { type: 'string', priv: false },
	'id_user': { type: 'string', priv: false },
	'type': { type: 'string', priv: false },
	'name': { type: 'string', priv: false },
	'address': { type: 'string', priv: false },
	'nr': { type: 'string', priv: false },
	'zip': { type: 'string', priv: false },
	'city': { type: 'string', priv: false },
	'state': { type: 'string', priv: false },
	'country': { type: 'string', priv: false },
	'company_name': { type: 'string', priv: false },
	'fiscal_code': { type: 'string', priv: false },
	'vat_number': { type: 'string', priv: false },
	'sdi': { type: 'string', priv: false },
	'pec': { type: 'string', priv: false },
};

