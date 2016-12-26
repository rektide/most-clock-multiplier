"use strict"

var MostCreate= require( "@most/create").create

function MostClockMultiplier( periodicStream, n) {
	return MostCreate(function( add, complete, error){
		var
		  last= Date.now(),
		  ticks= new Array( n- 1)
		function setTimers( ms){
			var
			  step= ms/ n,
			  wait= step
			for( var i= 0; i< n- 1; ++i){
				ticks[ i]= setTimeout( add, wait)
				wait+= step
			}
		}
		function clearTimers(){
			for(var i= 0; i< n- 1; ++i){
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
			clearTimers()
			subscription.unsubscribe()
		}
		var subscription= periodicStream.subscribe({
			next,
			complete,
			error
		})
		
	})
}

module.exports= MostClockMultiplier
module.exports.MostClockMultiplier= MostClockMultiplier
