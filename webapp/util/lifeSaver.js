sap.ui.define(
	[],
	function()
	{
		return {
			convertNames: function(input){
				if(input){
					return input.toUpperCase();
				}
			},
			convertToBoolean: function(inp){
				if(inp === "true"){
					return true;
				}else{
					return false;
				}
			},
			joinText: function(str1, str2){
				return str1 + " " + str2;
			},
			formatCurr: function(sal, curr){
				//var oCurrFormatter = new sap.ui.model.type.Currency();
				var oBrowserLocal = sap.ui.getCore().getConfiguration().getLanguage(); //Current browser local language
				var oLocal = new sap.ui.core.Locale(oBrowserLocal);
				var oLocalData = new sap.ui.core.LocaleData(oLocal);
				var currSymbol = oLocalData.getCurrencySymbol(curr);
				//var finalRes = oCurrFormatter.formatValue([sal, curr],"string");
				return sal + currSymbol;
			}
		};
	}
);