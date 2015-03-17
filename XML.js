var XML = {
	parse: function (xml){
		var parser = new DOMParser();
		var DOM = parser.parseFromString(xml, "text/xml");

		function x2obj(xdoc) 
		{
			try {
				var obj = { };
				if (xdoc.children.length > 0) {
					for (var i = 0; i < xdoc.children.length; i++) 
					{
						var item = xdoc.children.item(i);
						var nodeName = item.nodeName;

						if (typeof (obj[nodeName]) == "undefined") {
							obj[nodeName] = x2obj(item);
						} else {
							if (typeof (obj[nodeName].push) == "undefined") {
								var old_obj = obj[nodeName];

								obj[nodeName] = [];
								obj[nodeName].push(old_obj);
							}
							obj[nodeName].push(x2obj(item));
						}
					}
				} else {
					obj = xdoc.textContent;
				}
				return obj;
			} catch (error) {
				throw error;
			}
		}
		return x2obj(DOM);
	},
	stringify: function (obj, indent){
		indent = indent || '  ';
		function obj2Xml(jobj) 
		{
			var toXml = function(v, name, ind) {
				var xml = "";
				if (v instanceof Array) {
					for (var i=0, n=v.length; i<n; i++)
						xml += ind + toXml(v[i], name, ind+"\t") + "\n";
				}
				else if (typeof(v) == "object") {
					var hasChild = false;
					xml += ind + "<" + name;
					for (var m in v) {
						if (m.charAt(0) == "@")
							xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
						else
							hasChild = true;
					}
					xml += hasChild ? ">" : "/>";
					if (hasChild) {
						for (var m in v) {
							if (m == "#text")
								xml += v[m];
							else if (m == "#cdata")
								xml += "<![CDATA[" + v[m] + "]]>";
							else if (m.charAt(0) != "@")
								xml += toXml(v[m], m, ind+"\t");
						}
						xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
					}
				}
				else {
					xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
				}
				return xml;
			}, xml="";
			for (var m in jobj)
				xml += toXml(jobj[m], m, indent);
			return xml.replace(/\t/g, indent);
		}
		return obj2Xml(obj);
	}
}
