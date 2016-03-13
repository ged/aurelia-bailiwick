/* -*- javascript -*- */
"use strict";

import {subscriberCollection} from 'aurelia-binding';

@subscriberCollection()
export class BailiwickPropertyObserver {

	constructor( obj, propertyName ) {
		this.obj = obj;
		this.propertyName = propertyName;
	}

	getValue() {
		return this.obj[ this.propertyName ];
	}

	setValue( newValue ) {
		this.obj[ this.propertyName ] = newValue;
	}

	subscribe( context, callable ) {
		if ( this.addSubscriber(context, callable) ) {
			this.oldValue = this.obj[ this.propertyName ];
			this.obj.__BailiwickObserver__.subscriberAdded();
		}
	}

	unsubscribe( context, callable ) {
		if ( this.removeSubscriber(context, callable) ) {
			this.obj.__BailiwickObserver__.subscriberRemoved();
		}
	}
}

function handleChange( change ) {
	let object = change.entity;
	let propertyName = change.propertyName;
	let objectObserver = object.__BailiwickObserver__;

	if ( propertyName === null ) {
		let observers = objectObserver.observers;
		for ( propertyName in observers ) {
			if ( observers.hasOwnProperty(propertyName) ) {
				change.propertyName = propertyName;
				handleChange( change );
			}
		}
		return;
	}

	let observer = objectObserver.observers[propertyName];
	let newValue = object[propertyName];

	if ( !observer || newValue === observer.oldValue ) {
		return;
	}
	observer.callSubscribers( newValue, observer.oldValue );
	observer.oldValue = newValue;
}

export class BailiwickObjectObserver {

	constructor( obj ) {
		this.obj = obj;
		this.observers = {};
		this.subscribers = 0;
		this.subscription = null;
	}

	subscriberAdded() {
		if ( this.subscribers === 0 ) {
			this.subscription = this.obj.entityAspect.propertyChanged.subscribe( handleChange );
		}

		this.subscribers++;
	}

	subscriberRemoved( propertyName, callback ) {
		this.subscribers--;

		if ( this.subscribers === 0 ) {
			this.obj.entityAspect.propertyChanged.unsubscribe( this.subscription );
		}
	}

	getObserver( propertyName ) {
		if ( !this.observers[propertyName] ) {
			this.observers[ propertyName ] = new BailiwickPropertyObserver( this.obj, propertyName );
		}
		return this.observers[ propertyName ];
	}
}
