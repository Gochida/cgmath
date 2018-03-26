'use strict'
/*jslint node: true */
/*
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
A vector as used by you, should be kept as simple arrays of values. A 2d vector is therefore an array with 2 values. A 3d array is an array with 3 values... and so on.
There are helper functions to quickly create 2d, 3d, and 4d vectors (Vec2, Vec3, Vec4 functions).

Why Arrays? 
In an ideal world I would simply create a vector object and be done with things - however JS does not allow operator overloading; so if you wanted to do something like
aVectorObj + someVectorObj - anotherVectorObj
There would be no way to overload the + and - such that you'd get back a vector. (There is something to do with valueOf overriding, but as I understand it you wouldn't be able to get back a vector object from this - it would be reduced to a value).

If I'm not making a Vector object then, keeping vector values in an array and providing a library to work with arrays as vectors is the option I've gone with. The intent is that there will be minimal overhead to simply storing these vectors and vectors as a value should be lightweight (at runtime).

The one true sacrifice in my opinion is that you can not do this:
vec.x = anXValue // it has to be 'vec[0] = anXValue' instead

Note that vector.js will use the LENGTH of any array given to it to determine it's dimensions!
*/
const Vector = {
  Vec2: function(x, y) { return [x, y] },
  Vec3: function(x, y, z) { return [x, y, z] },
  Vec4: function(x, y, z, w) { return [x, y, z, w]},
  /** Much like a forEach, but iterates over two arrays. For each pair of values, 'func' is called with the 'left' and 'right' values for a given index. Arrays with mismatched lengths are allowed.
   * @param {array} a array of numbers (or objects via valueOf) (Left)
   * @param {array} b array of numbers (or objects via valueOf) (Right)
   * @param {function(number, number)} func function that will be called for every pair of values from a+b.
   * #### Different Lengths?
   * If one array is longer than the other, remaining pairs will have a zero in place of missing values from the shorter array.
   */
  forEvery: function(a, b, func) {
    let max = Math.max(a.length, b.length)
    for(let i = 0; i < min; i++) {
      let left = a[i] || 0
      let right = b[i] || 0
      func(left, right)
    }
  }, 
  add: function(a, b) { 
    let out = []
    this.forEvery(a, b, function(left, right) {
      out.push(left + right)
    })
    return out
  },
  /** Subtract vector B from vector A 
   * @param {array} a vector a (will be subtracted from by B)
   * @param {array} b vector b (will subtract from A)
  */
  subtract: function(a, b) { 
    let out = []
    this.forEvery(a, b, function(left, right){
      out.push(left - right)
    })
    return out
  },
  /** Calculates the magnitude (or length) of a vector */
  magnitude: function(a) {
    let sumOfPowers = 0 // represents Ax^2 + Ay^2 + .. + An^2
    a.forEach(function(component) {
      sumOfPowers += component * component
    })
    return Math.sqrt(sumOfPowers)
  },
  /** Normalizes the vector, returning a new vector who's orientation is the same but magnitutde is 1 */
  normalize: function(a) {
    /** 1 / ||a|| */
    let inverseMagnitude = 1 / this.magnitude(a) 
    let normalized = []
    a.forEach(function(component) {
      normalized.push(component * inverseMagnitude)
    })
    return normalized
  }

}

module.exports = Vector

