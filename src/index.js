/**
 * Aurelia-Bailiwick -- tools and utilities for using Bailiwick from Aurelia
 * $Id$
 *
 * Authors
 * - Michael Granger <ged@FaerieMUD.org>
 */

import {ObserverLocator} from 'aurelia-binding';
import {Bailiwick} from 'bailiwick';

import {BailiwickObservationAdapter} from './observation-adapter';


/**
 * The default namespace
 */

export var VERSION = '0.0.1.dev';

export function configure( frameworkConfig ) {

	frameworkConfig.container.
		get( ObserverLocator ).
		addAdapter( new BailiwickObservationAdapter() );

	// breeze-validation attribute.
	frameworkConfig.globalResources( './bailiwick-validation' );

}

