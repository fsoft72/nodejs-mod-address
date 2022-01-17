
import { ILRequest, ILResponse, ILApplication, ILiweConfig, ILError, ILiWE } from '../../liwe/types';
import { send_error, send_ok, typed_dict } from "../../liwe/utils";

import { perms } from '../../liwe/auth';

import {
	post_address_admin_add, patch_address_admin_update, patch_address_admin_fields, get_address_admin_list, delete_address_admin_del, get_address_details, get_address_list, address_db_init, address_add, address_user_list
} from './methods';

import {
	Address
} from './types';

/*=== d2r_start __header ===*/

/*=== d2r_end __header ===*/

/* === ADDRESS API === */
export const init = ( liwe: ILiWE ) => {
	const app = liwe.app;

	console.log( "    - Address " );

	address_db_init( liwe );


	app.post( "/api/address/admin/add", perms( [ "address.add" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { address, nr, type, name, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec, ___errors } = typed_dict( req.fields || req.body, [
			{ name: "address", type: "string", required: true },
			{ name: "nr", type: "string", required: true },
			{ name: "type", type: "string", required: true },
			{ name: "name", type: "string", required: false },
			{ name: "city", type: "string", required: false },
			{ name: "zip", type: "string", required: false },
			{ name: "state", type: "string", required: false },
			{ name: "country", type: "string", required: false },
			{ name: "id_user", type: "string", required: false },
			{ name: "company_name", type: "string", required: false },
			{ name: "fiscal_code", type: "string", required: false },
			{ name: "vat_number", type: "string", required: false },
			{ name: "sdi", type: "string", required: false },
			{ name: "pec", type: "string", required: false }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		post_address_admin_add( req, address, nr, type, name, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec, ( err: ILError, addr: Address ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { addr } );
		} );
	} );

	app.patch( "/api/address/admin/update", perms( [ "address.add" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { id, name, address, nr, type, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec, ___errors } = typed_dict( req.fields || req.body, [
			{ name: "id", type: "string", required: true },
			{ name: "name", type: "string", required: false },
			{ name: "address", type: "string", required: false },
			{ name: "nr", type: "string", required: false },
			{ name: "type", type: "string", required: false },
			{ name: "city", type: "string", required: false },
			{ name: "zip", type: "string", required: false },
			{ name: "state", type: "string", required: false },
			{ name: "country", type: "string", required: false },
			{ name: "id_user", type: "string", required: false },
			{ name: "company_name", type: "string", required: false },
			{ name: "fiscal_code", type: "string", required: false },
			{ name: "vat_number", type: "string", required: false },
			{ name: "sdi", type: "string", required: false },
			{ name: "pec", type: "string", required: false }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		patch_address_admin_update( req, id, name, address, nr, type, city, zip, state, country, id_user, company_name, fiscal_code, vat_number, sdi, pec, ( err: ILError, addr: Address ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { addr } );
		} );
	} );

	app.patch( "/api/address/admin/fields", perms( [ "address.add" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { id, data, ___errors } = typed_dict( req.fields || req.body, [
			{ name: "id", type: "string", required: true },
			{ name: "data", type: "any", required: true }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		patch_address_admin_fields( req, id, data, ( err: ILError, addr: Address ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { addr } );
		} );
	} );

	app.get( "/api/address/admin/list", perms( [ "address.add" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { id_user, rows, skip, ___errors } = typed_dict( req.query as any, [
			{ name: "id_user", type: "string", required: false },
			{ name: "rows", type: "number", required: false, default: -1 },
			{ name: "skip", type: "number", required: false, default: 0 }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		get_address_admin_list( req, id_user, rows, skip, ( err: ILError, addrs: Address[] ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { addrs } );
		} );
	} );

	app.delete( "/api/address/admin/del", perms( [ "address.add" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { id, ___errors } = typed_dict( req.fields || req.body, [
			{ name: "id", type: "string", required: true }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		delete_address_admin_del( req, id, ( err: ILError, id: string ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { id } );
		} );
	} );

	app.get( "/api/address/details", ( req: ILRequest, res: ILResponse ) => {
		const { id, ___errors } = typed_dict( req.query as any, [
			{ name: "id", type: "string", required: false }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		get_address_details( req, id, ( err: ILError, addr: Address ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { addr } );
		} );
	} );

	app.get( "/api/address/list", ( req: ILRequest, res: ILResponse ) => {
		const { rows, skip, ___errors } = typed_dict( req.query as any, [
			{ name: "rows", type: "number", required: false, default: -1 },
			{ name: "skip", type: "number", required: false, default: 0 }
		] );

		if ( ___errors.length ) return send_error( res, { message: `Missing required fields: ${ ___errors.join( ', ' ) }` } );

		get_address_list( req, rows, skip, ( err: ILError, addrs: Address[] ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { addrs } );
		} );
	} );

};
