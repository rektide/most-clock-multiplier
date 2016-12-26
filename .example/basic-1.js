#!/usr/bin/env node
"use strict"

var
  mcm= require( ".."),
  most= require( "most"),
  now= function(){ return 0}

try{
	now= require( "performance-now")
}catch(ex){}

function main(){
	var
	  periodic= most.periodic(100),
	  multiplied= mcm(periodic, 3),
	  start= now? now(): null
	
	multiplied.observe(function(){
		console.log(now()- start)
	})

	setTimeout(function(){
		process.exit(0)
	}, 5200)
	return multiplied
}

module.exports= main
module.exports.main= main

if(require.main=== module){
	main()
}
