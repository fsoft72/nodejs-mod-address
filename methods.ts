
import { ILRequest, ILResponse, LCback, ILiweConfig, ILError, ILiWE } from '../../liwe/types';
import { collection_add, collection_find_all, collection_find_one, collection_find_one_dict, collection_find_all_dict, collection_del_one_dict, collection_init, mkid, prepare_filters } from '../../liwe/arangodb';
import { DocumentCollection } from 'arangojs/collection';

import {
	Address, AddressKeys
} from './types';

let _liwe: ILiWE = null;

let _coll_addresses: DocumentCollection = null;

const COLL_ADDRESSES = "addresses";

/*=== d2r_start __file_header === */
import { keys_valid } from '../../liwe/utils';
import { system_domain_get_by_session } from '../system/methods';

const address_get = async ( req: ILRequest, id: string, create_empty = false ) => {
	let addr: Address = null;

	if ( id ) addr = await collection_find_one_dict( req.db, COLL_ADDRESSES, { id } );

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

	address = await collection_add( _coll_addresses, address, false, AddressKeys );

	return address;
};
/*=== d2r_end __file_header ===*/

/**
 * Adds a new address
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
 */
export const post_address_admin_add = ( req: ILRequest, address: string, nr: string, type: string, name?: string, city?: string, zip?: string, state?: string, country?: string, id_user?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start post_address_admin_add ===*/
		const addr: Address = await address_create( req, { name, address, nr, type, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec } );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== d2r_end post_address_admin_add ===*/
	} );
};

/**
 * Updates an existing address
 *
 * @param id - Address ID [req]
 * @param name - Address name [opt]
 * @param address - The street address [opt]
 * @param nr - The street address number [opt]
 * @param type - Address type [opt]
 * @param city - Address city [opt]
 * @param zip - Address postal code [opt]
 * @param state - Address state [opt]
 * @param country - Address countryu [opt]
 * @param id_user - The user this address will belong to [opt]
 * @param company_name - Company name [opt]
 * @param fiscal_code - Fiscal code [opt]
 * @param vat_number - VAT number [opt]
 * @param sdi - SDI code [opt]
 * @param pec - PEC email [opt]
 *
 */
export const patch_address_admin_update = ( req: ILRequest, id: string, name?: string, address?: string, nr?: string, type?: string, city?: string, zip?: string, state?: string, country?: string, id_user?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start patch_address_admin_update ===*/
		const addr: Address = await address_create( req, { id, name, address, nr, type, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec }, false );
		const err = { message: 'Address not found' };

		if ( !addr ) return cback ? cback( err ) : reject( err );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== d2r_end patch_address_admin_update ===*/
	} );
};

/**
 * Modifies some fields
 *
 * @param id - The address ID [req]
 * @param data - The field / value to patch [req]
 *
 */
export const patch_address_admin_fields = ( req: ILRequest, id: string, data: any, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start patch_address_admin_fields ===*/
		const err = { message: 'Address not found' };
		const addr: Address = await address_create( req, { id, ...data }, false );

		if ( !addr ) return cback ? cback( err ) : reject( err );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== d2r_end patch_address_admin_fields ===*/
	} );
};

/**
 * List all addresss
 *
 * @param id_user - Optional user id that's owner of the address [opt]
 * @param rows - How many rows to return [opt]
 * @param skip - First line to return [opt]
 *
 */
export const get_address_admin_list = ( req: ILRequest, id_user?: string, rows: number = -1, skip: number = 0, cback: LCback = null ): Promise<Address[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start get_address_admin_list ===*/
		const addrs: Address[] = await collection_find_all_dict( req.db, COLL_ADDRESSES, { id_user }, AddressKeys, { rows, skip } );

		return cback ? cback( null, addrs ) : resolve( addrs );
		/*=== d2r_end get_address_admin_list ===*/
	} );
};

/**
 * Deletes a address
 *
 * @param id - The address id to be deleted [req]
 *
 */
export const delete_address_admin_del = ( req: ILRequest, id: string, cback: LCback = null ): Promise<string> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start delete_address_admin_del ===*/
		await collection_del_one_dict( req.db, COLL_ADDRESSES, { id } );

		return cback ? cback( null, id ) : resolve( id );
		/*=== d2r_end delete_address_admin_del ===*/
	} );
};

/**
 * Get all address details
 *
 * @param id - Address unique ID [opt]
 *
 */
export const get_address_details = ( req: ILRequest, id?: string, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start get_address_details ===*/

		/*=== d2r_end get_address_details ===*/
	} );
};

/**
 * List all addresses
 *
 * @param rows - How many rows to return [opt]
 * @param skip - First line to return [opt]
 *
 */
export const get_address_list = ( req: ILRequest, rows: number = -1, skip: number = 0, cback: LCback = null ): Promise<Address[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start get_address_list ===*/
		const addrs: Address[] = await collection_find_all_dict( req.db, COLL_ADDRESSES, { id_user: req.user.id }, AddressKeys );

		return cback ? cback( null, addrs ) : resolve( addrs );
		/*=== d2r_end get_address_list ===*/
	} );
};

/**
 * Initializes the address database
 *
 * @param liwe - LiWE full config [req]
 *
 */
export const address_db_init = ( liwe: ILiWE, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		_liwe = liwe;

		_coll_addresses = await collection_init( liwe.db, COLL_ADDRESSES, [
			{ type: "persistent", fields: [ "id" ], unique: true },
			{ type: "persistent", fields: [ "domain" ], unique: false },
			{ type: "persistent", fields: [ "id_user" ], unique: false },
			{ type: "persistent", fields: [ "type" ], unique: false },
			{ type: "persistent", fields: [ "zip" ], unique: false },
			{ type: "persistent", fields: [ "city" ], unique: false },
			{ type: "persistent", fields: [ "state" ], unique: false },
			{ type: "persistent", fields: [ "country" ], unique: false },
		] );

		/*=== d2r_start address_db_init ===*/

		/*=== d2r_end address_db_init ===*/
	} );
};

/**
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
 * @param country - Address countryu [opt]
 * @param company_name - Company name [opt]
 * @param fiscal_code - Fiscal code [opt]
 * @param vat_number - VAT number [opt]
 * @param sdi - SDI code [opt]
 * @param pec - PEC email [opt]
 * @param id - Address ID (in case of updating) [opt]
 * @param unique - If the user/type combo should be unique [opt]
 *
 */
export const address_add = ( req: ILRequest, id_user: string, address: string, nr: string, name?: string, type?: string, city?: string, zip?: string, state?: string, country?: string, company_name?: string, fiscal_code?: string, vat_number?: string, sdi?: string, pec?: string, id?: string, unique?: boolean, cback: LCback = null ): Promise<Address> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start address_add ===*/
		let addr: Address;

		addr = await address_get( req, id, true );

		addr = { ...addr, ...keys_valid( { id_user, address, nr, name, type, city, zip, state, country, company_name, fiscal_code, vat_number, sdi, pec } ) };

		if ( unique ) await collection_del_one_dict( req.db, COLL_ADDRESSES, { id_user, type } );

		addr = await collection_add( _coll_addresses, addr, false, AddressKeys );

		return cback ? cback( null, addr ) : resolve( addr );
		/*=== d2r_end address_add ===*/
	} );
};

/**
 * List all addresses for the user
 *
 * @param req - the Request [req]
 * @param id_user - User ID [req]
 *
 */
export const address_user_list = ( req: ILRequest, id_user: string, cback: LCback = null ): Promise<Address[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== d2r_start address_user_list ===*/
		const addrs: Address[] = await collection_find_all_dict( req.db, COLL_ADDRESSES, { id_user }, AddressKeys );

		return cback ? cback( null, addrs ) : resolve( addrs );
		/*=== d2r_end address_user_list ===*/
	} );
};
