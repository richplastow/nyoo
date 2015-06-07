`Nyoo.add()` usage. 


#### Define classes which throw an exception when passed to `add()`. 

    class Wrong1
      C:  true

    class Wrong2
      C: ''

    class Wrong3
      C: 'wrong3'

    class Wrong4
      C: '4wrong'

    class Wrong5
      C: 'Wrong5Wrong5Wrong5Wrong5X'
      toString: -> "[object #{@C}]"

    class Wrong6
      C: 'Wrong-6'

    class Wrong7
      C: 'Wrong7'
      propNotDefined_public: '<string>  No such member as `propNotDefined`.'

    class Wrong8
      C: 'Wrong8'
      badSignature_public: -> 'Signature cannot be a function'
      badSignature: 123

    class Wrong9
      C: 'Wrong9'
      badSignature_public: '<number  Tag not completed.'
      badSignature: 123

    class Wrong10
      C: 'Wrong10'
      badSignature_public: '<Abc|null->  Type contains a dash.'
      badSignature: null

    class Wrong11
      # more bad signatures

    class Wrong12
      # more bad signatures

    class Wrong13
      C: 'Wrong13'
      badProperty_public: '<string|null>  Default is not valid type.'
      badProperty: 123





#### Define `Thing`, a perfectly defined class. 

    Thing = class
      a = 'Begin Thing definition'

      C: 'Thing'
      PI: 3.14

Define `Thing` Methods. 

      pubInstMeth_public: """
      a:      <number|string> The first argument.
      b:      <boolean>       The second argument.
      return: <string>        Public instance method returns a string. """
      pubInstMeth: (a, b) ->
        "pubInstMeth(): pubInstProp #{@pubInstProp} pubInstProp_value #{@pubInstProp_value}"

      pubInstMethTwo_public: """
      return: <string>        Public instance method returns a string. """
      pubInstMethTwo: ->
        "This is the second method"

      #priInstMeth_private:
      #  return: [ªS, 'Private instance method description here. ']
      #priInstMeth: ->
      #  'Private Instance Method'

      b = 'End Thing definition'

Define `Thing` Properties. 

      pubInstProp_public:
        '<string|number>  Property description here.'
      pubInstProp: 'Default public instance property value'
      #priInstProp_private: [ªS, 'Another property description here. ']
      #priInstProp:         'Default private instance property value'




#### Define a `nyoo` instance. 

    nyoo = new Main




#### Define the tests. 

    tudor.add [
      "02 `add()` Usage"




      "`add()` works as expected"


      tudor.is


      "`add()` is a function"
      ªF
      -> nyoo.add


      tudor.equal


      "`add()` allows chaining"
      true
      -> (nyoo.add Thing) == nyoo


      tudor.throw


      "`add()` must be passed a class, so its `typeof` must be 'function'"
      '`Orig` is type number, not function'
      -> nyoo.add 123

      "If `name` is passed, it must be a string"
      '`name` is type null, not string'
      -> nyoo.add Thing, null

      "If `name` is passed, it must not be a zero-length string"
      '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Thing, ''

      "If `name` is passed, it must not begin with a lowercase letter"
      '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Thing, 'thing'

      "If `name` is passed, it must not begin with a digit"
      '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Thing, '1Thing'

      "If `name` is passed, it must not be more than 24 characters"
      '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Thing, 'ThingThingThingThingThing'

      "If `name` is passed, the only punctuation allowed is underscore"
      '`name` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Thing, 'Thíng'

      "If no `name` is passed, the class prototype must have a `.C` string"
      '`Orig::C` is type boolean, not string'
      -> nyoo.add Wrong1

      "If no `name` is passed, `Orig::C` must not be a zero-length string"
      '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Wrong2

      "If no `name` is passed, `Orig::C` must not begin with a lowercase letter"
      '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Wrong3

      "If no `name` is passed, `Orig::C` must not begin with a digit"
      '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Wrong4

      "If no `name` is passed, `Orig::C` must not be more than 24 characters"
      '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Wrong5

      "If no `name` is passed, the only punctuation allowed is underscore"
      '`Orig::C` fails /^[A-Z][_0-9A-Za-z]{0,23}$/'
      -> nyoo.add Wrong6


      tudor.equal


      "If `name` is passed, the class prototype `.C` string can be invalid"
      '[object Wrong5Wrong5Wrong5Wrong5X]'
      ->
        nyoo.add Wrong5, 'ValidNameArgument_123456'
        '' + nyoo.ValidNameArgument_123456()




      "`nyoo.Thing()` brittlizes `new Thing()`"


      tudor.is


      "After `nyoo.add Thing`, `nyoo.Thing` is a function"
      ªF
      -> nyoo.Thing


Instantiate `thing`, an instance of the modified Thing

      -> nyoo.Thing()


      "`nyoo.Thing()` returns an object, `thing`"
      ªO
      (thing) -> thing


      tudor.equal


      "`thing.C` is the class name 'Thing'"
      'Thing'
      (thing) -> thing.C

      "The class name 'Thing' is immutable"
      'Thing'
      (thing) -> thing.C = 'whoops!'; thing.C

      "`thing` is an `instanceof` the Thing class"
      true
      (thing) -> thing instanceof Thing

      "`thing.constructor.__super__.C` is the original Thing class"
      'Thing'
      (thing) -> thing.constructor.__super__.C

      "`thing` is sealed in theory"
      true
      (thing) -> Object.isSealed thing

      "`thing` really is sealed against adding properties"
      ªU
      (thing) -> thing.abc = 123; ªtype thing.abc

@todo more practical `seal()` tests. 

      "`thing.pubInstProp` returns the default value"
      'Default public instance property value'
      (thing) -> thing.pubInstProp

      "`thing.pubInstProp = 9876` returns the updated value"
      9876
      (thing) -> thing.pubInstProp = 9876

      "`thing.pubInstProp` can see the update"
      9876
      (thing) -> thing.pubInstProp

      "`thing.pubInstMeth()` returns the expected value"
      'pubInstMeth(): pubInstProp 9876 pubInstProp_value 9876'
      (thing) -> thing.pubInstMeth()

      "A second instance starts life with the default value"
      'Default public instance property value'
      (thing) -> thing2 = ( nyoo.Thing() ); thing2.pubInstProp

      "A second instance does not share properties with the first" #@todo more rigourous
      '9876 second pubInstMeth(): pubInstProp second pubInstProp_value second'
      (thing) ->
        thing2 = ( nyoo.Thing() ); thing2.pubInstProp = 'second';
        "#{thing.pubInstProp} #{thing2.pubInstProp} #{thing2.pubInstMeth()}"




      "`nyoo.add()` invalid class definitions"


      tudor.throw


      "A class with `propNotDefined_public` must also have `propNotDefined`"
      'No such member as propNotDefined'
      -> nyoo.add Wrong7

      "A signature cannot be a function"
      '`signature` is type function, not string'
      -> nyoo.add Wrong8

      "'<number  Tag not completed.' is not a valid signature"
      '`signature` is not valid'
      -> nyoo.add Wrong9

      "'<Abc|null->  Type contains a dash.' is not a valid signature"
      '`signature` is not valid'
      -> nyoo.add Wrong10

      "Default property value must be one of the signature’s types"
      'badProperty is type number, which fails string,null'
      -> nyoo.add Wrong13


    ]



