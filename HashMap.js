// map = {key : Object, value: Object}

//Constructor
var CustomMap = function (map) {
    if(!this.isEmptyObject(map)){
        this.map = map;
    }else{
        //this.map = [{key:"COM", value:"TRA,CHE"},{key:"TRA", value:"COM,CHE"},{}];
        this.map = [];
    }
}

//Removes all of the mappings from this map.
CustomMap.prototype.clearMap = function(){
    this.map = [];
};

//Returns a shallow copy of this HashMap instance: the keys and values themselves are not cloned.
CustomMap.prototype.clone = function(){};

//Returns >=0 if this map contains a mapping for the specified key. -1 if not
CustomMap.prototype.containsKey = function(key){
    for(var i=0;i<this.map.length;i++){
        if(this.map[i].key==key) return i;
    }
    return -1;
};

//Returns >=0 if this map maps one or more keys to the specified value. -1 if not
CustomMap.prototype.containsValue = function(value){
    for(var i=0;i<this.map.length;i++){
        if(this.map[i].value==value) return i;
    }
    return -1;
};

//Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
CustomMap.prototype.get =function(key) {
    for(var i=0;i<this.map.length;i++){
        if(this.map[i].key==key) return this.map[i].value;
    }
    return null;
};

//Returns true if this map contains no key-value mappings.
CustomMap.prototype.isEmpty = function(){
    // null and undefined are "empty"
    if (this == null) return true;
    if(this.map==null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (this.length > 0)    return false;
    if (this.map.length > 0)    return false;
    if (this.length === 0)  return true;
    if (this.map.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in this) {
        if (hasOwnProperty.call(this, key)) return false;
    }
    return true;
};
CustomMap.prototype.isEmptyObject = function(obj){
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
};

//Associates the specified value with the specified key in this map.
CustomMap.prototype.put = function(_key,_value) {
    var index = this.containsKey(_key);
    if(index===-1){ // no existe, entonces lo agrego
        this.map.push({key:_key , value:_value});
    }else{
        this.map[index]={key:_key , value:_value};
    }
};

//Removes the mapping for the specified key from this map if present.
CustomMap.prototype.remove = function(key) {
    var index = this.containsKey(key);
    if (index > -1) {
        this.map.splice(index, 1);
    }
};

//Returns the number of key-value mappings in this map.
CustomMap.prototype.size = function(){
    return this.map.length;
};

//Returns a Set view of the keys contained in this map.
CustomMap.prototype.keySet = function(){
    var temp = [];
    for(var i=0;i<this.map.length;i++){
        temp.push(this.map[i].key);
    }
    return temp;
};

//Returns a Collection view of the values contained in this map.
CustomMap.prototype.values = function() {
    var temp = [];
    for(var i=0;i<this.map.length;i++){
        temp.push(this.map[i].value);
    }
    return temp;
};

//Compares the specified object with this map for equality.
//Returns true if the given object is also a map and the two maps represent the same mappings.
CustomMap.prototype.equals = function(Obj){
    return (typeof Obj != 'undefined' && typeof Obj.hashCode() != 'undefined' && Obj.hashCode()===this.hashCode());
};

// Returns the hash code value for this map. The hash code of a map is defined to be the sum of
// the hash codes of each entry in the map's entry set.
// hashCode() function like Java's in JavaScript for this object
CustomMap.prototype.hashCode = function(){
    var str = this.toString();
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

//Returns a string representation of this map.
CustomMap.prototype.toString = function(){
    var temp = '[';
    for(var i=0;i<this.map.length;i++){
        temp = temp + ' '+i+' => { key : ' + ((typeof this.map[i].key != 'undefined')?this.map[i].key:'')
                    + ' , value : ' + ((typeof this.map[i].value != 'undefined')?this.map[i].value:'') + ' } ,';
    }
    if(temp.length>1) temp = temp.substring(0,temp.length-1) + ']';
    else temp = temp + ']';
    return temp;
};

//Fill the map with a string representation, oposite of .toString
/* example:
[{ "key" : "COM" , "value" : "TRA,CHE,REQ" },{ "key" : "TRA" , "value" : "COM,CHE,REQ" },{ "key" : "CHE" , "value" : "COM,TRA,REQ" },{ "key" : "REQ" , "value" : "COM,TRA,CHE" }]
*/
CustomMap.prototype.fromJson =function(mapString){
    if(typeof mapString == 'undefined' || typeof mapString != 'string' || mapString.length==0){
        return false;
    }
    try {
        var obj = JSON.parse(mapString);
        obj.forEach(function(entry) {
            this.map.put(entry.key, entry.value);
        });
        return true;
    }catch(err){
        return false;
    }
}

// Returns a json string representation of this map.
CustomMap.prototype.toJsonString = function() {
    var temp = '[';
    for(var i=0;i<this.map.length;i++){
        temp = temp + '{ "key" : "' + ((typeof this.map[i].key != 'undefined')?this.map[i].key:'')
                    + '" , "value" : "' + ((typeof this.map[i].value != 'undefined')?this.map[i].value:'') + '" },';
    }
    if(temp.length>1) temp = temp.substring(0,temp.length-1) + ']';
    else temp = temp + ']';
    return temp;
}
