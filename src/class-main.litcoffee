Main
====

#### The main class for Nyoo

    class Main
      C: ªC
      toString: -> "[object #{@C}]"

      constructor: (config={}) ->




Properties
----------


#### `classes <object>`
Xx. @todo describe

        @classes = {} #@todo needed?




Methods
-------


#### `add()`
- `Orig <function>`  The original class which should be recorded and brittlized
- `name <string>`    Optional name for the class

Xx. @todo describe

      add: (Orig, name) ->

Validate `Orig`. 

        if ªF != typeof Orig
          throw new Error "`Orig` is type #{ªtype Orig}, not function"

Validate `name`, or if missing, `Orig.prototype.C`. 

        if ªU != typeof name
          if ªS != typeof name
            throw new Error "`name` is type #{ªtype name}, not string"
          if ! /^[A-Z][_0-9A-Za-z]{0,23}$/.test name
            throw new Error "`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/"
        else
          if ªS != ªtype Orig::C
            throw new Error "`Orig::C` is type #{ªtype Orig::C}, not string"
          if ! /^[A-Z][_0-9A-Za-z]{0,23}$/.test Orig::C
            throw new Error "`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/"
          name = Orig::C

Xx. 

        Brittle = brittlize Orig

@todo private members

@todo constants

@todo static members

Define a factory method to [`seal()`](https://goo.gl/ccSLIs) each new instance. 

        @[name] = ->
          inst = new Brittle
          Object.seal inst
          inst

        @classes[name] = Brittle #@todo needed?

Allow chaining, eg `nyoo.add(Foo).add(Bar)`

        @




Static Functions
----------------


To cut down on function definitions, we define our getters and setters in an 
object prototype, not in each instantiated object. For these getters and 
setters to be able to access each instance value, each instance value must be 
initialized in the class constructor. It’s not possible to alter an existing 
constructor, so we define a class (and constructor) which extends the existing 
class.

@todo look at redefining the constructor in this simple way: 
http://stackoverflow.com/a/9267343

    brittlize = (Orig) ->

Build `props` and `methods`, which summarize all instance members. 

      props   = {}
      methods = {}
      for key,val of Orig::
        if '_public' == key.slice -7
          memName  = key.slice 0, -7
          memValue = Orig::[memName]
          memType  = ªtype memValue
          if ªU == memType
            throw new Error "No such member as #{memName}" #@todo maybe props __can__ be undefined?
          if ªF == memType
            methods[memName] = parseMethodSignature val, memName, memValue
          else
            props[memName] = parsePropSignature val, memName, memValue, memType

Create the Brittle class, and define its public properties. 

      Brittle = class extends Orig
        constructor: ->
          for name,[type,init] of props
            @[name + '_value'] = init
          super()

      for name,[type,init] of props
        do (name,type,init) -> # capture `name`, `type` and ,`init` in a closure
          Object.defineProperty Brittle::, name,
            get:     -> @[name + '_value'],
            set: (v) -> @[name + '_value'] = v #@todo validate v

For the Brittle class’s public methods, check incoming arguments, and also the 
outgoing return-value. @todo validation checks @todo maybe `Object.defineProperty()` the methods

      for name,[signature,method] of methods
        do (name,signature,method) -> # capture `name` etc in a closure
          Brittle::[name] = ->
            #ª 'You called ' + name
            method.apply @, arguments

Return the 

      Brittle





#### `parsePropSignature()`
- `signature <string>`  Xx
- `memName <string>`    Xx
- `memValue <mixed>`    Xx
- `memType <string>`    Xx

Used by `brittlize()` to parse a property signature. @todo more details. 

    parsePropSignature = (signature, memName, memValue, memType) ->

Validate and parse `signature`. 

      if ªS != typeof signature
        throw new Error "`signature` is type #{ªtype signature}, not string"
      match = signature.match /^<([|A-Za-z0-9]{1,40})>\s+(.{1,40})$/
      if null == match
        throw new Error "`signature` is not valid"

Create the type array, and validate it against `memType`. 

      types = match[1].split '|'
      memTypeOk = no
      for type in types # `Array::indexOf()` is not backwards compatible
        if type == memType then memTypeOk = yes; break
      if ! memTypeOk
        throw new Error "#{memName} is type #{memType}, which fails #{types}"

Return the signature as an easily-processable array. 

      [ types, memValue ]




#### `parseMethodSignature()`
- `signature <string>`  Xx
- `memName <string>`    Xx
- `memValue <mixed>`    Xx

Used by `brittlize()` to parse a method signature. @todo more details. 

    parseMethodSignature = (signature, memName, memValue) ->

@todo Validate and parse the `signature` string. 

      #if ªS != typeof signature
      #  throw new Error "`signature` is type #{ªtype signature}, not string"
      #match = signature.match /^<([|A-Za-z0-9]{1,40})>\s+(.{1,40})$/
      #if null == match
      #  throw new Error "`signature` is not valid"

@todo Build the signature array. 

      #types = match[1].split '|'
      #memTypeOk = no
      #for type in types # `Array::indexOf()` is not backwards compatible
      #  if type == memType then memTypeOk = yes; break
      #if ! memTypeOk
      #  throw new Error "#{memName} is type #{memType}, which fails #{types}"

@todo Return the signature and method as an easily-processable array. 

      [
        [ # the method’s signature
          [ no , ['string','number'] ]
          [ yes, ['string'] ]
        ]
        memValue # reference to the method itself
      ]



