//add properties of one object to another if not already present, like a prototype
//override determines whether to overwrite existing key if duplicated in second object

function append_object(o, appendee, override) {
    for (var k in appendee) {
        if (!o.hasOwnProperty(k) || override === true) {
            o[k] = appendee[k];
        }
    }
}

//invert a series of objects
function flip(obj, index) {
    var inv = {};
    for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
            for (var i in obj[o]) {
                if (obj[o].hasOwnProperty(i)) {
                    if (!inv.hasOwnProperty(i)) {
                        inv[i] = {};
                        if (index) {
                            inv[i][index] = i;
                        }
                    }
                    inv[i][o] = obj[o][i];
                }
            }
        }
    }
    return inv;
}
