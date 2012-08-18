//Universal functions v0.11a

/* Author: Chris Wilson */

//guess the intrinsic type of a string
function guess_type(s) {
    if (s.replace(/[0-9\-]+/, "") === "") {
       	//int
       	return [parseInt(s, 10), "integer"];
	} else if (s.replace(/[0-9\.\-]+/, "") === "") {
    	//float
       	return [parseFloat(s), "float" ];        
	} else if (s.replace(/[0-9\/]+/, "") === "") {
       	//date
		//TO DO error handling
		try {
			//d = $.datepicker.parseDate(guess_date_format(s), s);
			//return [d, "date"];
			return [s, "date"];
		} catch (e) {
		}
	}                
    return [s, "string"];
}

//infer format from slashes. Very primitive at the moment
function guess_date_format(d) {
    var p = RegExp(/[0-9]+/ig),
    m = d.match(p),
    c,
    format = "";
    if (m.length == 2) { //guessing m/y or m/d
		format = "m";
		if (m[0][0] === "0") {
			format += "m";
		}
    	if (parseInt(m[1], 10) > 31) {
    		if (m[1].length > 2) {
	    		return format + "/yy";
	    	} else {
	    		return format + "/y";
	    	}
    	} else {
    		return format + "/d";
    	}
    } else {
    	format = "m";
		if (m[0][0] === "0") {
			format += "m";
		}
		format += "/d";
		if (m[1][0] === "0") {
			format += "d";
		}
		if (m[2].length > 2) {
			return format + "/yy";
		} else {
			return format + "/y";
		}
    }
}


/* CSV-to-JS Object 					*/
/* Currently does not support quotes 	*/
/* If index is defined, uses as key 	*/
/* TO DO: detect delimitation 			*/
function csv_to_object(csv, delimit, index) {
	var lines = csv.split(/[\r\n]/),
		delimitor = typeof(delimit) !== 'undefined' ? delimit : ",",
		labels = lines[0].split(delimitor),
		types = {},
		formats = {},
		samples = lines[1].split(delimitor),
		c,
		i,
		o,
		oo,
		items,
		ind;

	//record types
	for (c = 0; c < labels.length; c += 1) {
		types[labels[c]] = guess_type(samples[c])[1];
	}
	
	if (typeof(index) === 'undefined') {
		o = [];
		for (c = 1; c < lines.length; c += 1) {
			items = lines[c].split(delimitor);
			oo = {};
			for (i = 0; i < items.length; i += 1) {
				oo[labels[i]] = guess_type(items[i])[0];
			}
			o.push(oo);
		}
	} else {
		o = {};
		if (typeof(index) === 'number') {
			index = labels[index];
		}

		for (c = 1; c < lines.length; c += 1) {
			items = lines[c].split(delimitor);
			oo = {};
			for (i = 0; i < items.length; i += 1) {
				if (labels[i] === index) {
					ind = guess_type(items[i])[0];
				}
				oo[labels[i]] = guess_type(items[i])[0];
			}
			o[ind] = oo;
		}
	}

	return {
		columns: labels,
		types: types,
		object: o
	};
	//return o;
}

function append_object(o, appendee, override) {
	//add properties of one object to another if not already present, like a prototype
	//override determines whether to overwrite existing key if duplicated in second object
	for (var k in appendee) {
		if (!o.hasOwnProperty(k) || override === true) {
			o[k] = appendee[k];
		}
	}
}
