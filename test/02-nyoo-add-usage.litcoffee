`Nyoo.add()` usage. 


#### Define `Wrong`, a class which cannot be used by Nyoo. 

    class Wrong
      C:  true




#### Define `Thing`, a perfectly defined class. 

    class Thing
      C: 'Thing'
      PI: 3.14

Define `Thing` Properties. 

      pubInstProp_public:  [ªS, 'Property description here. ']
      pubInstProp:         'Public Instance Property'
      priInstProp_private: [ªS, 'Another property description here. ']
      priInstProp:         'Private Instance Property'

Define `Thing` Methods. 

      pubInstMeth_public:
        return: [ªS, 'Public instance method description here. ']
      pubInstMeth: ->
        'Public Instance Method'

      priInstMeth_private:
        return: [ªS, 'Private instance method description here. ']
      priInstMeth: ->
        'Private Instance Method'




#### Define `Nyoo::add()` tests. 

    tudor.add [
      "02 Add Usage"




      "`add()` works as expected"

      -> new Main

      tudor.is

      "`add()` is a function"
      ªF
      (nyoo) -> nyoo.add


      tudor.equal

      "`add()` allows chaining"
      true
      (nyoo) -> (nyoo.add Thing) == nyoo


      tudor.throw

      "`add()` must be passed a function"
      '`classRef` is type number, not function'
      (nyoo) -> nyoo.add 123

      "`add()` must be passed a function with a `C` property"
      '`classRef::C` is type boolean, not string'
      (nyoo) -> nyoo.add Wrong




      "`nyoo.Thing` is a modified class constructor"


      tudor.is

      "`nyoo.Thing` is now a function"
      ªF
      (nyoo) -> nyoo.Thing


      (nyoo) -> nyoo.Thing()


      "`nyoo.Thing()` returns an object"
      ªO
      (thing) -> thing


      tudor.equal

      "`thing.C` is the class name"
      'Thing'
      (thing) -> thing.C

      "`thing.C` the class is immutable"
      'Thing'
      (thing) -> thing.C = 'whoops!'; thing.C

      "`nyoo.Thing()` returns an `instanceof` Thing"
      true
      (thing) -> thing instanceof Thing

      "`thing` is sealed"
      ªU
      (thing) -> thing.abc = 123; ªtype thing.abc

      "`thing.pubInstMeth()` returns the expected value"
      'Public Instance Method'
      (thing) -> thing.pubInstMeth()


    ]



