/* -*- javascrip -*- */
"use strict";

import {BailiwickObjectObserver} from './bailiwick-object-observer';

function createObserverLookup(obj) {
	let value = new BailiwickObjectObserver(obj);

	Object.defineProperty(obj, '__BailiwickObserver__', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: value
	});

	return value;
}

function createCanObserveLookup(entityType) {
	let value = {};
	let properties = entityType.getProperties();
	for (let i = 0, ii = properties.length; i < ii; i++) {
		let property = properties[i];

		// determine whether the adapter should handle the property...
		// all combinations of navigation/data properties * scalar/non-scalar properties are handled EXCEPT
		// non-scalar navigation properties because Aurelia handles these well natively.
		value[property.name] = property.isDataProperty || property.isScalar;
	}

	Object.defineProperty(entityType, '__canObserve__', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: value
	});

	return value;
}

// export class BailiwickObservationAdapter {
//   getObserver(object, propertyName, descriptor) {
//     let type = object.entityType;
//     if (!type || !(type.__canObserve__ || createCanObserveLookup(type))[propertyName]) {
//       return null;
//     }
//
//     let observerLookup = object.__BailiwickObserver__ || createObserverLookup(object);
//     return observerLookup.getObserver(propertyName);
//   }
// }

export class BailiwickObservationAdapter {

	/**
	 * Aurelia-Binding API: fetch an observer for the property with the specified
	 * {propertyName} on the given {object}.
	 */
	getObserver( object, propertyName, descriptor ) {
		return null;
	}
}
