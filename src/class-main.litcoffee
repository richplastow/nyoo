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
- `classRef <function>`  The class which should be recorded

Xx. @todo describe

      add: (classRef) ->

Validate `classRef`. 

        if ªF != ªtype classRef
          throw new Error "`classRef` is type #{ªtype classRef}, not function"

        if ªS != ªtype classRef::C
          throw new Error "`classRef::C` is type #{ªtype classRef::C}, not string"

Record references to the class prototype’s signatures. 

        public_signatures  = {}
        private_signatures = {}
        for k,v of classRef::
          if      '_public'  == k.slice -7 then public_signatures[k]  = v
          else if '_private' == k.slice -8 then private_signatures[k] = v

Wrap each of the class prototype’s __public__ members in a validator. 

        for k,signature of public_signatures
          name   = k.slice 0, -7
          member = classRef::[name]

For methods, check incoming arguments and the outgoing return-value. @todo checks

          if ªF == ªtype member
            classRef::[name] = ->
              #ª 'You called ' + name
              member()

@todo public properties

@todo private members

@todo constants

@todo static members

Define a factory method to [`seal()`](https://goo.gl/ccSLIs) each new instance. 

        @[classRef::C] = ->
          inst = new classRef
          Object.seal inst
          inst

        @classes[classRef::C] = classRef #@todo needed?

Allow chaining, eg `nyoo.add(Foo).add(Bar)`

        @


