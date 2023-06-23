
import { ILRequest, ILResponse, LCback, ILiweConfig, ILError, ILiWE } from '../../liwe/types';
import { $l } from '../../liwe/locale';

import {
	Address, AddressKeys,
} from './types';

let _liwe: ILiWE = null;

const _ = ( txt: string, vals: any = null, plural = false ) => {
	return $l( txt, vals, plural, "address" );
};

const COLL_ADDRESSES = "addresses";

/*=== f2c_start __file_header === */
import { keys_valid, mkid } from '../../liwe/utils';
import { system_domain_get_by_session } from '../system/methods';
import { adb_collection_init, adb_find_one, adb_find_all, adb_del_one, adb_record_add } from '../../liwe/db/arango';

const address_get = async ( req: ILRequest, id: string, create_empty = false ) => {
	let addr: Address = null;

	if ( id ) addr = await adb_find_one( req.db, COLL_ADDRESSES, { id } );

	if ( !addr && create_empty ) {
		const domain = await system_domain_get_by_session( req );

		addr = { id: mkid( 'addr' ), id_user: req.user.id, domain: domain.code };
	}

	return addr;
};


const address_create = async ( req: ILRequest, data: any, create_empty = true ): Promise<Address> => {
	let address: Address = await address_get( req, data.id, create_empty );

	if ( !address ) return null;

	address = { ...address, ...keys_valid( data ) };

	address = await adb_record_add( req.db, COLL_ADDRESSES, address, AddressKeys );

	return address;
};
/*=== f2c_end __file_header ===*/

// {{{ post_address_admin_add ( req: ILRequest, address: string, nr: string, type: string, name?: string, city?: string, zip?: string, state?: string, country?: string, id_user?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, cback: LCBack = null ): Promise<Address>
/**
 *
 * Adds address in the system to the specified `id_user`.
 * This function returns the full `Address` structure
 *
 * @param address - The street address [req]
 * @param nr - The street address number [req]
 * @param type - Address type [req]
 * @param name - Address name [opt]
 * @param city - Address city [opt]
 * @param zip - Address postal code [opt]
 * @param state - Address state [opt]
 * @param country - Address country [opt]
 * @param id_user - The user this address will belong to [opt]
 * @param company_name - Company name [opt]
 * @param fiscal_code - Fiscal code [opt]
 * @param vat_number - VAT number [opt]
 * @param sdi - SDI code [opt]
 * @param pec - PEC email [opt]
 *
 * @return addr: Address
 *
 */
export const post_address_admin_add = ( req: ILRequest, address: string, nr: string, type: string, name?: string, city?: string, zip?: string, state?: string, country?: string, id_user?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start post_address_admin_add ===*/
		const addr: Address = await address_create( req, { name, address, nr, type, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec } );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== f2c_end post_address_admin_add ===*/
	} );
};
// }}}

// {{{ patch_address_admin_update ( req: ILRequest, id: string, name?: string, address?: string, nr?: string, type?: string, city?: string, zip?: string, state?: string, country?: string, id_user?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, cback: LCBack = null ): Promise<Address>
/**
 *
 * Updates the address specified by `id`.
 * This function returns the full `Address` structure
 *
 * @param id - Address ID [req]
 * @param name - Address name [opt]
 * @param address - The street address [opt]
 * @param nr - The street address number [opt]
 * @param type - Address type [opt]
 * @param city - Address city [opt]
 * @param zip - Address postal code [opt]
 * @param state - Address state [opt]
 * @param country - Address country [opt]
 * @param id_user - The user this address will belong to [opt]
 * @param company_name - Company name [opt]
 * @param fiscal_code - Fiscal code [opt]
 * @param vat_number - VAT number [opt]
 * @param sdi - SDI code [opt]
 * @param pec - PEC email [opt]
 *
 * @return addr: Address
 *
 */
export const patch_address_admin_update = ( req: ILRequest, id: string, name?: string, address?: string, nr?: string, type?: string, city?: string, zip?: string, state?: string, country?: string, id_user?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start patch_address_admin_update ===*/
		const addr: Address = await address_create( req, { id, name, address, nr, type, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec }, false );
		const err = { message: 'Address not found' };

		if ( !addr ) return cback ? cback( err ) : reject( err );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== f2c_end patch_address_admin_update ===*/
	} );
};
// }}}

// {{{ patch_address_admin_fields ( req: ILRequest, id: string, data: any, cback: LCBack = null ): Promise<Address>
/**
 *
 * The call modifies one or more fields.
 * This function returns the full `Address` structure
 *
 * @param id - The address ID [req]
 * @param data - The field / value to patch [req]
 *
 * @return addr: Address
 *
 */
export const patch_address_admin_fields = ( req: ILRequest, id: string, data: any, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start patch_address_admin_fields ===*/
		const err = { message: 'Address not found' };
		const addr: Address = await address_create( req, { id, ...data }, false );

		if ( !addr ) return cback ? cback( err ) : reject( err );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== f2c_end patch_address_admin_fields ===*/
	} );
};
// }}}

// {{{ get_address_admin_list ( req: ILRequest, id_user?: string, rows: number = -1, skip: number = 0, cback: LCBack = null ): Promise<Address[]>
/**
 *
 * Returns all addresss.
 * This function returns a list of full `Address` structure.
 * This function supports pagination.
 *
 * @param id_user - Optional user id that's owner of the address [opt]
 * @param rows - How many rows to return [opt]
 * @param skip - First line to return [opt]
 *
 * @return addrs: Address
 *
 */
export const get_address_admin_list = ( req: ILRequest, id_user?: string, rows: number = -1, skip: number = 0, cback: LCback = null ): Promise<Address[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_address_admin_list ===*/
		const addrs: Address[] = await adb_find_all( req.db, COLL_ADDRESSES, { id_user }, AddressKeys, { rows, skip } );

		return cback ? cback( null, addrs ) : resolve( addrs );
		/*=== f2c_end get_address_admin_list ===*/
	} );
};
// }}}

// {{{ delete_address_admin_del ( req: ILRequest, id: string, cback: LCBack = null ): Promise<string>
/**
 *
 * Deletes an address from the system
 *
 * @param id - The address id to be deleted [req]
 *
 * @return id: string
 *
 */
export const delete_address_admin_del = ( req: ILRequest, id: string, cback: LCback = null ): Promise<string> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start delete_address_admin_del ===*/
		await adb_del_one( req.db, COLL_ADDRESSES, { id } );

		return cback ? cback( null, id ) : resolve( id );
		/*=== f2c_end delete_address_admin_del ===*/
	} );
};
// }}}

// {{{ get_address_details ( req: ILRequest, id: string, cback: LCBack = null ): Promise<Address>
/**
 *
 * Returns all address details only if the address is `visible`.
 * The address can be identified by  `id`, `code` or `code_forn`.
 * You can pass more than a field, but one is enough.
 * This function returns the full `Address` structure
 *
 * @param id - Address unique ID [req]
 *
 * @return addr: Address
 *
 */
export const get_address_details = ( req: ILRequest, id: string, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_address_details ===*/

		/*=== f2c_end get_address_details ===*/
	} );
};
// }}}

// {{{ get_address_list ( req: ILRequest, rows: number = -1, skip: number = 0, cback: LCBack = null ): Promise<Address[]>
/**
 *
 * Returns all visible addresses for the logged in user.
 * Addresss with `visible` set to `false` are not shown.
 * This function returns a list of full `Address` structure.
 * This function supports pagination.
 *
 * @param rows - How many rows to return [opt]
 * @param skip - First line to return [opt]
 *
 * @return addrs: Address
 *
 */
export const get_address_list = ( req: ILRequest, rows: number = -1, skip: number = 0, cback: LCback = null ): Promise<Address[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_address_list ===*/
		const addrs: Address[] = await adb_find_all( req.db, COLL_ADDRESSES, { id_user: req.user.id }, AddressKeys );

		return cback ? cback( null, addrs ) : resolve( addrs );
		/*=== f2c_end get_address_list ===*/
	} );
};
// }}}

// {{{ address_add ( req: ILRequest, id_user: string, address: string, nr: string, name?: string, type?: string, city?: string, zip?: string, state?: string, country?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, id?: string, unique?: boolean, cback: LCBack = null ): Promise<Address>
/**
 *
 * Adds a new address to a user
 *
 * @param req - the Request [req]
 * @param id_user - User ID [req]
 * @param address - Address [req]
 * @param nr - Address nr [req]
 * @param name - Address name [opt]
 * @param type - Address type [opt]
 * @param city - Address city [opt]
 * @param zip - Address postal code [opt]
 * @param state - Address state [opt]
 * @param country - Address country [opt]
 * @param company_name - Company name [opt]
 * @param fiscal_code - Fiscal code [opt]
 * @param vat_number - VAT number [opt]
 * @param sdi - SDI code [opt]
 * @param pec - PEC email [opt]
 * @param id - Address ID (in case of updating) [opt]
 * @param unique - If the user/type combo should be unique [opt]
 *
 * @return : Address
 *
 */
export const address_add = ( req: ILRequest, id_user: string, address: string, nr: string, name?: string, type?: string, city?: string, zip?: string, state?: string, country?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, id?: string, unique?: boolean, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start address_add ===*/
		let addr: Address;

		addr = await address_get( req, id, true );

		addr = { ...addr, ...keys_valid( { id_user, address, nr, name, type, city, zip, state, country, company_name, fiscal_code, vat_number, sdi, pec } ) };

		if ( unique ) await adb_del_one( req.db, COLL_ADDRESSES, { id_user, type } );

		addr = await adb_record_add( req.db, COLL_ADDRESSES, addr, AddressKeys );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== f2c_end address_add ===*/
	} );
};
// }}}

// {{{ address_user_list ( req: ILRequest, id_user: string, cback: LCBack = null ): Promise<Address[]>
/**
 *
 * List all addresses for the user
 *
 * @param req - the Request [req]
 * @param id_user - User ID [req]
 *
 * @return : Address
 *
 */
export const address_user_list = ( req: ILRequest, id_user: string, cback: LCback = null ): Promise<Address[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start address_user_list ===*/
		const addrs: Address[] = await adb_find_all( req.db, COLL_ADDRESSES, { id_user }, AddressKeys );

		return cback ? cback( null, addrs ) : resolve( addrs );
		/*=== f2c_end address_user_list ===*/
	} );
};
// }}}

// {{{ address_db_init ( liwe: ILiWE, cback: LCBack = null ): Promise<boolean>
/**
 *
 * Initializes the module's database
 *
 * @param liwe - The Liwe object [req]
 *
 * @return : boolean
 *
 */
export const address_db_init = ( liwe: ILiWE, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		_liwe = liwe;

		await adb_collection_init( liwe.db, COLL_ADDRESSES, [
			{ type: "persistent", fields: [ "id" ], unique: true },
			{ type: "persistent", fields: [ "domain" ], unique: false },
			{ type: "persistent", fields: [ "id_user" ], unique: false },
			{ type: "persistent", fields: [ "type" ], unique: false },
			{ type: "persistent", fields: [ "zip" ], unique: false },
			{ type: "persistent", fields: [ "city" ], unique: false },
			{ type: "persistent", fields: [ "state" ], unique: false },
			{ type: "persistent", fields: [ "country" ], unique: false },
		], { drop: false } );

		/*=== f2c_start address_db_init ===*/

		/*=== f2c_end address_db_init ===*/
	} );
};
// }}}


