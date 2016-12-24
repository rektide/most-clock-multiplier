"use strict"

var MostCreate= require( "@most/create")

function MostClockMultipler( periodicStream, n) {
	return MostCreate(function( add, complete, error){
		var
		  last,
		  ticks
		function setTimers( ms){
			var
			  step= ms/ n,
			  wait= step
			for( var i= 0; i< n; ++i){
				ticks[ i]= setTimeout( add, wait)
				wait+= step
			}
		}
		function clearTimers(){
			for(var i= 0; i< ticks.length; ++i){
				clearTimeout( ticks[ i])
			}
		}

		function next( value){
			var
			  now= Date.now(),
			  diff= now- last
			last= now

			clearTimers()
			setTimers( diff)
			add( value)
		}
		function dispose(){
			subscription()
			clearTimers()
		}
		var subscription= stream.subscribe({
			next,
			complete,
			error
		})
		return dispose
		
	})
}
