#!/usr/bin/env coffee
chuck = require './index'

# New chuck instance. First and last names are optional.
jokes = new chuck 'Chuck', 'Norris'

# Here's some spiffy examples.
jokes.id 1, (err, joke) -> console.log joke
jokes.random (err, joke) -> console.log joke
jokes.random 5, (err, jokes) -> console.log jokes
jokes.count (err, count) -> console.log count
jokes.categories (err, cats) -> console.log cats