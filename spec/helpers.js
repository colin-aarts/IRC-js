const path = require( "path" )
    , fs   = require( "fs" )
    , irc  = require( path.join( __dirname, "..", "lib", "irc" ) )
    , conf = path.join( __dirname, "lib", "config.json" )
    , fxtp = path.join( __dirname, "fixtures" )
    , strm = require( "./mockstream" )

// Convenience wrapper around `it`, with added bottage
const bit = function( desc, f ) {
  const bot = new irc.IRC( conf ).connect()
  // Expose stuff for convenience
  if ( ! f )
    return it( desc )
  bot._stream = strm.MockStream.current
  fbot = f.bind( bot )
  return it( desc, fbot )
}

const readFixture = function( fileName ) {
  return JSON.parse( fs.readFileSync( path.join( fxtp, fileName ), "utf8" ) )
}

exports.bit         = bit
exports.conf        = JSON.parse( fs.readFileSync( conf, "utf8" ) )
exports.readFixture = readFixture