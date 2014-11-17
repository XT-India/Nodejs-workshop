http = require 'http'

module.exports = class ChuckNorris
  constructor: (@fname='Chuck', @lname='Norris') ->
  
  # Joke interface.
  id: (id, cb) -> @_joke 'jokes/'+id, cb
  random: (c, cb) -> if not cb then @_joke 'jokes/random', c else @_jokes 'jokes/random/'+c, cb
  
  # Utility interface
  count: (cb) -> @_value 'jokes/count', cb
  categories: (cb) -> @_value 'categories', cb

  # Make requests of varying data depth.
  _joke: (f, cb) -> @_value f, (err, data) -> if err then cb err else cb null, data.joke.replace /&quot;/g,'"'
  _jokes: (f, cb) -> @_value f, (err, data) -> if err then cb err else cb null, data.map (val) -> val.joke.replace /&quot;/g,'"'
  _value: (f, cb) -> @_req f, (err, data) -> if err then cb err else cb null, data.value
  _req: (f, cb) ->
    opts = 
      path:'/'+f+'?firstName='+@fname+'&lastName='+@lname
      host: 'api.icndb.com'
      port: 80
    http.get opts, (res) ->
      data = ''
      res.on 'data', (chunk) => data += chunk
      res.on 'end', =>
        try cb null, JSON.parse data catch err then cb new Error 'Response could not be parsed, api.icndb.com may be down.'